import React,{useState} from 'react';
import { View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput, Dimensions } from 'react-native';
import { bottomNav } from "../data";
import Icon from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';

const windowWidth = Dimensions.get('window').width;
export default function FreshFruitDetail({ navigation, route }) {
    const [showAll,setShowAll]=useState(false)
    const tooggleShowAll= ()=>{
        setShowAll(!showAll)
    }
    const imgs_banner = [
        require('../assets/banner-FreshFruit1.png'),
        require('../assets/banner-FreshFruit2.jpg'),
        require('../assets/banner-FreshFruit3.png'),
    ]
    const fresh_fruit_data=[
        {
            id:1,
            name:'Pear',
            price:'$3',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Pearl.png')
        },
        {
            id:2,
            name:'Avocado',
            price:'$4',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Avocado.png')
        },
        {
            id:3,
            name:'Cherry',
            price:'$10',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Cherry.png')
        },
        {
            id:4,
            name:'Orange',
            price:'$7',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/Orange.png')
        },
        {
            id:4,
            name:'bell pepper',
            price:'$7',
            rating: require('../assets/Rating1.png'),
            img: require('../assets/bell_pepper.png')
        },

    ]
    const displayProduct= showAll?fresh_fruit_data: fresh_fruit_data.slice(0,4);
    return (
        <View style={styles.container}>
            {/* header */}
            <View style={{ height: '5%', width: '100%', marginTop: 25, flexDirection: 'row', justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 8 }}>
                    <Image source={require('../assets/Chevron left large.png')} style={{ width: 30, height: 30 }} />
                    <Text style={{ fontSize: 18, lineHeight: 28, fontWeight: 700, marginLeft: 10 }}>Fresh Fruit</Text>
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginRight: 5 }}>
                    <Image source={require('../assets/Shopping cart.png')} style={{ width: 30, height: 30 }} />
                    <Image source={require('../assets/Rectangle.png')} style={{ backgroundColor: '#C3EFB9', borderRadius: 50, marginLeft: 10 }} />
                </View>
            </View>

            {/* search bar */}
            <View style={{ width: '100%', height: '10%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ flexDirection: 'row', padding: 8, borderRadius: 5, width: '80%', backgroundColor: '#F3F4F6', marginLeft: 10, marginTop: 10, height: '50%' }}>
                    <Image source={require('../assets/glass.png')} style={{ width: 30, height: 30 }} />
                    <TextInput
                        style={{ flex: 1, paddingLeft: 10 }}
                        placeholder='Search'
                        placeholderTextColor='grey'
                    />
                </View>

                <TouchableOpacity style={{ padding: 10, borderRadius: 5, backgroundColor: '#F3F4F6', marginRight: 10, height: '50%', marginTop: 10 }}>
                    <Image source={require('../assets/Filter list.png')} />
                </TouchableOpacity>
            </View>

            {/* banner */}
            <View style={{ height: '25%' }}>
                <Swiper style={{ height: hp('20%') }}>
                    {
                        imgs_banner.map((item, index) => (
                            <View key={index} style={styles.slide}>
                                <Image source={item} style={[styles.image, { width: windowWidth }]} />
                            </View>
                        ))
                    }
                </Swiper>
            </View>

            {/* Render product */}
            <ScrollView style={{flex:1, marginBottom:50}}>
            <View style={{flex:1, marginHorizontal:10}}>
            <FlatList
                data={displayProduct}
                keyExtractor={item => item.id}
                renderItem={
                    ({item})=>(
                        <View style={{borderColor:'#BCC1CA',borderWidth:1,width:'48%', marginVertical:5, marginHorizontal:5, borderRadius:15}}>
                            <Image source={item.img} style={{backgroundColor:'#F3F4F6', width:'100%',height:150, borderRadius:15}}/>
                            <View style={{marginHorizontal:5, marginHorizontal:10}}>
                            <View style={{justifyContent:'space-between',flexDirection:'row', marginTop:5, alignItems:'center'}}>
                                <Text style={{fontWeight:700}}>{item.name}</Text>
                                <TouchableOpacity> 
                                <Image source={require('../assets/Button_Add.png')} style={{width:30, height:30}}/>
                                </TouchableOpacity>
                                    
                            </View>
                            <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
                                <Image source={item.rating}/>
                                <Text style={{fontWeight:700, fontSize:15}}>{item.price}</Text>
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
            <TouchableOpacity style={{backgroundColor:'#F3F4F6', alignSelf:'center', width:'90%', borderRadius:10,padding:10}}
            onPress={tooggleShowAll}>
                <Text style={{color:'#FF6C44', fontSize:15, textAlign:'center',color:'#565E6C'}}> {showAll?'Show Less':'Show All' } </Text>
            </TouchableOpacity>
            </View>
        </ScrollView>


            {/* footer */}
            <View style={styles.bottomNav}>
                <TouchableOpacity>
                    <Icon name="home" size={wp('6%')} color="#000" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="search" size={wp('6%')} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="heart" size={wp('6%')} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="mail" size={wp('6%')} color="#aaa" />
                </TouchableOpacity>

                <TouchableOpacity>
                    <Icon name="person" size={wp('6%')} color="#aaa" />
                </TouchableOpacity>
            </View>
    </View>
        
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
        height:50
    },
    slide: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        height: 200,
        borderRadius: 10,
        resizeMode: 'cover',
    }
});
