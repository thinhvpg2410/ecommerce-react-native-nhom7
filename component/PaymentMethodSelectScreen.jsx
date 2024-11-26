import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, TextInput } from 'react-native';
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc, updateDoc, arrayUnion } from 'firebase/firestore';
import { firebaseApp } from '../utils/FirebaseConfig';

const PaymentMethodSelectScreen = ({ route, navigation }) => {
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);

    const [selectedMethod, setSelectedMethod] = useState(null);
    const [isModalVisible, setModalVisible] = useState(false);
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newCardExpiry, setNewCardExpiry] = useState('');
    const [newCardCVV, setNewCardCVV] = useState('');
    const [newPayPalEmail, setNewPayPalEmail] = useState('');
    const [selectedPaymentType, setSelectedPaymentType] = useState(null);
    const [paymentMethods, setPaymentMethods] = useState([]);
    const { totalAmount } = route.params;

    const visaLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/1200px-Visa_Inc._logo.svg.png';
    const mastercardLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png';
    const paypalLogoUrl = 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/39/PayPal_logo.svg/2560px-PayPal_logo.svg.png';

    useEffect(() => {
        const fetchPaymentMethods = async () => {
            const user = auth.currentUser;

            if (user) {
                const userDocRef = doc(db, 'paymentMethods', user.uid);
                const userDocSnap = await getDoc(userDocRef);

                if (userDocSnap.exists()) {
                    setPaymentMethods(userDocSnap.data().methods);
                } else {
                    console.log('No payment methods found for this user.');
                }
            }
        };

        fetchPaymentMethods();
    }, []);

    const handlePayment = () => {
        if (!selectedMethod) {
            Alert.alert('Please select a payment method');
            return;
        }
        Alert.alert('Payment Successful', `You have paid $${totalAmount} using ${selectedMethod.type}`);
        navigation.navigate('PaymentSuccessScreen', {
            subtotal: totalAmount,
            tax: 0,
            fees: 0,
            totalAmount: totalAmount,
            cardType: selectedMethod.type,
            cardNumber: selectedMethod.number ? `**** ${selectedMethod.number.slice(-4)}` : '',
        });
    };

    const handleAddPayment = () => {
        setModalVisible(true);
        setSelectedPaymentType(null);
    };

    const closePaymentModal = () => {
        setModalVisible(false);
        resetNewPaymentFields();
    };

    const resetNewPaymentFields = () => {
        setNewCardNumber('');
        setNewCardExpiry('');
        setNewCardCVV('');
        setNewPayPalEmail('');
    };

    const validateCardNumber = (number) => {
        return number.length === 16 && !isNaN(number);
    };

    const validateExpiryDate = (expiry) => {
        return /^(0[1-9]|1[0-2])\/?([0-9]{2})$/.test(expiry);
    };

    const validateCVV = (cvv) => {
        return cvv.length === 3 && !isNaN(cvv);
    };

    const validatePayPalEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSavePayment = async () => {
        if (selectedPaymentType === 'Card') {
            if (!validateCardNumber(newCardNumber)) {
                Alert.alert('Invalid Card Number', 'Card number must be 16 digits.');
                return;
            }

            if (!validateExpiryDate(newCardExpiry)) {
                Alert.alert('Invalid Expiry Date', 'Expiry date must be in MM/YY format.');
                return;
            }

            if (!validateCVV(newCardCVV)) {
                Alert.alert('Invalid CVV', 'CVV must be 3 digits.');
                return;
            }

            const cardType = newCardNumber.startsWith('4') ? 'Visa' : newCardNumber.startsWith('5') ? 'Mastercard' : 'Unknown';

            if (cardType === 'Unknown') {
                Alert.alert('Invalid Card Type', 'Only Visa or Mastercard are supported.');
                return;
            }

            const cardImage = cardType === 'Visa' ? visaLogoUrl : mastercardLogoUrl;

            const newCard = {
                id: Math.random().toString(),
                type: cardType,
                number: `**** ${newCardNumber.slice(-4)}`,
                expiry: newCardExpiry,
                image: cardImage,
            };

            await savePaymentMethod(newCard);
        } else if (selectedPaymentType === 'PayPal') {
            if (!validatePayPalEmail(newPayPalEmail)) {
                Alert.alert('Invalid PayPal Email', 'Please enter a valid email address.');
                return;
            }

            const newPayPal = {
                id: Math.random().toString(),
                type: 'PayPal',
                email: newPayPalEmail,
                image: paypalLogoUrl,
            };

            await savePaymentMethod(newPayPal);
        } else {
            Alert.alert('Error', 'Please select a payment method type to add.');
        }
    };

    const savePaymentMethod = async (newMethod) => {
        const user = auth.currentUser;

        if (user) {
            const userDocRef = doc(db, 'paymentMethods', user.uid);

            try {
                await updateDoc(userDocRef, {
                    methods: arrayUnion(newMethod),
                });
            } catch (error) {
                // If user document doesn't exist, create it and add the payment method
                await setDoc(userDocRef, {
                    methods: [newMethod],
                });
            }

            setPaymentMethods((prevMethods) => [...prevMethods, newMethod]);
            Alert.alert('Success', `${newMethod.type} added successfully`);
            closePaymentModal();
        }
    };

    const renderPaymentMethod = (method) => (
        <TouchableOpacity
            key={method.id}
            style={[
                styles.paymentMethod,
                selectedMethod?.id === method.id && styles.selectedMethod,
            ]}
            onPress={() => setSelectedMethod(method)}
        >
            <Image source={{ uri: method.image }} style={styles.methodImage} />
            <View style={styles.methodDetails}>
                <Text style={styles.methodName}>{method.type}</Text>
                {method.type === 'PayPal' ? (
                    <Text style={styles.methodInfo}>{method.email}</Text>
                ) : (
                    <Text style={styles.methodInfo}>{method.number}</Text>
                )}
            </View>
            <View style={styles.radioCircle}>
                {selectedMethod?.id === method.id && <View style={styles.selectedRb} />}
            </View>
        </TouchableOpacity>
    );

    const renderModalContent = () => (
        <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Payment Method</Text>
            {!selectedPaymentType && (
                <>
                    <TouchableOpacity style={styles.modalOption} onPress={() => setSelectedPaymentType('Card')}>
                        <Text>Add Credit/Debit Card</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.modalOption} onPress={() => setSelectedPaymentType('PayPal')}>
                        <Text>Add PayPal</Text>
                    </TouchableOpacity>
                </>
            )}
            {selectedPaymentType === 'Card' && (
                <>
                    <TextInput
                        style={[styles.input, !validateCardNumber(newCardNumber) && newCardNumber ? styles.invalidInput : null]}
                        placeholder="Card Number (16 digits)"
                        keyboardType="numeric"
                        maxLength={16}
                        value={newCardNumber}
                        onChangeText={setNewCardNumber}
                    />
                    <TextInput
                        style={[styles.input, !validateExpiryDate(newCardExpiry) && newCardExpiry ? styles.invalidInput : null]}
                        placeholder="Expiry Date (MM/YY)"
                        keyboardType="numeric"
                        value={newCardExpiry}
                        onChangeText={setNewCardExpiry}
                    />
                    <TextInput
                        style={[styles.input, !validateCVV(newCardCVV) && newCardCVV ? styles.invalidInput : null]}
                        placeholder="CVV (3 digits)"
                        keyboardType="numeric"
                        secureTextEntry={true}
                        maxLength={3}
                        value={newCardCVV}
                        onChangeText={setNewCardCVV}
                    />
                </>
            )}
            {selectedPaymentType === 'PayPal' && (
                <TextInput
                    style={[styles.input, !validatePayPalEmail(newPayPalEmail) && newPayPalEmail ? styles.invalidInput : null]}
                    placeholder="PayPal Email"
                    keyboardType="email-address"
                    value={newPayPalEmail}
                    onChangeText={setNewPayPalEmail}
                />
            )}
            {selectedPaymentType && (
                <TouchableOpacity onPress={handleSavePayment} style={styles.saveButton}>
                    <Text style={styles.saveButtonText}>Save Payment Method</Text>
                </TouchableOpacity>
            )}
            <TouchableOpacity onPress={closePaymentModal} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <Text style={styles.header}>Payment</Text>
            <Text style={styles.totalLabel}>TOTAL</Text>
            <Text style={styles.totalAmount}>${totalAmount}</Text>

            {paymentMethods.map(renderPaymentMethod)}

            <TouchableOpacity style={styles.payButton} onPress={handlePayment}>
                <Text style={styles.payButtonText}>Pay now</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.addCardButton} onPress={handleAddPayment}>
                <Text style={styles.addCardText}>+ Add new payment method</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>{renderModalContent()}</View>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    totalLabel: {
        fontSize: 16,
        textAlign: 'center',
        color: '#888',
    },
    totalAmount: {
        fontSize: 36,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
        color: '#333',
    },
    paymentMethod: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        marginVertical: 5,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
    },
    selectedMethod: {
        borderColor: '#ff6600',
    },
    methodImage: {
        width: 50,
        height: 30,
        marginRight: 10,
        resizeMode: 'contain',
    },
    methodDetails: {
        flex: 1,
    },
    methodName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    methodInfo: {
        fontSize: 14,
        color: '#888',
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#ff6600',
        alignItems: 'center',
        justifyContent: 'center',
    },
    selectedRb: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: '#ff6600',
    },
    payButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    payButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    addCardButton: {
        alignItems: 'center',
        marginTop: 15,
    },
    addCardText: {
        color: '#ff6600',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 10,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5,
    },
    invalidInput: {
        borderColor: 'red',
    },
    saveButton: {
        backgroundColor: '#ff6600',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16,
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center',
    },
    closeButtonText: {
        color: '#888',
    },
});

export default PaymentMethodSelectScreen;
