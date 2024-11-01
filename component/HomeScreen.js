import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {bottomNav, categories} from "../data";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function HomeScreen({navigation}) {

    const recommendedProducts = [
        {id: '1', name: 'Shoes', rating: 4.5, price: 299, image: 'https://placehold.co/150'},
        {id: '2', name: 'Tablet', rating: 4.5, price: 499, image: 'https://placehold.co/150'},
        {id: '3', name: 'Pear', rating: 4.5, price: 4, image: 'https://placehold.co/150'},
    ];

    const renderCategories = ({item}) => (
        <TouchableOpacity style={styles.categoryItem} onPress={()=>handleCategories(item)}>
            <Icon name={item.icon} size={wp('10%')} color="#555"/>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    )

    const renderRcmProducts = ({item}) => (
        <TouchableOpacity style={styles.productItem}>
            <Image source={{uri: item.image}} style={styles.productImage}/>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productRating}>⭐ {item.rating}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    )
    const handleNavPress = (item) => {
        console.log(`Navigating to ${item.name}`);
    };

    // const renderBottomNavItem = ({item}) => (
    //     <TouchableOpacity onPress={() => handleNavPress(item)} style={styles.bottomNavItem}>
    //         <Icon name={item.icon} size={wp('6%')} color={item.color}/>
    //     </TouchableOpacity>
    // );
    const handleCategories = (item) => {
        console.log(`${item.name}`)
    }
    const handleRcmProduct = (item) => {
        console.log()
    }
    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.headerText}>All Deals</Text>
                    <TouchableOpacity style={styles.profile}>
                        <Icon name="person-circle" size={wp('10%')} color="#000"/>
                    </TouchableOpacity>
                </View>

                <View style={styles.searchBar}>
                    <Icon name="search" size={wp('5%')} color="#aaa"/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for product"
                        placeholderTextColor="#aaa"

                    />
                </View>

                <View>
                    <FlatList
                        data={categories}
                        horizontal
                        renderItem={renderCategories}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>

                <View style={{padding: 10}}>
                    <View style={{marginBottom: 5}}>
                        <Image source={{uri: 'https://placehold.co/300x150'}}
                               style={{width: '100%', height: 150, borderRadius: wp('2%')}}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={{uri: 'https://placehold.co/300x150'}}
                               style={{width: '50%', height: 100, borderRadius: wp('2%')}}
                        />
                        <Image source={{uri: 'https://placehold.co/300x150'}}
                               style={{width: '50%', height: 100, borderRadius: wp('2%')}}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <View>
                    <FlatList
                        data={recommendedProducts}
                        horizontal
                        renderItem={renderRcmProducts}
                        keyExtractor={(item) => item.id}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
            </ScrollView>

            <View style={styles.bottomNav}>
                <TouchableOpacity>
                    <Icon name="home" size={wp('6%')} color="#000"/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="search" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="heart" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="mail" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="person" size={wp('6%')} color="#aaa"/>
                </TouchableOpacity>

                {/*<FlatList*/}
                {/*    data={bottomNav}*/}
                {/*    horizontal*/}
                {/*    renderItem={renderBottomNavItem}*/}
                {/*    keyExtractor={(item) => item.id}*/}
                {/*    showsHorizontalScrollIndicator={false}*/}
                {/*/>*/}
            </View>
        </View>

    );

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
        paddingBottom: hp('10%'),
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp('4%'),
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: wp('6%'),
        fontWeight: 'bold',
    },
    profile: {
        width: wp('7%'),
        height: wp('7%'),
    },
    searchBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
        borderRadius: wp('2%'),
        paddingHorizontal: wp('3%'),
        marginHorizontal: wp('4%'),
        marginVertical: hp('1%'),
    },
    searchInput: {
        flex: 1,
        fontSize: wp('4%'),
        marginLeft: wp('2%'),
        marginVertical: hp('2%'),
        color: '#000',

    },
    categoryItem: {
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: wp('3%'),
    },
    categoryText: {
        fontSize: wp('4%'),
        color: '#555',
        marginTop: hp('0.5%'),
    },
    sectionTitle: {
        fontSize: wp('5%'),
        fontWeight: 'bold',
        paddingHorizontal: wp('4%'),
        paddingTop: hp('2%'),
    },
    productItem: {
        width: wp('30%'),
        margin: wp('2%'),
        backgroundColor: '#f9f9f9',
        borderRadius: wp('2%'),
        padding: wp('2%'),
        alignItems: 'center',
    },
    productImage: {
        width: wp('20%'),
        height: wp('20%'),
        borderRadius: wp('2%'),
    },
    productName: {
        fontSize: wp('3.8%'),
        fontWeight: 'bold',
        marginTop: hp('1%'),
    },
    productRating: {
        fontSize: wp('3.5%'),
        color: '#555',
    },
    productPrice: {
        fontSize: wp('4%'),
        color: '#E57373',
        fontWeight: 'bold',
    },
    bottomNav: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        paddingVertical: hp('1.5%'),
        borderTopWidth: 1,
        borderTopColor: '#f0f0f0',
        backgroundColor: '#fff',
    },
    bottomNavItem: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-around',
        paddingVertical: hp('1.5%'),
    },
});