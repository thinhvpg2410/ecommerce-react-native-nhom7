import React from 'react';
import {View, Text, Image, FlatList, StyleSheet, TouchableOpacity, ScrollView, TextInput} from 'react-native';
import {bottomNav} from "../data";
import Icon from 'react-native-vector-icons/Ionicons';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
export default function FreshFruitDetail({navigation, route}) {
    return(
        <View style={styles.container}>
        {/* header */}
        <View style={{height:'5%', width:'100%', marginTop:25, flexDirection:'row',justifyContent:'space-between'}}>
            <View style={{flexDirection:'row',alignItems:'center', marginLeft:8}}>
            <Image source={require('../assets/Chevron left large.png')} style={{width:30,height:30}}/>
            <Text style={{fontSize:18,lineHeight:28,fontWeight:700,marginLeft:10}}>Fresh Fruit </Text>
            </View>
            <View style={{flexDirection:'row',alignItems:'center',marginRight:5}}>
            <Image source={require('../assets/Shopping cart.png')} style={{width:30,height:30}}/>
            <Image source={require('../assets/Rectangle.png')} style={{backgroundColor:'#C3EFB9', borderRadius:50, marginLeft:10}}/>
            </View> 
        </View>
        {/* search bar */}
        <View style={{ width:'100%', height:'10%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
            <View style={{flexDirection:'row', borderWidth:0,padding:8, borderRadius:5, width:'80%', backgroundColor:'#F3F4F6', marginLeft:10, marginTop:10,height:'50%'}}>
                <Image source={require('../assets/glass.png')} style={{width:30, height:30}}/>
                <TextInput placeholder='Search' placeholderTextColor='grey'/>
             </View>
    
                <TouchableOpacity style={{ padding:10, borderRadius:5,backgroundColor:'#F3F4F6', marginRight:10, height:'50%', marginTop:10}}>
                    <Image source={require('../assets/Filter list.png')} />
                </TouchableOpacity>
        </View>
        {/* banner */}
        <View style={{height:'15%', backgroundColor:'yellow'}}>

        </View>
        {/* product */}
        <View style={{flex:1}}>

        </View>


        {/* footer */}
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

            </View>
        </View>
    );
}
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'#fff',
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


});