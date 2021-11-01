import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Modal,
  Alert,
  KeyboardAvoidingView,
  SafeAreaView,
  ImageBackground,
  Image,
  TextInput,
  Platform,
  ScrollView,
} from 'react-native';
import { Button } from 'react-native-paper';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import AsyncStorage from '@react-native-community/async-storage';
import Bg from '../assets/pexels-athena-2985911.jpg';
import Logo from '../assets/chat.png';
const CreateEmployee = ({ navigation, route }) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'name':
          return route.params.name;
        case 'phone':
          return route.params.phone;
        case 'position':
          return route.params.position;
        case 'error':
          return route.params.error;
        case 'emailPost':
          return route.params.emailPost;
        case 'currentDate':
          return route.params.currentDate;
        case 'currentDateEdit':
          return route.params.currentDateEdit;
      }
    }
    return '';
  };

  const [name, setName] = useState(getDetails('name'));
  const [phone, setPhone] = useState(getDetails('phone'));
  const [position, setPosition] = useState(getDetails('position'));
  const [emailPost, setEmailPost] = useState(getDetails('emailPost'));
  const [modal, setModal] = useState(false);
  const [enableshift, setenableShift] = useState(false);
  const [error, setError] = useState(getDetails('error'));
  const [currentDate, setCurrentDate] = useState('');
  const [currentDateEdit, setCurrentDateEdit] = useState('');

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
     year + '/' + month + '/' + date + ' ' +   hours + ':' + min + ':' + sec
    );
  }, []);

  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDateEdit(
      year + '/' + month + '/' + date + ' ' +   hours + ':' + min + ':' + sec
    );
  }, []);

  const submitData = () => {
    if (name.length < 10) {
      setError('Vui lòng nhập tiêu đề, độ dài tối thiểu 10 ký tự');
    } else {
      if (position.length < 20) {
        setError('Vui lòng nhập nội dung, độ dài tối thiểu 20 ký tự');
      } else {
        fetch('http://192.168.137.1:3000/send-data', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name,
            phone,
            position,
            emailPost,
            currentDate,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            navigation.navigate('Home');
          })
          .catch((err) => {
            Alert.alert('someting went wrong');
          });
      }
    }
  };

  const updateDetails = () => {
    if (name.length < 10) {
      setError('Vui lòng nhập tiêu đề, độ dài tối thiểu 10 ký tự');
    } else {
      if (position.length < 20) {
        setError('Vui lòng nhập nội dung, độ dài tối thiểu 20 ký tự');
      } else {
        fetch('http://192.168.137.1:3000/update', {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            id: route.params._id,
            name,
            phone,
            position,
            emailPost,
            currentDateEdit,
          }),
        })
          .then((res) => res.json())
          .then((data) => {
            Alert.alert('Đã Chỉnh Sửa');
            navigation.navigate('Home');
          })
          .catch((err) => {
            Alert.alert('Có Lỗi');
          });
      }
    }
  };

  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.1:3000/name', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setPhone(data.nameUser);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);
  const setEmail = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.1:3000/', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmailPost(data.email);
      });
  };
  useEffect(() => {
    setEmail();
  }, []);
  const goBack = () => {
    navigation.navigate('Home');
  };
  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <ScrollView>
        <SafeAreaView>
          <View style={styles.fontViewLogo}>
            <Image source={Logo} style={styles.fontLogo}></Image>
          </View>
          <Text style={styles.fontTextPhone}>Tài Khoản: {phone}</Text>

          <View style={styles.fontTex1}>
            <TextInput
              placeholder="Tiêu đề"
              value={name}
              maxLength={50}
              onChangeText={(text) => setName(text)}
              style={styles.fontInput1}
            />
          </View>

          <View style={styles.fontTex2}>
            <TextInput
              placeholder="Nội dung"
              value={position}
              onFocus={() => setenableShift(false)}
              onChangeText={(text) => setPosition(text)}
              style={styles.fontInput2}
              multiline="true"
              scrollEnabled="true"
            />
          </View>
          <View style={{ alignItems: 'center', marginTop: 10 }}>
            <Text
              style={{
                color: '#ff3333',

                fontSize: 14,
                marginTop: 5,
                fontStyle: 'italic',
              }}>
              {error}
            </Text>
          </View>

          {route.params ? (
            <Button
              style={styles.profileFont}
              mode="contained"
              onPress={() => updateDetails()}>
              Chỉnh Sửa
            </Button>
          ) : (
            <Button
              style={styles.profileFont}
              mode="contained"
              onPress={() => submitData()}>
              Đăng Bài
            </Button>
          )}
          <View style={{ marginHorizontal: 20, marginTop: 10 }}>
            <Button mode="contained" theme={theme} onPress={() => goBack()}>
              Hủy
            </Button>
          </View>
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
};

const theme = {
  colors: {
    primary: 'grey',
  },
};
const styles = StyleSheet.create({
  fontTextPhone: {
    fontSize: 20,
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  profileFont: {
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
  },
  fontLogo: {
    width: 85,
    height: 85,
  },
  fontViewLogo: {
    alignItems: 'center',
  },
  fontTex1: {
    backgroundColor: 'white',
    marginTop: 30,
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 5,
  },
  fontTex2: {
    backgroundColor: 'white',

    marginHorizontal: 20,
    borderRadius: 5,
  },
  fontInput1: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    marginHorizontal: 5,
  },
  fontInput2: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 15,
    marginHorizontal: 5,
  },
});

export default CreateEmployee;
