import React, {useEffect, useState} from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useUser } from '../context/UserContext';  // Import hook useUser
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Menu, Provider } from 'react-native-paper';
import { getAuth, signOut } from 'firebase/auth';
import {getDatabase, onValue, ref} from "firebase/database";

const CommonLayout = ({ title, children }) => {
    const navigation = useNavigation();
    const route = useRoute();
    const { userName, userPhotoUrl } = useUser();
    const [menuVisible, setMenuVisible] = useState(false);
    const [cartItemCount, setCartItemCount] = useState(0);

    const auth = getAuth();

    useEffect(() => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const db = getDatabase();
            const cartRef = ref(db, `carts/${userId}`);

            onValue(cartRef, (snapshot) => {
                const cartData = snapshot.val();
                if (cartData) {
                    const count = Object.values(cartData).reduce((total, item) => total + item.quantity, 0);
                    setCartItemCount(count);
                } else {
                    setCartItemCount(0);
                }
            });
        }
    }, []);

    const isInitialScreen = route.name === navigation.getState().routes[0].name;
    const isHomeScreen = route.name === 'Home';

    const handleBackPress = () => {
        if (!isInitialScreen && !isHomeScreen) {
            navigation.goBack();
        }
    };

    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                console.log('User signed out successfully');
                closeMenu();
                navigation.navigate('SignIn');
            })
            .catch((error) => {
                console.error('Error signing out: ', error);
            });
    };

    const openMenu = () => setMenuVisible(true);
    const closeMenu = () => setMenuVisible(false);

    const handleNavigateToProfile = () => {
        closeMenu();
        navigation.navigate('Profile');
    };

    const getIconColor = (screenName) => {
        return route.name === screenName ? '#000' : '#aaa';
    };

    return (
        <Provider>
            <View style={styles.container}>
                <View style={styles.header}>
                    {(!isInitialScreen && !isHomeScreen) && (
                        <TouchableOpacity onPress={handleBackPress}>
                            <Icon name="arrow-back" size={24} color="black" />
                        </TouchableOpacity>
                    )}
                    <Text style={styles.title}>{title}</Text>
                    <View style={styles.headerRight}>
                        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={styles.cartContainer}>
                            <Icon name='cart-outline' size={24} />
                            {cartItemCount > 0 && (
                                <View style={styles.cartBadge}>
                                    <Text style={styles.cartBadgeText}>{cartItemCount}</Text>
                                </View>
                            )}
                        </TouchableOpacity>
                        <Menu
                            visible={menuVisible}
                            onDismiss={closeMenu}
                            anchor={
                                <TouchableOpacity onPress={openMenu} style={styles.avatarContainer}>
                                    <Image source={{uri: userPhotoUrl}} style={styles.avatar} />
                                    {userName && (
                                        <Text style={styles.welcomeText}>{userName}</Text>
                                    )}
                                </TouchableOpacity>
                            }
                        >
                            <Menu.Item onPress={handleNavigateToProfile} title="Profile" />
                            <Menu.Item onPress={handleLogout} title="Logout" />
                        </Menu>
                    </View>
                </View>

                <View style={styles.content}>
                    {children}
                </View>

                {/* Footer / Bottom Navigation */}
                <View style={styles.bottomNav}>
                    {[
                        { name: 'Home', icon: 'home' },
                        { name: 'Search', icon: 'search' },
                        { name: 'Chat', icon: 'chatbubble' },
                        { name: 'Messages', icon: 'mail' },
                        { name: 'Profile', icon: 'person' },
                    ].map((item) => (
                        <TouchableOpacity
                            key={item.name}
                            onPress={() => navigation.navigate(item.name)}
                        >
                            <Icon name={item.icon} size={wp('6%')} color={getIconColor(item.name)} />
                        </TouchableOpacity>
                    ))}
                </View>
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        width: '100%',
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
        textAlign: 'left',
    },
    welcomeText: {
        fontSize: 16,
        fontWeight: '400',
        color: '#191d17',
        marginLeft: 5,
        marginTop: 5,
        marginRight: 10,
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatarContainer: {
        marginLeft: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
        resizeMode: 'contain',
    },
    content: {
        flex: 2,
        padding: 15,
    },
    bottomNav: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: hp('1.5%'),
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    cartContainer: {
        position: 'relative',
    },
    cartBadge: {
        position: 'absolute',
        right: -10,
        top: -10,
        backgroundColor: 'red',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    cartBadgeText: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default CommonLayout;
