import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import CommonLayout from "./CommonLayout";
import { getDatabase, ref, onValue } from 'firebase/database';
import firebaseApp from '../utils/FirebaseConfig';

export default function SearchScreen({ navigation }) {
    const [searchText, setSearchText] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);

    const db = getDatabase(firebaseApp);

    useEffect(() => {
        const fashionRef = ref(db, 'fashion');
        const freshFruitRef = ref(db, 'fresh_fruit_data');

        const fetchProducts = () => {
            const allData = [];

            // Get fashion data
            onValue(fashionRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const productsArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                        category: 'fashion', // Add category for differentiation
                    }));
                    allData.push(...productsArray);
                }
            });

            // Get fresh fruit data
            onValue(freshFruitRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const productsArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                        category: 'fresh', // Add category for differentiation
                    }));
                    allData.push(...productsArray);
                }
            });

            // Set all products
            setAllProducts(allData);
            setFilteredProducts(allData);
        };

        fetchProducts();
    }, []);

    useEffect(() => {
        if (searchText.trim().length === 0) {
            setFilteredProducts(allProducts);
        } else {
            const filtered = allProducts.filter((product) =>
                product.name?.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
        }
    }, [searchText, allProducts]);

    const resultItem = ({ item }) => {
        const navigateToDetails = () => {
            if (item.category === 'fashion' || item.category === 'shirt' || item.category === 'jean') {
                navigation.navigate('DetailFashion', { it: item });
            } else if (item.category === 'fresh' || !item.category) {
                navigation.navigate('DetailFreshFruit', { rp: item });
            }
        };

        // Safely handle the image source with optional chaining and fallback URL
        const imageUri = (item.colors && item.colors.length > 0 && item.colors[0].images && item.colors[0].images.length > 0)
            ? item.colors[0].images[0]
            : item.img?.[0]
            ?? 'https://via.placeholder.com/150';

        return (
            <TouchableOpacity
                style={styles.productItem}
                onPress={navigateToDetails}
            >
                <Image source={{ uri: imageUri }} style={styles.productImage} />
                <Text style={styles.productName}>{item.name ?? 'No name available'}</Text>
                <Text style={styles.productRating}>⭐ {item.star || item.rating || 'N/A'}</Text>
                <Text style={styles.productPrice}>${item.price || 'N/A'}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <CommonLayout title={'Search'}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={wp('5%')} color="#aaa" />
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
                        keyExtractor={(item, index) => `${item.id}-${index}`}
                        numColumns={2}
                    />
                </View>
                <View style={{marginBottom:"-700%"}}></View>
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
