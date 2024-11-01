import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet, Image} from 'react-native';
import "@expo/metro-runtime";
import {TextInput} from 'react-native-paper';

export default function SignInScreen({navigation, route}) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const userList = [...route.params.users,
    //     {id: 1, email: 'nguyenvana@gmail.com', password: '123456'},
    //     {id: 2, email: 'hotram@gmail.com', password: '123'},
    // ]
    const userList = route?.params?.users || [
        {id: 1, email: 'nguyenvana@gmail.com', password: '123456'},
        {id: 2, email: 'hotram@gmail.com', password: '123'},
    ]
    const handleSignIn = () => {
        const checkUser = userList.find(
            (user) => user.email === email && user.password === password
        )
        if (checkUser) {
            alert('Login successfully');
            navigation.navigate('Home');
        } else {
            alert('Email or password is incorrect. Please try again');
        }
    }

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/logo.jpg')} style={{width: 200, height: 200}} resizeMode="contain"/>
            </View>
            <View>
                <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold'}}>SIGN IN</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TextInput
                    placeholder='Email'
                    value={email}
                    onChangeText={setEmail}
                    left={<TextInput.Icon icon="email" size={30}/>}
                    style={{borderWidth: 1, borderRadius: 5, width: '90%'}}
                />
                <TextInput style={{borderWidth: 1, marginTop: 10, borderRadius: 5, width: '90%'}} placeholder='Password'
                           onChangeText={setPassword}
                           value={password}
                           secureTextEntry={!showPassword}
                           left={
                               <TextInput.Icon
                                   icon="lock" size={30}
                               />
                           }
                           right={
                               <TextInput.Icon icon={showPassword ? "eye-off" : "eye"}
                                               size={30}
                                               onPress={
                                                   () => setShowPassword(!showPassword)
                                               }
                               />
                           }
                />
            </View>
            <View>
                <TouchableOpacity style={{alignItems: 'flex-end', margin: 5}}>
                    <Text style={{color: 'orange', fontSize: 18, fontWeight: 'bold'}}>Forgot password ?</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity style={{
                    backgroundColor: "#282424",
                    width: '80%',
                    borderRadius: 20,
                    padding: 10,
                    alignSelf: 'center',
                    marginTop: 10
                }}
                                  onPress={handleSignIn}>
                    <Text style={{color: 'white', textAlign: 'center', fontSize: 20, fontWeight: 'bold'}}>LOGIN</Text>
                </TouchableOpacity>
            </View>
            <View style={{justifyContent: 'center', marginTop: 10, flexDirection: 'row'}}>
                <Text style={{fontSize: 17}}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("SignUp")}>
                    <Text style={[styles.textP, {color: 'orange', textDecoration: 'underline'}]}>Sign up</Text>
                </TouchableOpacity>
            </View>
            <View style={{flexDirection: 'row', alignItems: 'center', margin: 15}}>
                <View style={{borderBottomWidth: 1, width: '35%', borderBottomColor: 'grey'}}></View>
                <Text style={{flex: 1, textAlign: 'center', fontWeight: 'bold', fontSize: 15, color: 'grey'}}>Sign In
                    with</Text>
                <View style={{borderBottomWidth: 1, width: '35%', borderBottomColor: 'grey'}}></View>
            </View>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', marginTop: 20}}>
                <TouchableOpacity>
                    <Image source={require('../assets/logos_facebook.png')} style={{width: 60, height: 60}}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/logos_linkedin-icon.png')}
                           style={{width: 60, height: 60}}></Image>
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image source={require('../assets/grommet-icons_google.png')}
                           style={{width: 60, height: 60}}></Image>
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
    textP: {
        fontSize: 17,
        fontWeight: 'bold',
    },
})
