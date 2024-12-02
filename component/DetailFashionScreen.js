import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ScrollView, TouchableHighlightBase } from 'react-native';
import CommonLayout from './CommonLayout';
import { TouchableHighlight } from 'react-native';
import {getDatabase, onValue, push, ref, set, update} from "firebase/database";
import {getAuth} from "firebase/auth";


export default function DetailFashionScreen({ navigation, route }) {
  const { it } = route.params;
  const [selectedColor, setSelectedColor] = useState(it.colors[0]);
  const [mainImage, setMainImage] = useState(selectedColor.images[0]);
  const [selectedSize, setSelectedSize] = useState('M');
  const [quantity, setQuantity] = useState(1);
  const formatCurrencyVND = (number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(number);
  };

  const handleColorChange = (color) => {
    setSelectedColor(color);
    setMainImage(color.images[0]);
  };
  const total= parseFloat(it.price) *parseInt(quantity);

    const db = getDatabase();
    const auth = getAuth();

    const addToCart = async () => {
        const user = auth.currentUser;
        if (user) {
            const userId = user.uid;
            const cartRef = ref(db, `carts/${userId}`);
            const sanitizedColor = selectedColor.color.replace(/[^a-zA-Z0-9]/g, '')
            const newItemId = `${it.id}-${sanitizedColor}-${selectedSize}`;

            onValue(cartRef, (snapshot) => {
                const data = snapshot.val();

                if (data && data[newItemId]) {
                    const updatedQuantity = data[newItemId].quantity + quantity;
                    const itemRef = ref(db, `carts/${userId}/${newItemId}`);
                    update(itemRef, {
                        quantity: updatedQuantity,
                    }).then(() => {
                        console.log('Item quantity updated in the cart');
                    }).catch((error) => {
                        console.error('Error updating item quantity:', error);
                    });
                } else {
                    set(ref(db, `carts/${userId}/${newItemId}`), {
                        id: it.id,
                        name: it.name,
                        price: it.price,
                        image: mainImage,
                        quantity: quantity,
                        type: selectedSize,
                        color: selectedColor.color,
                    }).then(() => {
                        console.log('Item added to cart');
                    }).catch((error) => {
                        console.error('Error adding item to cart:', error);
                    });
                }
            }, {
                onlyOnce: true
            });
        } else {
            console.log('User not authenticated');
        }
    };

  return (
    <CommonLayout title={it.name}>
    <ScrollView>
        <View style={styles.container}>
          <Image source={{ uri: mainImage }} style={styles.mainImage} />
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Text style={styles.price}>{formatCurrencyVND(it.price)}</Text>
          <Text style={styles.discount}>{it.discount}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginTop:2}}>
          <Text style={styles.name}>{it.name}</Text>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Image source={{ uri: it.imgrating }} style={styles.ratingImage} />
          <Text style={styles.rating}> {it.rating}</Text>
          </View>
          </View>
          <Text style={styles.description}>{it.description}</Text>
        </View>

           
          <View style={styles.colorOptions}>
          <Text style={[styles.container,{fontWeight:700}]}>Color:</Text>
            {it.colors.map((color, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => handleColorChange(color)}
                style={[styles.colorOption, { borderWidth: selectedColor.color === color.color ? 2 : 0 }]} >
                <Image source={{ uri: color.color }} style={styles.colorImage} />
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.sizeOptions}>
            {it.sizes.map((size) => (
              <TouchableOpacity
                key={size}
                style={[styles.sizeBox, selectedSize === size && styles.selectedSizeBox]}
                onPress={() => setSelectedSize(size)} >
                <Text style={styles.sizeText}>{size}</Text>
              </TouchableOpacity>
            ))}
          </View>

<View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
          <View style={styles.quantityContainer}>
            <TouchableHighlight
            style={styles.ButtonQuantity}
            underlayColor={'#FF6026'}
             onPress={() => setQuantity(Math.max(1, quantity - 1))}>
              <Text style={styles.quantityButton}>-</Text>
            </TouchableHighlight>
            <Text style={styles.quantity}>{quantity}</Text>
            <TouchableHighlight 
             style={styles.ButtonQuantity}
             underlayColor={'#FF6026'}
             onPress={() => setQuantity(quantity + 1)}>
              <Text style={styles.quantityButton}>+</Text>
            </TouchableHighlight>
          </View>
          <Text style={[styles.quantityButton,{fontSize:20}]}>Total: {formatCurrencyVND(total)}</Text>
</View>

          <TouchableOpacity
              onPress={() => addToCart(it)}
              style={styles.addToCartButton}
          >
            <Text style={styles.addToCartText}>Add to cart</Text>
          </TouchableOpacity>
          <View style={{marginBottom:'-700%'}}></View>
        </ScrollView>
       
    </CommonLayout>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 16,
  },
  mainImage: { 
    width: '100%', 
    height: 250, 
    marginBottom: 16, 
    resizeMode:'cover',
    borderRadius:20
  },
  price: {
     fontSize: 30,
     fontWeight: '600', 
     color: '#FF6026',
     marginRight:10,
     },
  discount: {
     color: '#0a0',
    fontWeight: '#41B029',
    backgroundColor: '#E7FEE7',
    padding: 8, 
    // width:'35%',
    borderRadius: 50,
    textAlign: 'center',
    width:'auto',
    },
  name: { fontSize: 20,
     fontWeight: '600', 
     
     marginTop: 8 },
  description: { 
    marginTop: 8,
    color: '#666'
 },
  ratingImage: { 
    width: 100,
     height: 20, 
    },
  rating: { 
    fontSize: 16,
    },
  colorOptions: { 
    flexDirection: 'row',
     marginVertical: 5
    },
  colorOption: {
    width: 40,
    height: 40,
    marginHorizontal: 5,
    borderRadius: 5,
    borderColor: 'transparent',
    overflow: 'hidden',
  },
  colorImage: { 
    width: '100%',
     height: '100%' ,
    borderRadius: 50
},
  sizeOptions: { flexDirection: 'row', marginVertical: 8 },
  sizeBox: {
    padding: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    marginHorizontal: 5,
    borderRadius: 5
  },
  selectedSizeBox: { 
    borderColor: '#FF6026' ,
    backgroundColor: '#FF6026',
},
  sizeText: { 
    fontWeight: '600' },
  quantityContainer: { flexDirection: 'row', 
    alignItems: 'center', 
    marginVertical: 8 
},
  quantityButton: { fontSize: 18,
     paddingHorizontal: 12,
      fontWeight: 'bold' },
  quantity: { fontSize: 16,
     marginHorizontal: 12 },
  addToCartButton: {
    backgroundColor: '#ff5a5f',
    padding: 16,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 16
  },
  addToCartText: { 
    color: '#fff', 
    fontWeight: 'bold' 
},
ButtonQuantity:{
    borderColor:'grey',
    padding:5,
    borderRadius:5, 
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'#F3F4F6',

}
});
