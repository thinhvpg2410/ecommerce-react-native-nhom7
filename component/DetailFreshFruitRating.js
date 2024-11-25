import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView , TouchableOpacity, FlatList} from 'react-native';
import { getDatabase, ref, push, set } from 'firebase/database';
import { getAuth } from 'firebase/auth';
import CommonLayout from './CommonLayout';
import "@expo/metro-runtime";
import Swiper from 'react-native-swiper';

export default function DetailFreshFruitRating({ route }) {
    // Lấy np hoặc rp từ params
    const { np, rp } = route.params;
    // Kiểm tra nếu có dữ liệu np thì hiển thị np, nếu không có np thì hiển thị rp
    const dataToDisplay = np ? np : rp;

    const db = getDatabase();
    const auth = getAuth();

    const addToCart = async () => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const cartRef = ref(db, `carts/${userId}`);
            const newCartItemRef = push(cartRef);
            await set(newCartItemRef, {
                id: dataToDisplay.id,
                name: dataToDisplay.name,
                price: dataToDisplay.price,
                image: dataToDisplay.img[0],
                quantity: 1,
            });
            console.log('Item added to cart');
        } else {
            console.log('User not authenticated');
        }
    };

    return (
      <CommonLayout title={dataToDisplay ? dataToDisplay.name : 'Detail'}>
        <View style={{flex:1}}>
        <ScrollView style={{flex:1}} showsVerticalScrollIndicator={false}>
          <View style={{width:'100%', height:200, marginBottom:15}}>
            <Swiper
            style={{flex:1}}
              dot={<View style={{backgroundColor: 'rgba(0,0,0,.2)', width: 10, height: 10, borderRadius: 4, margin: 3}} />}
              activeDot={<View style={{backgroundColor: 'orange', width: 20, height: 10, borderRadius: 4, margin: 3}} />}
              paginationStyle={{bottom:-17}}
              showsPagination={true}
              loop={true}
            >
                {
                    dataToDisplay?.img?.map((item, index) => (
                        <View style={{flex:1, alignItems:'center', justifyContent:'center', marginHorizontal:3, borderRadius:20}} key={index}>
                            <Image source={item} style={{width:'100%', height:'100%', borderRadius:20, backgroundColor:'#F3FCF0'}} resizeMode='cover'/>
                        </View>
                    ))
                }
            </Swiper>
          </View>

          <View style={{flexDirection:'row', justifyContent:'space-between'}}>
          <Text style={{fontSize: 20, fontWeight: 'bold'}}>{dataToDisplay?.price}</Text>
          <View style={{flexDirection:'row'}}>
            <Image source={require('../assets/star.png')}/>
            <View style={{flexDirection:'row'}}>
            <Text style={{fontWeight:700, fontSize:16}} >{dataToDisplay?.star}</Text>
            <Text style={{fontSize:16, color:'#9095A0'}}> ({dataToDisplay?.review}) reviews</Text>
            </View>
          </View>
          </View>
          <View style={{borderTopWidth:1, marginTop:20,borderColor:'#F3F4F6'}}>
            <Text style={{fontSize: 18, fontWeight: 'bold'}}>Desciption</Text>
            <Text style={{marginVertical: 15}}>{dataToDisplay?.description}</Text>
            <View style={{flexDirection:'row', justifyContent:'space-between', marginTop:20}}>
            <View>
            <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('../assets/Delivery1.png')}/>
                    <Text style={styles.textIcon}> Express</Text>
            </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={require('../assets/Star 1.png')}/>
                <Text style={styles.textIcon}> Good review</Text> 
                </View>
            </View> 
            
                <View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                    <Image source={require('../assets/Reply 1.png')}/>
                    <Text style={styles.textIcon}> 30-day free return</Text>
                </View>
                <View style={{flexDirection:'row', alignItems:'center'}}>
                <Image source={require('../assets/Award 1.png')}/>
                <Text style={styles.textIcon}> Authorized shop</Text> 
                </View>
                </View>
                </View>
                </View>
                {/* Review */}
                <View style={{borderTopWidth:1, borderColor:'#F3F4F6', marginTop:15}}>
                <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', marginTop:15}}>
                    <Text style={{fontWeight:'bold', fontSize:20}}> Reviews </Text>
                    <TouchableOpacity>
                        <Text style={styles.textIcon}>See All > </Text>
                    </TouchableOpacity>
                </View>
                <View style={{backgroundColor:"#F8F9FA", borderWidth:1, borderColor:'#BCC1CA', borderRadius:10,marginTop:10, flexDirection:'row', justifyContent:'space-between', padding:10}}>
                <View style={{ justifyContent:'center', padding:10}}>
                    <Text style={{fontWeight:400, fontSize:25, lineHeight:35, textAlign:'center'}}>{dataToDisplay?.star}/5</Text>
                    <Text style={{color:'#9095A0', fontSize:15, marginTop:10, textAlign:'center'}}>({dataToDisplay?.review} reviews)</Text>
                    <Image source={dataToDisplay?.rating} style={{marginTop:10, height:20, width:100}}/>
                </View>
                <View style={{justifyContent:'center', marginRight:20}}>
                    <View style={{flexDirection:'row'}}> 
                    <Image source={require('../assets/Slider 2.png')}/>
                    <Text style={styles.textNum}> 5</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/Slider 3.png')}/>
                    <Text style={styles.textNum}> 4</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/Slider 4.png')}/>
                    <Text style={styles.textNum}> 3</Text>
                     </View>
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/Slider 5.png')}/>
                    <Text style={styles.textNum}> 2</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                    <Image source={require('../assets/Slider 6.png')}/>
                    <Text style={styles.textNum}> 1</Text>
                    </View>
                </View>
                

                </View>
                
                </View>
                {/* comment */}
                <View>
                <View style={{marginTop:20, flex:1}}>
                <FlatList
                    data={dataToDisplay?.comments}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={
                        ({item})=>(
                            <View style={{ padding: 10, marginTop: 3, flexDirection: 'row' }}>
  <View style={{ flexDirection: 'row', width: '75%' }}>
    <Image 
      source={item.userAvatar} 
      style={{ width: 30, height: 30, borderRadius: 50, backgroundColor: '#BCDAF9' }} 
    />
    <View style={{ marginLeft: 10, flex: 1 }}>
      <Text style={{ fontWeight: '700' }}>{item.userName}</Text>
      <Text style={{ marginTop: 3, flexWrap: 'wrap', width: '100%'}}>{item.comment}</Text>
    </View>
  </View>
  <View>
    <Text style={{ color: '#9095A0' }}>
      {item.Date}
    </Text>
  </View>
</View>

                        )
                    }
                />
                    
                </View>
                </View>

                <View style={{flexDirection:'row', marginTop:10}}>
                    <TouchableOpacity style={{borderColor:'#FF6026', borderWidth:1, borderRadius:5, padding:10}}>
                    <Image source={require('../assets/Shopping cart.png')} style={{width:30, height:30}}/>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => addToCart(dataToDisplay)}
                        style={{backgroundColor:'#FF6026', flex:1, borderRadius:10, marginLeft:10, alignItems:'center', justifyContent:'center'}}>
                        <Text style={{color:'#FFFFFF', fontWeight:400, fontSize:18}}>Buy Now</Text>
                    </TouchableOpacity>
                </View>
                <View style={{marginBottom:'-700%'}}></View>
                </ScrollView>
            </View>
          
      </CommonLayout>
    );
}
const styles = StyleSheet.create({
    textIcon:{
        fontWeight:400,
        color:'#9095A0',
        fontSize:16,
        lineHeight:22,

    },
    textNum:{
        color:'#6E7787'
    }
});