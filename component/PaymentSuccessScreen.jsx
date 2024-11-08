import React from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image, Alert} from 'react-native';
import {FontAwesome} from '@expo/vector-icons';

const PaymentSuccessScreen = ({navigation, route}) => {
    const {subtotal, tax, fees, totalAmount, cardType, cardNumber} = route.params;
    const handleBackToHome = () => {
        navigation.navigate('CheckoutScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.iconContainer}>
                <FontAwesome name="check-circle" size={80} color="#28a745"/>
            </View>
            <Text style={styles.successMessage}>Order placed successfully!</Text>
            <Text style={styles.subMessage}>Commodo eu ut sunt qui minim fugiat elit nisi enim</Text>

            <View style={styles.summaryBox}>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>${subtotal}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (10%)</Text>
                    <Text style={styles.summaryValue}>${tax}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Fees</Text>
                    <Text style={styles.summaryValue}>${fees}</Text>
                </View>
                <View style={styles.divider}/>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Card</Text>
                    <Text style={styles.summaryValue}>{cardType} **** {cardNumber.slice(-4)}</Text>
                </View>
                <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Total</Text>
                    <Text style={styles.successValue}>${totalAmount}</Text>
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