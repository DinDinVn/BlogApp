import React from 'react';
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import imagePhoto from '../assets/pexels-athena-2985911.jpg';
import Logo from '../assets/chat.png';

const Home = (props) => {
  const onLogin = (props) => props.navigation.replace('login');
  const goToHomeTest = (props) => props.navigation.replace('postTest');
  return (
    <View style={styles.container}>
      <ImageBackground source={imagePhoto} style={styles.image}>
        <View style={styles.fontViewLogo}>
          <Image source={Logo} style={styles.fontLogo}></Image>
        </View>
        <TouchableOpacity
          style={styles.fontText1}
          onPress={() => onLogin(props)}>
          <Text style={styles.text}>Đăng Nhập</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.fontText3}
          onPress={() => goToHomeTest(props)}>
          <Text style={styles.text2}>Bỏ Qua Đăng Nhập</Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  image: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
  },
  text: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  fontText1: {
    borderRadius: 30,
    backgroundColor: '#rgba(1, 255, 255, 0.5)',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },

  fontText3: {
    borderRadius: 30,
    backgroundColor: '#rgba(255, 255, 255, 0.5)',
    alignItems: 'center',
    marginHorizontal: 30,
    paddingBottom: 20,
    paddingTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
    marginTop: 15,
  },
  text2: {
    fontSize: 15,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#ffffff',
  },
  fontLogo: {
    width: 150,
    height: 150,
  },
  fontViewLogo: {
    alignItems: 'center',
    marginBottom: 20,
  },
});

export default Home;
