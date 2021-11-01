import React, { useState } from 'react';
import { Button } from 'react-native-paper';
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
  TextInput,
} from 'react-native';
import Bg from '../assets/pexels-athena-2985911.jpg';
import Logo from '../assets/chat.png';

import AsyncStorage from '@react-native-community/async-storage';

class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      validated: false,
      enableshift: false,
    };
  }
  go = () => {};
  onChangeEmail = (value) => this.setState({ email: value });
  onChangePasswod = (value) => this.setState({ password: value });

  sendCred = async (props) => {
    this.setState({ error: '' });
    const { email, password, error } = this.state;
    const reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reg1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (reg.test(this.state.email) !== true) {
      this.setState({ error: 'Email không hợp lệ' });
    } else {
      if (reg1.test(this.state.password) === true) {
        //kiểm tra mật khẩu từ 6 đến 20 ký tự trong đó có ít nhất một chữ số , một chữ hoa và một chữ thường
        fetch('http://192.168.137.1:3000/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            if (data.token) {
              await AsyncStorage.setItem('token', data.token);
              this.props.navigation.replace('post');
            }
            if (data.error) {
              this.setState({ error: data.error });
            }
          });
      } else {
        this.setState({
          error: 'Mật khẩu phải trên 6 ký tự gồm chữ cái và số',
        });
      }
    }
  };

  noLogin = (props) => this.props.navigation.replace('postTest');
  goSignup = (props) => this.props.navigation.replace('signup');

  render() {
    const { email, password, error } = this.state;
    return (
      <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
        <SafeAreaView>
          <View style={styles.fontViewLogo}>
            <Image source={Logo} style={styles.fontLogo}></Image>
          </View>
          <KeyboardAvoidingView behavior="padding">
            <Text
              style={{
                fontSize: 20,
                marginTop: 20,
                color: '#ffffff',
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 15,
              }}>
              Đăng Nhập
            </Text>
            <View style={styles.fontTex1}>
              <TextInput
                placeholder="Email"
                placeholderTextColor="#bfbfbf"
                value={email}
                maxLength={30}
                onChangeText={this.onChangeEmail}
                style={styles.fontInput1}
                keyboardType="email-address"
              />
              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#bfbfbf',
                  marginLeft: 17,
                }}></View>
            </View>

            <View style={styles.fontTex2}>
              <TextInput
                placeholder="Mật Khẩu"
                placeholderTextColor="#bfbfbf"
                value={password}
                maxLength={30}
                onChangeText={this.onChangePasswod}
                style={styles.fontInput2}
                //secureTextEntry={true}
              />
              <View
                style={{
                  width: '90%',
                  height: 1,
                  backgroundColor: '#bfbfbf',
                  marginLeft: 17,
                }}></View>
            </View>

            <Text
              style={{
                color: '#ff3333',
                textAlign: 'center',
                fontSize: 14,
                marginTop: 5,
                fontStyle: 'italic',
                marginBottom: 5,
              }}>
              {error}
            </Text>
            <View
              style={{ alignItems: 'center', marginBottom: 10, marginTop: 5 }}>
              <TouchableOpacity
                onPress={this.sendCred}
                style={{
                  backgroundColor: '#rgba(1, 255, 255, 0.5)',
                  paddingHorizontal: 40,
                  paddingTop: 15,
                  paddingBottom: 15,
                  borderRadius: 25,
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 3,
                  },
                  shadowOpacity: 0.29,
                  shadowRadius: 4.65,

                  elevation: 7,
                }}>
                <Text style={{ fontSize: 15, color: 'white' }}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
              }}>
              <TouchableOpacity onPress={this.goSignup}>
                <Text
                  style={{
                    fontSize: 15,
                    marginLeft: 20,
                    marginTop: 20,
                    color: '#ffffff',
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                  }}>
                  Bạn Chưa Có Tài Khoản? Đăng Ký
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={this.noLogin}
                style={{
                  paddingHorizontal: 30,
                  paddingTop: 10,
                  paddingBottom: 10,
                  alignItems: 'center',
                  marginTop: 15,
                }}>
                <Text
                  style={{
                    fontSize: 17,
                    fontStyle: 'italic',
                    textDecorationLine: 'underline',
                    color: '#ffffff',
                  }}>
                  Bỏ qua
                </Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}

export default LoginScreen;

const styles = StyleSheet.create({
  fontLogo: {
    width: 100,
    height: 100,
  },
  fontViewLogo: {
    alignItems: 'center',
    marginBottom: 50,
  },
  fontTex1: {
    marginTop: 30,
    marginHorizontal: 30,
    marginBottom: 15,
    borderRadius: 20,
    backgroundColor: '#rgba(230, 255, 255, 0.0)',
  },
  fontTex2: {
    backgroundColor: '#rgba(230, 255, 255, 0.0)',

    marginHorizontal: 30,
    borderRadius: 20,
    marginBottom: 5,
  },
  fontInput1: {
    marginTop: 10,
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
    marginBottom: 3,
  },
  fontInput2: {
    marginTop: 10,
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
    marginBottom: 3,
  },
});
