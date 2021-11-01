import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Bg from '../assets/pexels-athena-2985911.jpg';
import Test from '../assets/bglogo.jpg';
import Logo from '../assets/chat.png';
const HomePostTest = ({ navigation, route, props }) => {
  //  const [data,setData] = useState([])
  //  const [loading,setLoading]= useState(true)
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state;
  });

  console.log(data, loading);

  const fetchData = () => {
    fetch('http://192.168.137.1:3000/data')
      .then((res) => res.json())
      .then((results) => {
        // setData(results)
        // setLoading(false)
        dispatch({ type: 'ADD_DATA', payload: results });
        dispatch({ type: 'SET_LOADING', payload: false });
      })
      .catch((err) => {
        Alert.alert('someting went wrong');
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate('Profile', { item })}>
        <View style={styles.cardView}>
          <View style={{ marginLeft: 10, paddingBottom: 15, paddingTop: 15 }}>
            <Text style={styles.text}>{item.name}</Text>
            <View
              style={{
                backgroundColor: '#bfbfbf',
                width: '100%',
                height: 0.5,
                marginTop: 10,
                marginBottom: 10,
              }}></View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
              <Text style={styles.text2}>{item.phone} </Text>
              <Text style={styles.text3}>{item.emailPost}</Text>
            </View>
          </View>
        </View>
      </Card>
    );
  };
  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.fontViewLogo}>
          <Image source={Logo} style={styles.fontLogo}></Image>
        </View>
        <View style={{ marginHorizontal: 7, borderRadius: 50 }}>
          <ImageBackground source={Test} style={{ width: '100%', height: 70 }}>
            <Text style={styles.textPost}>Bài Viết</Text>
          </ImageBackground>
        </View>
        <FlatList
          data={data}
          renderItem={({ item }) => {
            return renderList(item);
          }}
          keyExtractor={(item) => item._id}
          onRefresh={() => fetchData()}
          refreshing={loading}
        />

        <TouchableOpacity
          onPress={() => navigation.replace('login')}
          style={styles.fab}
          small={false}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Đăng Nhập
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  mycard: {
    margin: 5,
    backgroundColor: '#rgba(52, 52, 52, 0.4)',
  },
  cardView: {
    flexDirection: 'row',
    padding: 6,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
    paddingBottom: 5,
    color: '#ffffff',
    marginBottom: 15,
  },
  text2: {
    fontSize: 18,
    paddingLeft: 20,
    marginBottom: 10,
    color: '#ffffff',
  },
  fab: {
    alignItems: 'center',

    marginHorizontal: 30,
    backgroundColor: '#rgba(52, 52, 52, 0.2)',
    paddingBottom: 15,
    paddingTop: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
    marginTop: 10,
  },
  textPost: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 'auto',
    marginTop: 'auto',
    textAlign: 'center',
  },
  fontLogo: {
    width: 85,
    height: 85,
  },
  fontViewLogo: {
    alignItems: 'center',
  },
  text3: {
    fontSize: 15,
    color: '#ffffff',
    fontStyle: 'italic',
    marginLeft: 50,
  },
});

export default HomePostTest;
