import React, {useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';


const CheckoutScreen = ({navigation}) => {
    const [isEditMode, setIsEditMode] = useState(false)

    const [voucher, setVoucher] = useState('')
    const [cartItems, setCartItems] = useState([
        {
            id: '1',
            name: 'Headphone',
            description: 'Consequat ex eu',
            price: 500,
            quantity: 1,
            image: 'https://placehold.co/50'
        },
        {
            id: '2',
            name: 'Headphone',
            description: 'Consequat ex eu',
            price: 300,
            quantity: 1,
            image: 'https://placehold.co/50'
        },
        {
            id: '3',
            name: 'Smartphone',
            description: 'Consequat ex eu',
            price: 1000,
            quantity: 1,
            image: 'https://placehold.co/50'
        },
        {
            id: '4',
            name: 'Smartphone',
            description: 'Consequat ex eu',
            price: 1000,
            quantity: 1,
            image: 'https://placehold.co/50'
        },
    ]);

    const toggleEditMode = () => {
        setIsEditMode(!isEditMode);
    };

    const handleDeleteItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    };


    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
    };

    const renderCartItem = ({item}) => (
        <View style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.itemImage}/>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
            </View>
            <Text style={styles.itemQuantity}>x{item.quantity}</Text>
            {isEditMode ? (
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.id)}>
                    <Text style={styles.deleteButtonText}>Delete</Text>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
                    <Text>✎</Text>
                </TouchableOpacity>
            )}
        </View>
    );
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Checkout</Text>
            <View style={styles.header}>
                <Text style={styles.title}></Text>
                <TouchableOpacity onPress={toggleEditMode} style={styles.editButton}>
                    <Text>{isEditMode ? 'Done' : 'Edit'}</Text>
                </TouchableOpacity>
            </View>
            {cartItems.length === 0 ? (
                <View style={styles.emptyCartContainer}>
                    <Text style={styles.emptyCartText}>Your cart is empty</Text>
                    <TouchableOpacity style={styles.continueShoppingButton} onPress={() => navigation.navigate('Home')}>
                        <Text style={styles.continueShoppingText}>Continue Shopping</Text>
                    </TouchableOpacity>
                </View>
            ) : (
                <FlatList
                    data={cartItems}
                    renderItem={renderCartItem}
                    keyExtractor={(item) => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}

            <View style={styles.voucherContainer}>
                <TextInput
                    style={styles.voucherInput}
                    placeholder="Enter voucher code"
                    value={voucher}
                    onChangeText={setVoucher}
                />
                <TouchableOpacity style={styles.applyButton}>
                    <Text style={styles.applyButtonText}>Apply</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.totalContainer}>
                <Text style={styles.totalLabel}>TOTAL</Text>
                <Text style={styles.totalAmount}>${calculateTotal()}</Text>
            </View>

            <TouchableOpacity style={styles.nextButton}
                              onPress={() => navigation.navigate('PaymentMethod', {totalAmount: calculateTotal()})}>
                <Text style={styles.nextButtonText}>Next →</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 16,
    },
    cartList: {
        flexGrow: 0,
    },
    cartItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    itemImage: {
        width: 50,
        height: 50,
        borderRadius: 5,
        marginRight: 10,
    },
    itemDetails: {
        flex: 1,
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    itemDescription: {
        fontSize: 12,
        color: '#888',
    },
    itemPrice: {
        fontSize: 16,
        color: '#333',
    },
    itemQuantity: {
        fontSize: 16,
        marginHorizontal: 10,
    },
    editButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    voucherContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 15,
    },
    voucherInput: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        paddingHorizontal: 10,
        paddingVertical: 5,
    },
    applyButton: {
        backgroundColor: '#e0ffe0',
        paddingVertical: 8,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 10,
    },
    applyButtonText: {
        color: '#0a0',
        fontWeight: 'bold',
    },
    totalContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 15,
        borderTopWidth: 1,
        borderColor: '#eee',
        marginTop: 10,
    },
    totalLabel: {
        fontSize: 18,
        fontWeight: 'bold',
    },

    deleteButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#ff4d4d',
        borderRadius: 4,
    },
    deleteButtonText: {
        color: '#fff',
    },
    editModeButton: {
        marginTop: 16,
        padding: 12,
        alignItems: 'center',
        backgroundColor: '#ffa500',
        borderRadius: 8,
    },
    totalAmount: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
    },
    nextButton: {
        backgroundColor: '#ff6600',
        paddingVertical: 15,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    nextButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
    listContainer: {
        paddingBottom: 16,
    },
    emptyCartContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyCartText: {
        fontSize: 18,
        color: '#888',
        marginBottom: 20,
    },
    continueShoppingButton: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: '#ff6f00',
        borderRadius: 5,
    },
    continueShoppingText: {
        color: '#fff',
        fontSize: 16,
    },
});
export default CheckoutScreen;