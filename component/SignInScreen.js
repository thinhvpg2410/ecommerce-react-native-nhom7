import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { TextInput } from 'react-native-paper';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from '../utils/FirebaseConfig';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

export default function SignInScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const db = getFirestore(firebaseApp);

  const handleForgetPassword = () => {
    if (email === '') {
      alert('Please enter your email to reset password.');
      return;
    }
    sendPasswordResetEmail(getAuth(), email)
      .then(() => {
        alert('Password reset link sent successfully!');
      })
      .catch((error) => {
        alert('Error: ' + error.message);
      });
  };

  const handleSignIn = () => {
    if (email === '' || password === '') {
      alert('Please enter both email and password.');
      return;
    }

    signInWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        const userRef = doc(db, 'users', user.uid);
        getDoc(userRef)
          .then((docSnap) => {
            if (docSnap.exists()) {
              const userData = docSnap.data();
              alert('Login successful: Welcome ' + userData.name);
              navigation.navigate('Home');
            } else {
              alert('No user data found!');
            }
          })
          .catch((error) => {
            alert('Error fetching user data: ' + error.message);
          });
      })
      .catch((error) => {
        let errorMessage = 'Login failed';
        switch (error.code) {
          case 'auth/invalid-email':
            errorMessage = 'Email không đúng định dạng';
            break;
          case 'auth/user-not-found':
            errorMessage = 'User không tồn tại';
            break;
          case 'auth/wrong-password':
            errorMessage = 'Mật khẩu không đúng';
            break;
          default:
            errorMessage = "Opps!Bạn đã nhập sai!!Vui lòng thử lại";
        }
        alert(errorMessage);
      });
  };

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
                left={<TextInput.Icon icon="email" size={30} tabIndex={-1}/>}
                style={{borderWidth: 1, borderRadius: 5, width: '90%'}}
            />
            <TextInput style={{borderWidth: 1, marginTop: 10, borderRadius: 5, width: '90%'}} placeholder='Password'
                       onChangeText={setPassword}
                       value={password}
                       secureTextEntry={!showPassword}
                       left={
                           <TextInput.Icon
                               icon="lock" size={30}
                               tabIndex={-1}
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
            <TouchableOpacity style={{alignItems: 'flex-end', margin: 5}} 
            onPress={()=>handleForgetPassword()}>
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