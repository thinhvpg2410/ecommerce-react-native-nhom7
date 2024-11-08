import React, {useState} from 'react';
import {
    View,
    Text,
    Image,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    ScrollView,
    TextInput,
    Dimensions
} from 'react-native';
import {bottomNav} from "../data";
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import CommonLayout from "./CommonLayout";

const windowWidth = Dimensions.get('window').width;
export default function FreshFruitDetail({navigation, route}) {
    const [showAll, setShowAll] = useState(false)
    const [showAllRelevant, setShowAllRelevant] = useState(false)
    const toggleShowAll = () => {
        setShowAll(!showAll)
    }
    const toggleShowAllRelevant = () => {
        setShowAllRelevant(!showAllRelevant)
    }
    const imgs_banner = [
        require('../assets/banner-FreshFruit1.png'),
        require('../assets/banner-FreshFruit2.jpg'),
        require('../assets/banner-FreshFruit3.png'),
    ]
    const fresh_fruit_data = [
        {
            id: 1,
            name: 'Pear',
            price: '$3',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Pearl.png')
        },
        {
            id: 2,
            name: 'Avocado',
            price: '$4',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Avocado.png')
        },
        {
            id: 3,
            name: 'Cherry',
            price: '$10',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Cherry.png')
        },
        {
            id: 4,
            name: 'Orange',
            price: '$7',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Orange.png')
        },
        {
            id: 5,
            name: 'bell pepper',
            price: '$7',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/bell_pepper.png')
        },
        {
            id: 6,
            name: 'Peach',
            price: '$15',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Peach.png'),
            category: 'Relevant',
        },
        {
            id: 7,
            name: 'Pomegranate',
            price: '$24',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Pome.png'),
            category: 'Relevant',
        },
        {
            id: 8,
            name: 'Grape',
            price: '$30',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/grape.png'),
            category: 'Relevant',
        },


    ]
    const relevantProducts = fresh_fruit_data.filter(item => item.category === 'Relevant');
    const normalProducts = fresh_fruit_data.filter(item => item.category !== 'Relevant');
    const displayProduct = showAll ? normalProducts : normalProducts.slice(0, 4);
    const displayRelevantProduct = showAllRelevant ? relevantProducts : relevantProducts.slice(0, 2);
    return (
        <CommonLayout title={'Frest Fruit'}>

            <ScrollView style={{paddingBottom: hp('10%'),}}>
                {/* search bar */}
                <View style={{
                    width: '100%',
                    height: '10%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <View style={{
                        flexDirection: 'row',
                        padding: 8,
                        borderRadius: 5,
                        width: '80%',
                        backgroundColor: '#F3F4F6',
                        marginLeft: 10,
                        marginTop: 10,
                        height: '50%'
                    }}>
                        <Icon name="search" size={wp('7%')} color="#aaa"/>
                        <TextInput
                            style={{flex: 1, paddingLeft: 10}}
                            placeholder='Search'
                            placeholderTextColor='grey'
                        />
                    </View>

                    <TouchableOpacity style={{
                        padding: 10,
                        borderRadius: 5,
                        backgroundColor: '#F3F4F6',
                        marginRight: 10,
                        height: '50%',
                        marginTop: 10
                    }}>
                        <Image source={require('../assets/Filter list.png')}/>
                    </TouchableOpacity>
                </View>

                {/* banner */}
                <View style={{height: '25%'}}>
                    <Swiper style={{height: hp('20%')}}>
                        {
                            imgs_banner.map((item, index) => (
                                <View key={index} style={styles.slide}>
                                    <Image source={item} style={[styles.image, {width: windowWidth}]}/>
                                </View>
                            ))
                        }
                    </Swiper>
                </View>

                {/* Render product */}

                <View style={{flex: 1, marginHorizontal: 10}}>
                    <FlatList
                        data={displayProduct}
                        keyExtractor={item => item.id}
                        renderItem={
                            ({item}) => (
                                <View style={{
                                    borderColor: '#BCC1CA',
                                    borderWidth: 1,
                                    width: '48%',
                                    marginVertical: 5,
                                    marginHorizontal: 5,
                                    borderRadius: 15
                                }}>
                                    <Image source={item.img} style={{
                                        backgroundColor: '#F3F4F6',
                                        width: '100%',
                                        height: 150,
                                        borderRadius: 15
                                    }}/>
                                    <View style={{marginHorizontal: 10}}>
                                        <View style={{
                                            justifyContent: 'space-between',
                                            flexDirection: 'row',
                                            marginTop: 5,
                                            alignItems: 'center'
                                        }}>
                                            <Text style={{fontWeight: 700}}>{item.name}</Text>
                                            <TouchableOpacity>
                                                <Image source={require('../assets/Button_Add.png')}
                                                       style={{width: 30, height: 30}}/>
                                            </TouchableOpacity>

                                        </View>
                                        <View style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center'
                                        }}>
                                            <Image source={item.rating}/>
                                            <Text style={{fontWeight: 700, fontSize: 15}}>{item.price}</Text>
                                        </View>
                                    </View>
                                </View>

                            )
                        }
                        numColumns={2}
                    />
                </View>
                <View>
                    {/* SeeAll */}
                    <TouchableOpacity style={{
                        backgroundColor: '#F3F4F6',
                        alignSelf: 'center',
                        width: '90%',
                        borderRadius: 10,
                        padding: 10
                    }}
                                      onPress={toggleShowAll}>
                        <Text style={{
                            fontSize: 15,
                            textAlign: 'center',
                            color: '#565E6C'
                        }}> {showAll ? 'Show Less' : 'Show All'} </Text>
                    </TouchableOpacity>
                </View>
                <View style={{
                    margin: 25,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <Text style={{fontSize: 20, fontWeight: 600}}>Relevent products</Text>
                    <TouchableOpacity onPress={toggleShowAllRelevant}>
                        <Text style={{
                            color: '#9095A0',
                            fontSize: 15
                        }}> {showAllRelevant ? 'See Less' : 'See All'} > </Text>
                    </TouchableOpacity>
                </View>
                <View style={{flex: 1}}>
                    <FlatList
                        data={displayRelevantProduct}
                        keyExtractor={item => item.id}
                        renderItem={
                            ({item}) => (
                                <View style={{
                                    flex: 1,
                                    borderWidth: 1,
                                    margin: 5,
                                    borderRadius: 5,
                                    borderColor: '#F3F4F6',
                                    marginHorizontal: 10,
                                    flexDirection: 'row',
                                    justifyContent: 'space-between'
                                }}>
                                    <View style={{flexDirection: 'row', margin: 10}}>
                                        <Image source={item.img} resizeMode='contain'
                                               style={{width: 80, height: 80}}/>
                                        <View style={{justifyContent: 'space-around', marginLeft: 10}}>
                                            <Text style={{fontWeight: 500, fontSize: 16}}>{item.name}</Text>
                                            <Image source={item.rating}/>

                                        </View>
                                    </View>

                                    <View style={{justifyContent: 'space-around', marginRight: 10}}>
                                        <TouchableOpacity>
                                            <Image source={require('../assets/Button_Add.png')}/>
                                        </TouchableOpacity>
                                        <Text style={{fontWeight: 600, fontSize: 16}}>{item.price}</Text>
                                    </View>
                                </View>
                            )}
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
        height: 50
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        borderRadius: 5,
        resizeMode: 'cover',
    },

});
