import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, TouchableOpacity, FlatList, Image, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {getDatabase, ref, onValue, update, remove} from 'firebase/database';
import {getAuth} from 'firebase/auth';
import firebaseApp from '../utils/FirebaseConfig';


const CheckoutScreen = ({navigation}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [voucher, setVoucher] = useState('');
    const [cartItems, setCartItems] = useState([]);
    const db = getDatabase(firebaseApp);
    const auth = getAuth(firebaseApp);

    const handleBackPress = () => {
        navigation.goBack()
    };

    const handleIncreaseQuantity = (uniqueId) => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const itemRef = ref(db, `carts/${userId}/${uniqueId}`);
            setCartItems((prevItems) =>
                prevItems.map((item) => {
                    if (item.uniqueId === uniqueId) {
                        const updatedQuantity = item.quantity + 1;
                        update(itemRef, {quantity: updatedQuantity});
                        return {...item, quantity: updatedQuantity};
                    }
                    return item;
                })
            );
        }
    };

    const handleDecreaseQuantity = (uniqueId) => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const itemRef = ref(db, `carts/${userId}/${uniqueId}`);
            setCartItems((prevItems) =>
                prevItems.map((item) => {
                    if (item.uniqueId === uniqueId && item.quantity > 1) {
                        const updatedQuantity = item.quantity - 1;
                        update(itemRef, {quantity: updatedQuantity});
                        return {...item, quantity: updatedQuantity};
                    }
                    return item;
                })
            );
        }
    };

    const toggleEditMode = () => {
        setIsEditMode((prevMode) => !prevMode);
    };

    const handleDeleteItem = (uniqueId) => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const itemRef = ref(db, `carts/${userId}/${uniqueId}`);

            remove(itemRef)
                .then(() => {
                    setCartItems((prevItems) => prevItems.filter((item) => item.uniqueId !== uniqueId));
                })
                .catch((error) => {
                    console.error('Error deleting item from database:', error);
                });
        } else {
            console.error('User not authenticated');
        }
    };

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    };

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const cartRef = ref(db, `carts/${userId}`);

            onValue(cartRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const items = Object.keys(data).map((key) => ({
                        uniqueId: key,
                        ...data[key],
                    }));
                    setCartItems(items);
                } else {
                    setCartItems([]);
                }
            });
        }
    }, []);

    const renderCartItem = ({item}) => (
        <View style={styles.cartItem}>
            <Image source={{uri: item.image}} style={styles.itemImage}/>
            <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemDescription}>{item.description}</Text>
                <Text style={styles.itemPrice}>${item.price}</Text>
                <Text style={styles.itemPrice}>{item.type}</Text>
                {/*<Text style={styles.itemPrice}>{item.color}</Text>*/}
            </View>
            <View style={styles.quantityContainer}>
                <TouchableOpacity onPress={() => handleDecreaseQuantity(item.uniqueId)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>-</Text>
                </TouchableOpacity>
                <Text style={styles.quantityText}>{item.quantity}</Text>
                <TouchableOpacity onPress={() => handleIncreaseQuantity(item.uniqueId)} style={styles.quantityButton}>
                    <Text style={styles.quantityButtonText}>+</Text>
                </TouchableOpacity>
            </View>
            {isEditMode ? (
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteItem(item.uniqueId)}>
                    <Icon name="trash" size={wp('5%')}/>
                </TouchableOpacity>
            ) : (
                <TouchableOpacity style={styles.editButton} onPress={toggleEditMode}>
                    <Icon name="pencil" size={wp('5%')}/>
                </TouchableOpacity>
            )}
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleBackPress}>
                <Icon name="arrow-back" size={24} color="black"/>
            </TouchableOpacity>
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
                <>
                    <FlatList
                        data={cartItems}
                        renderItem={renderCartItem}
                        keyExtractor={(item) => item.uniqueId}
                        contentContainerStyle={styles.listContainer}
                    />
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

                    <TouchableOpacity
                        style={styles.nextButton}
                        onPress={() => navigation.navigate('PaymentMethodSelectScreen', {totalAmount: calculateTotal()})}
                    >
                        <Text style={styles.nextButtonText}>Next →</Text>
                    </TouchableOpacity>
                </>
            )}
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
    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 1,
        marginRight: 8,
    },
    quantityButton: {
        width: 30,
        height: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#ddd',
        borderRadius: 4,
    },
    quantityButtonText: {
        fontSize: 18,
        color: '#333',
    },
    quantityText: {
        fontSize: 16,
        marginHorizontal: 12,
    },
    deleteButton: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        backgroundColor: '#ff4d4d',
        borderRadius: 4,
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
