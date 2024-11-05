import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert, Modal, TextInput} from 'react-native';

const PaymentMethodSelectScreen = ({route, navigation}) => {
    const [selectedMethod, setSelectedMethod] = useState(null)
    const [isModalVisible, setModalVisible] = useState(false);
    const [newCardNumber, setNewCardNumber] = useState('');
    const [newPayPalEmail, setNewPayPalEmail] = useState('');

    const {totalAmount} = route.params
    const [paymentMethods, setPaymentMethods] = useState([
        {id: '1', name: 'Visa', number: '2334', image: 'https://placehold.co/50x30', type: 'Visa'},
        {id: '2', name: 'Mastercard', number: '3774', image: 'https://placehold.co/50x30', type: 'Mastercard'},
        {id: '3', name: 'PayPal', email: 'abc@gmail.com', image: 'https://placehold.co/50x30', type: 'PayPal'},
    ]);
    const handlePayment = () => {
        if (!selectedMethod) {
            Alert.alert('Please select a payment method');
            return;
        }
        Alert.alert('Payment Successful', `You have paid $${totalAmount} using ${selectedMethod.type}`);
        navigation.navigate('PaymentSuccessScreen', {
            subtotal: {totalAmount},
            tax: 0,
            fees: 0,
            totalAmount: {totalAmount},
            cardType: 'Visa',
            cardNumber: '2334'
        });
    };

    const handleAddPayment = () => {
        setModalVisible(true);
    };

    const handleAddCard = () => {
        setSelectedMethod('Card');
    };

    const handleAddPayPal = () => {
        setSelectedMethod('PayPal');
    };

    const handleSavePayment = () => {
        if (selectedMethod === 'Card' && newCardNumber) {
            setPaymentMethods([...paymentMethods, {
                id: Math.random().toString(),
                type: 'Visa',
                number: `**** ${newCardNumber.slice(-4)},`,
                image: 'https://placehold.co/50x30',
            }]);
            Alert.alert('Success', 'Card added successfully');
        } else if (selectedMethod === 'PayPal' && newPayPalEmail) {
            setPaymentMethods([...paymentMethods, {
                id: Math.random().toString(),
                type: 'PayPal',
                email: newPayPalEmail,
                image: 'https://placehold.co/50x30',
            }]);
            Alert.alert('Success', 'PayPal added successfully');
        } else {
            Alert.alert('Error', 'Please enter valid information');
            return;
        }
        setModalVisible(false);
        setSelectedMethod(null);
        setNewCardNumber('');
        setNewPayPalEmail('');
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
            <Image source={{uri: method.image}} style={styles.methodImage}/>
            <View style={styles.methodDetails}>
                <Text style={styles.methodName}>{method.type}</Text>
                {method.type === 'PayPal' ? (
                    <Text style={styles.methodInfo}>{method.email}</Text>
                ) : (
                    <Text style={styles.methodInfo}>**** {method.number}</Text>
                )}
            </View>
            <View style={styles.radioCircle}>
                {selectedMethod?.id === method.id && <View style={styles.selectedRb}/>}
            </View>

        </TouchableOpacity>
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
                <Text style={styles.addCardText}>+ Add new card</Text>
            </TouchableOpacity>

            <Modal visible={isModalVisible} transparent={true} animationType="slide">
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        {!selectedMethod ? (
                            <>
                                <Text style={styles.modalTitle}>Add Payment Method</Text>
                                <TouchableOpacity onPress={handleAddCard} style={styles.modalOption}>
                                    <Text>Add Card</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleAddPayPal} style={styles.modalOption}>
                                    <Text>Add PayPal</Text>
                                </TouchableOpacity>
                            </>
                        ) : (
                            <>
                                <Text style={styles.modalTitle}>Add {selectedMethod}</Text>
                                {selectedMethod === 'Card' && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter card number"
                                        keyboardType="numeric"
                                        value={newCardNumber}
                                        onChangeText={setNewCardNumber}
                                    />
                                )}
                                {selectedMethod === 'PayPal' && (
                                    <TextInput
                                        style={styles.input}
                                        placeholder="Enter PayPal email"
                                        keyboardType="email-address"
                                        value={newPayPalEmail}
                                        onChangeText={setNewPayPalEmail}
                                    />
                                )}
                                <TouchableOpacity onPress={handleSavePayment} style={styles.saveButton}>
                                    <Text style={styles.saveButtonText}>Save</Text>
                                </TouchableOpacity>
                            </>
                        )}
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </TouchableOpacity>
                    </View>
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    modalContent: {
        backgroundColor: '#fff',
        padding: 20,
        margin: 20,
        borderRadius: 10
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center'
    },
    modalOption: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 10,
        marginVertical: 10,
        borderRadius: 5
    },
    saveButton: {
        backgroundColor: '#ff6600',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20
    },
    saveButtonText: {
        color: '#fff',
        fontSize: 16
    },
    closeButton: {
        marginTop: 10,
        alignItems: 'center'
    },
    closeButtonText: {
        color: '#888'
    }
});

export default PaymentMethodSelectScreen;