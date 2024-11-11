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
            img: [
                 require('../assets/Pearl.png'),
                 require('../assets/le-nam-phi-18.jpg'),
                 require('../assets/pears-south-africa-201807-08.png')
            ],
            star:4.5,
            review: 99,
            description: 'Pear is a sweet fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {
                userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
        },
        {
            id: 2,
            name: 'Avocado',
            price: '$4',
            rating: require('../assets/Rating1.png'),
            img: [
            require('../assets/Avocado.png'),
            require('../assets/bo1.jpg'),

            ],
            star:4.1,
            review: 100,
            description:'Avocado is a fruit that is said to be rich in healthy fats, fiber, and various vitamins and minerals. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },
                {userName: 'John',
                    userAvatar: require('../assets/doraemon2.png'),
                    comment: 'So fresh, I have never eaten this before!! So sweet',
                    Date: '2 week ago',
                },

            ]
        },
        {
            id: 3,
            name: 'Cherry',
            price: '$10',
            rating: require('../assets/Rating1.png'),
            img: [
            require('../assets/Cherry.png'),
            require('../assets/Cherry.png')


            ],
            star:4.2,
            review: 150,
            description:'Cherry is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },
                {userName: 'Cute Doraemon',
                    userAvatar: require('../assets/doraemon2.png'),
                    comment: 'So fresh, I have never eaten this before!! So sweet',
                    Date: '1 week ago',
                },

            ]
        },
        {
            id: 4,
            name: 'Orange',
            price: '$7',
            rating: require('../assets/Rating1.png'),
            img:[
            require('../assets/Orange.png'),
            require('../assets/Orange1.png')
            ],
            star:5,
            review: 50,
            description:'Orange is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
        },
        {
            id: 5,
            name: 'bell pepper',
            price: '$7',
            rating: require('../assets/Rating1.png'),
            img:[
                 require('../assets/bell_pepper.png'),
                 require('../assets/bell1.jpg')
            ],
            star:4.5,
            review: 99,
            description:'Bell pepper is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
        },
        {
            id: 6,
            name: 'Peach',
            price: '$15',
            rating: require('../assets/Rating1.png'),
            img: [
                require('../assets/Peach.png'),
                require('../assets/peach1.jpg')
            ],
            category: 'Relevant',
            star:4.5,
            review: 99,
            description:'Peach is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
        },
        {
            id: 7,
            name: 'Pomegranate',
            price: '$24',
            rating: require('../assets/Rating1.png'),
            img: [
                require('../assets/Pome.png'),
                require('../assets/Pomegranate1.jpg')

            ],
            category: 'Relevant',
            star:4.5,
            review: 99,
            description:'Pomegranate is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
        },
        {
            id: 8,
            name: 'Grape',
            price: '$30',
            rating: require('../assets/Rating1.png'),
            img: [
                require('../assets/grape.png'),
                require('../assets/grape1.jpg')
            ],
            star: 4.5,
            review: 99,
            category: 'Relevant',
            description:'Grape is a fruit that is said to be rich in antioxidants, dietary fiber, and vitamin C. It is also said to be good for the heart and may help in weight loss.',
            comments:[
                {userName: 'Thu Trầm',
                userAvatar: require('../assets/avt_doraemon.png'),
                comment: 'I love this',
                Date: 'A day ago'
                },
                {userName: 'Trầm Hồ',
                    userAvatar: require('../assets/avt_doraemon.png'),
                    comment: 'Delicious, I will buy it again',
                    Date: '3 days ago',
                },

            ]
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
            <View style={{width:'100%', height:150, marginBottom:15}}>
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
                <View>
            <View style={{flex:1}}>
            <FlatList
                data={displayProduct}
                keyExtractor={item => item.id}
                renderItem={
                    ({item})=>(
                        <TouchableOpacity style={{borderColor:'#BCC1CA',borderWidth:1,width:'48%', marginVertical:5, marginRight:6, borderRadius:15}}
                        onPress={()=>{navigation.navigate('DetailFreshFruit',{np:item})}}>
                            <Image source={item.img[0]} style={{backgroundColor:'#F3F4F6', width:'100%',height:150, borderRadius:15}}/>
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
                        </TouchableOpacity>
                        
                    )
                }
                numColumns={2}  
            />
        </View>
        </View>
        <View>
            <TouchableOpacity onPress={toggleShowAll} style={{borderWidth:1, padding:10, borderRadius:10, marginVertical:10, marginHorizontal:10, alignItems:'center'}}>
                <Text>{showAll ? 'Show Less' : 'Show More'}</Text>
            </TouchableOpacity>
            </View>  
        
        {/* Relevant Products */}
       <View>
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
                        <TouchableOpacity style={{flex:1, borderWidth:1, margin:5,borderRadius:5,borderColor:'#F3F4F6', marginHorizontal:10, flexDirection:'row', justifyContent:'space-between'}}
                        onPress={()=>{navigation.navigate('DetailFreshFruit',{rp:item})}}>
                        <View style={{flexDirection:'row', margin:10}}> 
                            <Image source={item.img[0]} resizeMode='contain' style={{width:80, height:80}}/>
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
                            </TouchableOpacity>

                    

                )
            }   
           />
           </View>
           </View>
           <View style={{marginBottom:'-700%', opacity:0}}></View>
         
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