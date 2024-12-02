import React,{useState,useEffect} from 'react';
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput,Button} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import {bottomNav, categories} from "../data";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommonLayout from "./CommonLayout";
import {getDatabase, ref, onValue} from 'firebase/database';
import firebaseApp from '../utils/FirebaseConfig';

export default function HomeScreen({navigation}) {

    const [allProducts, setAllProducts] = useState([]);

    const db = getDatabase(firebaseApp);
    const formatCurrencyVND = (number) => {
        return new Intl.NumberFormat('vi-VN', {style: 'currency', currency: 'VND'}).format(number);
    };

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
        };

        fetchProducts();
    }, []);

    const renderCategories = ({item}) => (
        <TouchableOpacity style={styles.categoryItem} onPress={() => handleCategories(item)}>
            <Icon name={item.icon} size={wp('10%')} color="#555"/>
            <Text style={styles.categoryText}>{item.name}</Text>
        </TouchableOpacity>
    );

    const renderRcmProducts = ({item}) => {
        let ratingValue = 'N/A';

        if (item.category === 'fashion') {
            ratingValue = item.rating ?? 'N/A';
        } else if (item.category === 'fresh') {
            ratingValue = item.star ?? 'N/A';
        }

        return (
            <TouchableOpacity style={styles.productItem} onPress={() => handleRcmProduct(item)}>
                <Image
                    source={{uri: item.colors?.[0]?.images?.[0] ?? item.img?.[0] ?? 'https://via.placeholder.com/150'}}
                    style={styles.productImage}/>
                <Text style={styles.productName}>{item.name ?? 'No name available'}</Text>
                <Text
                    style={styles.productRating}>⭐ {ratingValue}</Text> {/* Display the appropriate rating or reviews */}
                <Text style={styles.productPrice}>{formatCurrencyVND(item.price) ?? 'N/A'}</Text>
            </TouchableOpacity>
        );
    };

    const handleCategories = (item) => {
        navigation.navigate(item.nav);
    };

    const handleRcmProduct = (item) => {
        // Navigate based on the product category
        if (item.category === 'fashion' || item.category === 'shirt' || item.category === 'jean') {
            navigation.navigate('DetailFashion', {it: item});
        } else if (item.category === 'fresh' || !item.category) {
            navigation.navigate('DetailFreshFruit', {rp: item});
        } else {
            console.log(`${item.name} clicked - No detail screen available`);
        }

    };
    return (
        <CommonLayout title={'All Deals'}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <View style={styles.searchBar}>
                    <Icon name="search" size={wp('5%')} color="#aaa"/>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Search for product"
                        placeholderTextColor="#aaa"
                        onFocus={() => navigation.navigate('Search')}
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
                        <Image source={require('../assets/Container 6.png')}
                               style={{width: '100%', height: 150, borderRadius: wp('2%')}}
                        />
                    </View>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={require('../assets/Container 7.png')}
                               style={{width: '50%', height: 100, borderRadius: wp('2%'), resizeMode: "stretch"}}
                        />
                        <Image source={require('../assets/Container 8.png')}
                               style={{width: '50%', height: 100, borderRadius: wp('2%'), resizeMode: "stretch"}}
                        />
                    </View>
                </View>

                <Text style={styles.sectionTitle}>Recommended for you</Text>
                <View>
                    <FlatList
                        data={allProducts}
                        horizontal
                        renderItem={renderRcmProducts}
                        keyExtractor={(item, index) => `${item.id}-${item.category}-${index}`}
                        showsHorizontalScrollIndicator={false}
                    />
                </View>
                <View>

        <TouchableOpacity onPress={() => navigation.navigate('Chat')} style={styles.imgtl}>
            <Image source={{ uri: 'https://cdn-icons-png.flaticon.com/512/8649/8649595.png' }} style={{ width: 100, height: 100 }} />
        </TouchableOpacity>
        </View>
                <View style={{marginBottom: '-500%'}}></View>
           
           
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
    imgtl:{
        position:'absolute',
        bottom:150,
        width:100,
        height:100,
        bottom:150,
        right:5,
    },
});