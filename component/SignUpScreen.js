import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { TextInput } from 'react-native-paper';
import { firebaseApp } from '../utils/FirebaseConfig';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'; 
import { getFirestore, setDoc, doc } from 'firebase/firestore';
import { useUser } from './UserContext';

export default function SignUpScreen({ navigation }) {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassword1, setShowPassword1] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const db = getFirestore(firebaseApp);

  const { setUser } = useUser(); 

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      alert("Confirm password does not match");
      return;
    }

    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }

    createUserWithEmailAndPassword(getAuth(), email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
          createdAt: new Date(),
        }).then(() => {
          setUser({ name, email }); 
          alert('Đăng ký thành công');
          navigation.navigate('SignIn');
        }).catch((error) => {
          alert('Đăng ký thành công');
          navigation.navigate('SignIn');
        });
      })
      .catch((error) => {
        alert(`Register failed: ${"Email đã đưọc sử dụng"}`);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ alignItems: 'center' }}>
        <Image
          source={require('../assets/logo.jpg')}
          style={{ width: 200, height: 200 }}
          resizeMode="contain"
        />
      </View>
      <View>
        <Text style={{ textAlign: 'center', fontSize: 35, fontWeight: 'bold' }}>
          SIGN UP
        </Text>
      </View>
      <View style={{ alignItems: 'center' }}>
        <TextInput
          value={name}
          placeholder="Full name"
          placeholderTextColor="grey"
          style={styles.input}
          onChangeText={setName}
        />
        <TextInput
        value={email}
          placeholder="Email"
          placeholderTextColor="grey"
          onChangeText={setEmail}
          style={styles.input}
        />
        <TextInput
          placeholder="Password"
          placeholderTextColor="grey"
          value={password}
          onChangeText={setPassword} // Sử dụng onChangeText để cập nhật password
          style={styles.input}
          secureTextEntry={!showPassword}
          right={
            <TextInput.Icon
              icon={showPassword ? 'eye-off' : 'eye'}
              size={30}
              color="orange"
              onPress={() => setShowPassword(!showPassword)}
            />
          }
        />
        <TextInput
          placeholder="Confirm your password"
          value={confirmPassword}
          onBlur={() => {
            if (password && confirmPassword && confirmPassword !== password) {
              alert('Confirm password does not match');
              setConfirmPassword(''); // Reset giá trị khi sai mật khẩu
            }
          }}
          placeholderTextColor="grey"
          style={styles.input}
          secureTextEntry={!showPassword1}
          onChangeText={setConfirmPassword} // Sử dụng onChangeText để cập nhật confirmPassword
          right={
            <TextInput.Icon
              icon={showPassword1 ? 'eye-off' : 'eye'}
              size={30}
              color="orange"
              onPress={() => setShowPassword1(!showPassword1)}
            />
          }
        />
      </View>
      <View>
        <TouchableOpacity style={styles.button} onPress={handleSignUp}>
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 17 }}>Already have an account? </Text>
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