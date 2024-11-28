import React, {useEffect, useState} from 'react';
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommonLayout from "./CommonLayout";
import {getDatabase, ref, onValue} from 'firebase/database';
import firebaseApp from '../utils/FirebaseConfig';

export default function SearchScreen({navigation}) {
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [cartCount, setCartCount] = useState(0);

    const db = getDatabase(firebaseApp);

    useEffect(() => {
        const productsRef = ref(db, 'fashion');
        onValue(productsRef, (snapshot) => {
            const data = snapshot.val();
            if (data) {
                const productsArray = Object.keys(data).map((key) => ({
                    id: key,
                    ...data[key],
                }));
                setAllProducts(productsArray);
                setFilteredProducts(productsArray);
            }
        });
    }, []);

    useEffect(() => {
        if (searchText.trim().length === 0) {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter((product) =>
                product.name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchText, allProducts]);


    const resultItem = ({item}) => (
        <TouchableOpacity
            style={styles.productItem}
            onPress={() => navigation.navigate('ProductDetailScreen', { productId: item.id })}
        >
            <Image source={{uri: item.colors[0].images[0]}} style={styles.productImage}/>
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productRating}>⭐ {item.star}</Text>
            <Text style={styles.productPrice}>${item.price}</Text>
        </TouchableOpacity>
    );

    return (
        <CommonLayout title={'Search'}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={wp('5%')} color="#aaa"/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for product"
                        placeholderTextColor="#aaa"
                        value={searchText}
                        onChangeText={(text) => setSearchText(text)}
                    />
                </View>

                <View>
                    <FlatList
                        data={filteredProducts}
                        renderItem={resultItem}
                        keyExtractor={(item) => item.id}
                        numColumns={2}
                    />
                </View>
            </ScrollView>

        </CommonLayout>
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
    productItem: {
        width: wp('44%'),
        margin: wp('2%'),
        backgroundColor: '#f9f9f9',
        borderRadius: wp('2%'),
        padding: wp('2%'),
        alignItems: 'center',
    },
    productImage: {
        width: wp('36%'),
        height: wp('36%'),
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

});
