import React from 'react';
import {View, Text, Image, TouchableOpacity, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {useNavigation, useRoute} from '@react-navigation/native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

const CommonLayout = ({title, children}) => {
    const navigation = useNavigation();
    const route = useRoute();
    const isInitialScreen = navigation.getState().routes[0].name === route.name;


    const handleCartPress = () => {
        navigation.navigate('Cart');
    };

    const handleProfilePress = () => {
        navigation.navigate('Profile');
    };

    return (
        <View style={styles.container}>
            {/* Header */}
            <View style={styles.header}>
                {!isInitialScreen && (
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Icon name="arrow-back" size={24} color="black"/>
                    </TouchableOpacity>
                )}
                <Text style={styles.title}>{title}</Text>
                <View style={styles.headerRight}>
                    <TouchableOpacity onPress={handleCartPress}>
                        <Icon name='cart-outline' size={24}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleProfilePress} style={styles.avatarContainer}>
                        <Image source={require('../assets/Rectangle.png')} style={styles.avatar}/>
                    </TouchableOpacity>
                </View>
            </View>

            {/* Screen Content */}
            <View style={styles.content}>
                {children}
            </View>

            {/* Footer / Bottom Navigation */}
            <View style={styles.bottomNav}>
                <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                    <Icon name="home" size={wp('6%')} color="#000"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Search')}>
                    <Icon name="search" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Favorites')}>
                    <Icon name="heart" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Messages')}>
                    <Icon name="mail" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
                    <Icon name="person" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>
            </View>
        </View>
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
    },
    title: {
        fontSize: 18,
        fontWeight: '700',
        flex: 1,
        textAlign: 'left',
    },
    headerRight: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        width: 24,
        height: 24,
        marginHorizontal: 5,
    },
    avatarContainer: {
        marginLeft: 10,
    },
    avatar: {
        width: 30,
        height: 30,
        borderRadius: 15,
    },
    content: {
        flex: 1,
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
});

export default CommonLayout;
