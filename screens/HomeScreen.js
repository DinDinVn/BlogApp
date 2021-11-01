import React, { useEffect, useState } from 'react';
import { Button, TextInput } from 'react-native-paper';
import { SafeAreaView } from 'react-native';
import { ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Post from './Post';
const HomeScreen = (props) => {
  const [email, setEmail] = useState('loading');
  const Boiler = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.1/', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setEmail(data.email);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  const logout = (props) => {
    AsyncStorage.removeItem('token').then(() => {
      props.navigation.replace('login');
    });
  };

  return (
    <SafeAreaView>
      <Text style={{ fontSize: 18 }}>Xin Chào: {email}</Text>
      <Button
        mode="contained"
        style={{
          marginLeft: 18,
          marginRight: 18,
          marginTop: 18,
          backgroundColor: '#87cefa',
        }}
        onPress={() => logout(props)}>
        logout
      </Button>
    </SafeAreaView>
  );
};

export default HomeScreen;
