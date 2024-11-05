import {StatusBar} from 'expo-status-bar';
import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import SignInScreen from './component/SignInScreen'
import SignUpScreen from './component/SignUpScreen'
import HomeScreen from './component/HomeScreen';
import CheckoutScreen from "./component/CheckoutScreen";
import PaymentMethodSelectScreen from "./component/PaymentMethodSelectScreen";
import PaymentSuccessScreen from "./component/PaymentSuccessScreen";

const Stack = createStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName='SignUp'>
                {/*<Stack.Screen name="SignUp" component={SignUpScreen} options={{headerShown: false}}/>*/}
                {/*<Stack.Screen name="SignIn" component={SignInScreen} options={{headerShown: false}}/>*/}
                {/*<Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}}/>*/}
                <Stack.Screen name='CheckoutScreen' component={CheckoutScreen} options={{headerShown: false}}/>
                <Stack.Screen name='PaymentMethod' component={PaymentMethodSelectScreen} options={{headerShown: false}}/>
                <Stack.Screen name='PaymentSuccessScreen' component={PaymentSuccessScreen} options={{headerShown: false}}/>
            </Stack.Navigator>
        </NavigationContainer>

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