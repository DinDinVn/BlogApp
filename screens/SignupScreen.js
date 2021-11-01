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
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../assets/chat.png';

class SignupScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      validated: false,
      nameUser: '',
      checkName: [],
    };
  }
  go = () => {};
  onChangeEmail = (value) => this.setState({ email: value });
  onChangePasswod = (value) => this.setState({ password: value });
  onChangeNameUser = (value) => this.setState({ nameUser: value });
  onChangeXpassword = (value) => this.setState({ xpassword: value });

  componentDidMount() {
    const {checkName}= this.state
    const token = AsyncStorage.getItem('token');
    fetch('http://192.168.137.1:3000/name', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((json) => {
        this.setState({checkName: json.nameUser})
      });
  }

  sendCred = async (props) => {
    this.setState({ error: '' });
    const { email, password, error, nameUser, xpassword } = this.state;
    const stanEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    const reg1 = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
    if (stanEmail.test(this.state.email) !== true) {
      this.setState({ error: 'Email không hợp lệ' });
    } else {
      if (reg1.test(this.state.password) !== true) {
        this.setState({
          error: 'Mật khẩu phải trên 6 ký tự gồm chữ cái và số',
        });
      } else {
        if (password === xpassword) {
          fetch('http://192.168.137.1:3000/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              email,
              password,
              nameUser,
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
          this.setState({ error: 'Mật khẩu không trùng khớp' });
        }
      }
    }
  };

  render() {
    const { email, password, error, nameUser, xpassword, checkName } = this.state;
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
            <View style={styles.fontTex1}>
              <TextInput
                placeholder="Tên"
                placeholderTextColor="#bfbfbf"
                value={nameUser}
                maxLength={30}
                onChangeText={this.onChangeNameUser}
                style={styles.fontInput1}
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
                keyboardType="email-address"
                placeholder="Email"
                placeholderTextColor="#bfbfbf"
                value={email}
                maxLength={30}
                onChangeText={this.onChangeEmail}
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
            <View style={styles.fontTex3}>
              <TextInput
                placeholder="Mật Khẩu"
                placeholderTextColor="#bfbfbf"
                value={password}
                maxLength={30}
                onChangeText={this.onChangePasswod}
                style={styles.fontInput3}
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
            <View style={styles.fontTex4}>
              <TextInput
                placeholder=" Xác Nhận Mật Khẩu"
                placeholderTextColor="#bfbfbf"
                value={xpassword}
                maxLength={30}
                onChangeText={this.onChangeXpassword}
                style={styles.fontInput3}
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
              {checkName}
            </Text>
            <View
              style={{ alignItems: 'center', marginBottom: 15, marginTop: 5 }}>
              <TouchableOpacity
                onPress={this.sendCred}
                style={{
                  backgroundColor: '#rgba(1, 255, 255, 0.5)',
                  paddingHorizontal: 45,
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
                <Text style={{ fontSize: 15, color: 'white' }}>Đăng Ký</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={{ alignItems: 'center', marginTop: 10 }}>
              <Text
                style={{
                  fontSize: 15,
                  marginLeft: 20,
                  marginTop: 20,
                  color: '#ffffff',
                  textDecorationLine: 'underline',
                  fontStyle: 'italic',
                }}
                onPress={() => this.props.navigation.replace('login')}>
                Bạn Đã Có Tài Khoản? Đăng Nhập
              </Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
        </SafeAreaView>
      </ImageBackground>
    );
  }
}
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
    marginBottom: 15,
  },
  fontTex3: {
    backgroundColor: '#rgba(230, 255, 255, 0.0)',

    marginHorizontal: 30,
    borderRadius: 20,
  },
  fontInput1: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
  },
  fontInput2: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
  },
  fontInput3: {
    marginTop: 10,
    marginBottom: 5,
    fontSize: 20,
    marginHorizontal: 20,
    color: 'white',
  },
  fontTex4: {
    backgroundColor: '#rgba(230, 255, 255, 0.0)',

    marginHorizontal: 30,
    borderRadius: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});
