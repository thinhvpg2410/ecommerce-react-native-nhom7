import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';
import { getFirestore, doc, setDoc, collection, addDoc } from 'firebase/firestore';
import {getDatabase, onValue, ref, set} from 'firebase/database';
import { getAuth } from 'firebase/auth';
import firebaseApp from '../utils/FirebaseConfig';


const PaymentSuccessScreen = ({navigation, route}) => {
    const { subtotal, tax, fees, totalAmount, cardType, cardNumber } = route.params;
    const auth = getAuth(firebaseApp);
    const db = getFirestore(firebaseApp);
    const realTimeDb = getDatabase(firebaseApp);
    const user = auth.currentUser;
     const formatCurrencyVND = (number) => {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
      };

    useEffect(() => {
        const saveOrderAndClearCart = async () => {
            if (user) {
                const userId = user.uid;
                const userCartRef = ref(realTimeDb, `carts/${userId}`);
                onValue(userCartRef, async (snapshot) => {
                    const cartData = snapshot.val();
                    if (cartData) {
                        const items = Object.keys(cartData).map((key) => ({
                            id: key,
                            ...cartData[key],
                        }));
                        try {
                            const ordersCollectionRef = collection(db, 'orders');
                            await addDoc(ordersCollectionRef, {
                                userId: userId,
                                subtotal: subtotal,
                                tax: tax,
                                fees: fees,
                                totalAmount: totalAmount,
                                cardType: cardType,
                                cardNumber: `**** ${cardNumber.slice(-4)}`,
                                items: items,
                                createdAt: new Date().toISOString(),
                            });

                            // Clear the user's cart in Realtime Database
                            await set(userCartRef, null);

                            console.log('Order saved and cart cleared successfully.');
                        } catch (error) {
                            console.error('Error saving order or clearing cart:', error);
                            Alert.alert('Error', 'Failed to save order or clear cart. Please try again.');
                        }
                    }
                });
            }
        };

        saveOrderAndClearCart();
    }, []);

    const handleBackToHome = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome name="check-circle" size={80} color="#28a745"/>
            </View>
            <Text style={styles.successMessage}>Order placed successfully!</Text>
            <Text style={styles.subMessage}>Thanks for purchasing</Text>

            <View style={styles.summaryBox}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>{formatCurrencyVND(subtotal)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (10%)</Text>
                    <Text style={styles.summaryValue}>{formatCurrencyVND(tax)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Fees</Text>
                    <Text style={styles.summaryValue}>{formatCurrencyVND(fees)}</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Card</Text>
                    <Text style={styles.summaryValue}>{cardType} **** {cardNumber.slice(-4)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total</Text>
                    <Text style={styles.successValue}>{formatCurrencyVND(totalAmount)}</Text>
                </View>
            </View>

            <Text style={styles.ratingPrompt}>How was your experience?</Text>
            <View style={styles.ratingContainer}>
                {Array.from({length: 5}).map((_, index) => (
                    <FontAwesome key={index} name="star" size={24} color="#f2b01e"/>
                ))}
            </View>

            <TouchableOpacity style={styles.homeButton} onPress={handleBackToHome}>
                <Text style={styles.homeButtonText}>Back to Home</Text>
            </TouchableOpacity>
        </View>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    iconContainer: {
        marginBottom: 20,
    },
    successMessage: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#ff6600',
        textAlign: 'center',
        marginBottom: 5,
    },
    subMessage: {
        fontSize: 14,
        color: '#888',
        textAlign: 'center',
        marginBottom: 20,
    },
    summaryBox: {
        width: '100%',
        padding: 20,
        backgroundColor: '#f9f9f9',
        borderRadius: 10,
        marginBottom: 20,
    },
    summaryRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 5,
    },
    summaryLabel: {
        fontSize: 16,
        color: '#555',
    },
    summaryValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#333',
    },
    successValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#28a745',
    },
    divider: {
        height: 1,
        backgroundColor: '#ddd',
        marginVertical: 10,
    },
    ratingPrompt: {
        fontSize: 16,
        color: '#555',
        marginBottom: 10,
    },
    ratingContainer: {
        flexDirection: 'row',
        marginBottom: 20,
    },
    homeButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    homeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});
export default PaymentSuccessScreen;