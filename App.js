import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './component/SignInScreen'
import SignUpScreen from './component/SignUpScreen'
import HomeScreen from './component/HomeScreen';
import FreshFruitDetail from './component/FreshFruitDetail';
import CheckoutScreen from "./component/CheckoutScreen";
import DetailFreshFruitRating from './component/DetailFreshFruitRating';
import FashionScreen  from './component/FashionScreen';
import DetailFashionScreen from './component/DetailFashionScreen';
import CommonLayout from './component/CommonLayout';
import { UserProvider } from './component/UserContext';
const Stack = createStackNavigator();

export default function App() {
    return (
        <UserProvider>
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignIn'>
                <Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>
                <Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>
                <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>
                <Stack.Screen name="FreshFruit" component={FreshFruitDetail} options={{headerShown: false}}/>
                <Stack.Screen name="Cart" component={CheckoutScreen} options={{headerShown: false}}/>
                <Stack.Screen name="DetailFreshFruit" component={DetailFreshFruitRating} options={{headerShown: false}}/>
                <Stack.Screen name="FashionScreen" component={FashionScreen} options={{headerShown: false}}/>
                <Stack.Screen name="DetailFashion" component={DetailFashionScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>
        </UserProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

