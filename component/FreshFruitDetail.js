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
import "@expo/metro-runtime";
import {bottomNav} from "../data";
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import CommonLayout from "./CommonLayout";

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
        require('../assets/banner-FreshFruit4.jpg'),
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
        <CommonLayout title={'Fresh Fruit'}>
          <View style={{flex:1}}>
            {/* search bar */}
            <View style={{width:'100%', height:'10%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
            <View style={{flexDirection:'row', borderWidth:1, padding:5, borderRadius:10, width:'85%'}}>
                <Image source={require('../assets/glass.png')} style={{width:30, height:30}}/>
                <TextInput
                style={{flex:1}}
                placeholder='Search' placeholderTextColor='background: #BCC1CA' />
            </View>
            <TouchableOpacity style={{borderWidth:1,padding:10, borderRadius:10}}>
                <Image source={require('../assets/Filterlist.png')}/>
            </TouchableOpacity>
            </View>
            <View style={{flex:10}}>
            <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
            {/* banner */}
            <View style={{width:'100%', height:'15%', marginBottom:15}}>
            <Swiper
            style={{height:'100%', height:'100%'}}
           dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 10, height: 10, borderRadius: 4, margin: 3}} />}
           activeDot={<View style={{backgroundColor: 'orange', width: 20, height: 10, borderRadius: 4, margin: 3}} />}
            paginationStyle={{bottom:-17}}
            showsPagination={true}
           loop={true}
            >
                {
                    imgs_banner.map(
                        (item,index)=>
                        (
                            <View style={{flex:1, alignItems:'center', justifyContent:'center',marginHorizontal:3}} key={index}>
                            <Image source={item} style={{width:'100%', height:'100%', borderRadius:10}} resizeMode='cover'/>
                            </View>
                        )
                    )
                }
            </Swiper>
            </View>
                
                {/* fresh fruit */}
    
            <View style={{flex:1}}>
            <FlatList
                data={displayProduct}
                keyExtractor={item => item.id}
                renderItem={
                    ({item})=>(
                        <View style={{borderColor:'#BCC1CA',borderWidth:1,width:'48%', marginVertical:5, marginRight:6, borderRadius:15}}>
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
            <TouchableOpacity onPress={toggleShowAll} style={{borderWidth:1, padding:10, borderRadius:10, marginVertical:10, marginHorizontal:10, alignItems:'center'}}>
                <Text>{showAll ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
            </View>  
        
        {/* Relevant Products */}
       
        <View style={{margin:10,flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginTop:10}}>
                    <Text style={{fontSize:20,fontWeight:600}}>Relevent products</Text>
                    <TouchableOpacity onPress={toggleShowAllRelevant}>
                    <Text style={{color:'#9095A0', fontSize:15}}> {showAllRelevant?'See Less':'See All'} > </Text>
                    </TouchableOpacity>
                </View>
           <View style={{flex:1}}>
           <FlatList
            data={displayRelevantProduct}
            keyExtractor={item => item.id}
            renderItem={
                ({item})=>(
                    <View style={{flex:1, borderWidth:1, margin:5,borderRadius:5,borderColor:'#F3F4F6', marginHorizontal:10, flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', margin:10}}> 
                            <Image source={item.img} resizeMode='contain' style={{width:80, height:80}}/>
                            <View style={{justifyContent:'space-around', marginLeft:10}}>
                                <Text style={{fontWeight:500, fontSize:16}}>{item.name}</Text>
                                <Image source={item.rating} />
                                
                            </View>
                        </View>

                            <View style={{justifyContent:'space-around', marginRight:10}}>
                                <TouchableOpacity>
                                    <Image source={require('../assets/Button_Add.png')}/>
                                    
                                </TouchableOpacity>
                                <Text style={{fontWeight:600, fontSize:16}}>{item.price}</Text>
                            </View>
                        

                    </View>

                )
            }   
           />
           </View>
    </ScrollView>
    </View>
                

</View>
            
        </CommonLayout>


    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    }
});
