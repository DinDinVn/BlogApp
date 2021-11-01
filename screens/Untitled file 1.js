import React, { useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import {
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  KeyboardAvoidingView,
  Alert,
  ImageBackground,
  Image,
  StyleSheet,
} from 'react-native';
import Bg from '../assets/pexels-athena-2985911.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../assets/chat.png';

const SignupScreen = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const sendCred = async (props) => {
    fetch('http://localhost:3000/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then(async (data) => {
        try {
          await AsyncStorage.setItem('token', data.token);
          props.navigation.replace('post');
        } catch (e) {
          Alert.alert('Lỗi', e);
        }
      });
  };
  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeAreaView>
        <View style={styles.fontViewLogo}>
          <Image source={Logo} style={styles.fontLogo}></Image>
        </View>
        <KeyboardAvoidingView behavior="position">
          <Text
            style={{
              fontSize: 20,
              marginTop: 20,
              textAlign: 'center',
              color: '#ffffff',
              fontWeight: 'bold',
            }}>
            Tạo Tài Khoản Mới
          </Text>
          <TextInput
            label="Tài Khoản"
            value={email}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            theme={{ colors: { primary: 'grey' } }}
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            label="Mật Khẩu"
            secureTextEntry={true}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            style={{ marginLeft: 18, marginRight: 18, marginTop: 18 }}
            theme={{ colors: { primary: 'grey' } }}
          />
          <Button
            mode="contained"
            style={{
              marginLeft: 20,
              marginRight: 20,
              marginTop: 20,
              backgroundColor: '#87cefa',
              shadowColor: '#000',
              shadowOffset: {
                width: 0,
                height: 3,
              },
              shadowOpacity: 0.29,
              shadowRadius: 4.65,

              elevation: 7,
            }}
            onPress={() => sendCred(props)}>
            Đăng Ký
          </Button>
          <TouchableOpacity>
            <Text
              style={{
                fontSize: 15,
                marginLeft: 20,
                marginTop: 20,
                color: '#ffffff',
                textDecorationLine: 'underline',
              }}
              onPress={() => props.navigation.replace('login')}>
              Bạn Đã Có Tài Khoản? Đăng Nhập
            </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default SignupScreen;
const styles = StyleSheet.create({
  fontLogo: {
    width: 100,
    height: 100,
  },
  fontViewLogo: {
    alignItems: 'center',
    marginBottom: 50,
  },
});



 //profile goback
   <View style={{ justifyContent: 'space-around', padding: 0 }}>
            <Button
              mode="contained"
              style={styles.profileFont2}
              onPress={() => goBack()}>
              Quay Lại
            </Button>
          </View>


 