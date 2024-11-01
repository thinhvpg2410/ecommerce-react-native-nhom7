import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import React, {useState} from 'react';
import {TextInput} from 'react-native-paper';

export default function SignUpScreen({navigation}) {
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword1, setShowPassword1] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [users, setUsers] = useState([]);

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = () => {
        if (!email || !password || !confirmPassword) {
            alert('Please fill in all fields');
            return;
        }
        if (!validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        const checkEmail = users.some((user) => user.email === email);
        if (checkEmail) {
            alert('Email already exists');
            return;
        }
        if (password !== confirmPassword) {
            alert('Confirm password does not match');
            return;
        }

        alert('Account created successfully');
        navigation.navigate('SignIn', {users: [...users, {email, password}]});
    };

    return (
        <View style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <Image source={require('../assets/logo.jpg')} style={{width: 200, height: 200}} resizeMode="contain"/>
            </View>
            <View>
                <Text style={{textAlign: 'center', fontSize: 35, fontWeight: 'bold'}}>SIGN UP</Text>
            </View>
            <View style={{alignItems: 'center'}}>
                <TextInput
                    placeholder='Full name'
                    placeholderTextColor="grey"
                    style={styles.input}
                />
                <TextInput
                    placeholder='Email'
                    placeholderTextColor="grey"
                    onChangeText={setEmail}
                    style={styles.input}
                />
                <TextInput
                    placeholder='Password'
                    placeholderTextColor="grey"
                    onChangeText={setPassword}
                    style={styles.input}
                    secureTextEntry={!showPassword}
                    right={
                        <TextInput.Icon icon={showPassword ? 'eye-off' : 'eye'}
                                        size={30}
                                        color="orange"
                                        onPress={() =>
                                            setShowPassword(!showPassword)}/>
                    }
                />
                <TextInput
                    placeholder='Confirm your password'
                    onBlur={() => {
                        if (password && confirmPassword && confirmPassword !== password)
                            alert('Confirm password does not match');
                    }}
                    placeholderTextColor="grey"
                    style={styles.input}
                    secureTextEntry={!showPassword1}
                    onChangeText={setConfirmPassword}
                    right={
                        <TextInput.Icon icon={showPassword1 ? 'eye-off' : 'eye'}
                                        size={30}
                                        color="orange"
                                        onPress={() =>
                                            setShowPassword1(!showPassword1)}/>
                    }
                />
            </View>
            <View>
                <TouchableOpacity style={styles.button} onPress={handleSignUp}>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.footer}>
                <Text style={{fontSize: 17}}>Already have an account? </Text>
                <TouchableOpacity onPress={() => {
                    console.log('Navigating to SignIn...');
                    navigation.navigate('SignIn');
                }}>
                    <Text style={styles.loginText}> Log In</Text>
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
    input: {
        borderBottomWidth: 1,
        width: '90%',
        backgroundColor: '#fff',
    },
    button: {
        backgroundColor: '#282424',
        padding: 15,
        width: '70%',
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    footer: {
        flexDirection: 'row',
        marginTop: 15,
        justifyContent: 'center',
    },
    loginText: {
        color: 'orange',
        textDecorationLine: 'underline',
        fontWeight: 'bold',
        fontSize: 17,
    },
});
