import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native';
import CommonLayout from './CommonLayout';
import { Picker } from '@react-native-picker/picker';
import { getDatabase, ref, get } from 'firebase/database'; 
import { firebaseApp } from '../utils/FirebaseConfig';

export default function FashionScreen({ navigation, route }) {
  const [data, setData] = useState([]); 
  const [selectedCategory, setSelectedCategory] = useState('');  
  const [selectedGender, setSelectedGender] = useState('');

  const db = getDatabase(firebaseApp);
  const dataRef = ref(db, 'fashion'); 
  const formatCurrencyVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  };

  const getData = async (category, gender) => {  
    try {
      const snapshot = await get(dataRef); 
      if (snapshot.exists()) {
        let allData = Object.keys(snapshot.val()).map(key => ({
          id: key,
          ...snapshot.val()[key],
        }));

       
        if (selectedCategory) {  
          allData = allData.filter(item => item.category === selectedCategory);
        }

        if (selectedGender) {
          allData = allData.filter(item => item.gender === selectedGender);
        }

        setData(allData);  
      } else {
        setData([]);  
      }
    } catch (error) {
      console.error('Error fetching data from Firebase:', error); 
    }
  };


  useEffect(() => {
    getData(selectedCategory, selectedGender); 
  }, [selectedCategory, selectedGender]);

  const renderProductItem = ({ item }) => {
    const imageUri = item.colors[0]?.images[0];

    return (
      <TouchableOpacity style={styles.productContainer}
        onPress={() => { navigation.navigate('DetailFashion', { it: item }) }}>
        {imageUri ? (
          <Image source={{ uri: imageUri }} style={styles.productImage} />
        ) : (
          <Text>No image available</Text>
        )}
        <View style={{ justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Text style={styles.textP}>{item.name}</Text>
          <Text style={styles.textprice}>{formatCurrencyVND(item.price)}</Text>
          <Image source={{ uri: item.imgrating }} style={{ width: 100, height: 20, marginBottom: 10 }} />
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <CommonLayout title="Fashion">
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
          <TouchableOpacity
            style={[styles.buttonStyle, selectedCategory === '' && styles.selected]}
            onPress={() => setSelectedCategory('')}>
            <Text style={[styles.textButton, selectedCategory === '' && styles.textSelected]}>All</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, selectedCategory === 'shirt' && styles.selected]}
            onPress={() => setSelectedCategory('shirt')}>
            <Text style={[styles.textButton, selectedCategory === 'shirt' && styles.textSelected]}>Shirt</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.buttonStyle, selectedCategory === 'jean' && styles.selected]}
            onPress={() => setSelectedCategory('jean')}>
            <Text style={[styles.textButton, selectedCategory === 'jean' && styles.textSelected]}>Jean</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View style={{ padding: 10, width: '100%', borderTopColor: '#F3F4F6', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
          <Image source={require('../assets/filter.png')} style={{ width: 30, height: 30, marginHorizontal: 10 }} />
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue) => setSelectedGender(itemValue)}
            style={styles.picker}>
            <Picker.Item label="All" value="" />
            <Picker.Item label="Female" value="nu" />
            <Picker.Item label="Male" value="nam" />
          </Picker>
        </View>
      </View>
      <View style={{ flex: 10 }}>
        <FlatList
          data={data}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          contentContainerStyle={styles.flatListContainer}
        />
      </View>
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  buttonStyle: {
    padding: 10,
    borderBottomWidth: 1,
    width: '25%',
    alignItems: 'center',
    borderColor: '#F3F4F6',
  },
  textButton: {
    fontSize: 17,
    fontWeight: '600',
    color: '#FF6026',
  },
  productContainer: {
    borderWidth: 1,
    borderColor: '#BCDAF9',
    borderRadius: 10,
    width: '47%',
    alignItems: 'center',
    margin: 5,
  },
  productImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  textP: {
    fontSize: 16,
    fontWeight: '700',
    padding: 5,
    textAlign: 'center',
  },
  textprice: {
    fontSize: 15,
    fontWeight: '600',
    marginBottom: 5,
  },
  selected: {
    borderRadius: 2,
    borderColor: '#FF6026',
    borderBottomWidth: 2,
  },
  textSelected: {
    color: '#FF6026',
  },
  filterTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
    textAlign: 'center',
  },
  picker: {
    height: 40,
    borderWidth: 0.5,
    borderColor: 'grey',
    borderRadius: 5,
    width: '25%',
  },
  flatListContainer: {
    marginBottom: '-700%',
  },
});
