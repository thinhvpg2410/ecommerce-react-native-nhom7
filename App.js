import {StatusBar} from 'expo-status-bar';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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
import {UserProvider, useUser} from './context/UserContext';
import PaymentSuccessScreen from "./component/PaymentSuccessScreen";
import PaymentMethodSelectScreen from "./component/PaymentMethodSelectScreen";
import SearchScreen from "./component/SearchScreen";
import ChatScreen from './component/ChatScreen';
const Stack = createStackNavigator();

function AppNavigator() {
    const { userEmail } = useUser();
    const [initialRoute, setInitialRoute] = useState(null);

    useEffect(() => {
        if (userEmail) {
            setInitialRoute('Home');
        } else {
            setInitialRoute('SignIn');
        }
    }, [userEmail]);

    if (!initialRoute) {
        return (
            <View style={styles.loadingContainer}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }

    return (
        <Stack.Navigator initialRouteName={initialRoute}>
            <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false }} />
            <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Search" component={SearchScreen} options={{ headerShown: false }} />
            <Stack.Screen name="FreshFruit" component={FreshFruitDetail} options={{ headerShown: false }} />
            <Stack.Screen name="DetailFreshFruit" component={DetailFreshFruitRating} options={{ headerShown: false }} />
            <Stack.Screen name="FashionScreen" component={FashionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="DetailFashion" component={DetailFashionScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Cart" component={CheckoutScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentMethodSelectScreen" component={PaymentMethodSelectScreen} options={{ headerShown: false }} />
            <Stack.Screen name="PaymentSuccessScreen" component={PaymentSuccessScreen} options={{ headerShown: false }} />
            <Stack.Screen name="Chat" component={ChatScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
    );
}


export default function App() {
    return (
        <UserProvider>
            <NavigationContainer>
                <AppNavigator />
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
    loadingContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
});

