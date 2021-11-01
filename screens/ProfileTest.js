import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Linking,
  Platform,
  Alert,
  SafeAreaView,
  ImageBackground,
  FlatList,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Modal,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Bg from '../assets/pexels-athena-2985911.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import Logo from '../assets/chat.png';
import Send from './send.png';
const Profile = (props, route) => {
  const getDetails = (type) => {
    if (route.params) {
      switch (type) {
        case 'postId':
          return route.params.postId;
        case 'userComment':
          return route.params.userComment;
        case 'emailComment':
          return route.params.emailComment;
        case 'comments':
          return route.params.comments;
        case 'listData':
          return route.params.listData;
      }
    }
    return '';
  };
  const dispatch = useDispatch();
  const { data, loading } = useSelector((state) => {
    return state;
  });
  const [postId, setPostId] = useState(getDetails('postId'));
  const [userComment, setUserComment] = useState(getDetails('userComment'));
  const [emailComment, setEmailComment] = useState(getDetails('emailComment'));
  const [comments, setComments] = useState(getDetails('comments'));
  const [listData, setListdata] = useState(getDetails('listData'));
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);

  const {
    _id,
    name,
    picture,
    phone,
    salary,
    position,
    email,
  } = props.route.params.item;

  const deleteEmploye = () => {
    if (userComment === phone) {
      fetch('http://192.168.137.1:3000/delete', {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id: _id,
        }),
      })
        .then((res) => res.json())
        .then((deletedEmp) => {
          Alert.alert(`Đã Xóa Bài`);
          props.navigation.navigate('Home');
        });
    } else {
      setModal(false);
      Alert.alert(`Bạn không thể xóa bài viết này!`);
    }
  };
  const editEmploye = () => {
    if (userComment === phone) {
      props.navigation.navigate('Create', {
        _id,
        name,
        phone,
        position,
      });
      setModal(false);
    } else {
      Alert.alert(`Bạn không thể chỉnh sửa bài viết này!`);
      setModal(false);
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
      .then((datacm) => {
        setUserComment(datacm.nameUser);
        setEmailComment(datacm.email);
        setPostId(_id);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);
  const Emailcm = async () => {
    const token = await AsyncStorage.getItem('token');
    fetch('http://192.168.137.1:3000/', {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setEmailComment(data.email);
      });
  };
  useEffect(() => {
    Emailcm();
  }, []);

  const newComment = async () => {
    fetch('http://192.168.137.1:3000/send-datacomment', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        userComment,
        emailComment,
        comments,
        postId,
      }),
    })
      .then((res) => res.json())
      .then((datacomment) => {});
    setComments('');
    props.navigation.navigate('Home');
    Alert.alert(`Đã gửi bình luận`);
  };
  const getData = () => {
    fetch('http://192.168.137.1:3000/datacomment')
      .then((res) => res.json())
      .then((json) => {
        setListdata(json);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  const renderList = (item) => {
    if (item.postId === _id) {
      return (
        <View style={styles.cardView}>
          <View style={{ marginTop: 5, marginHorizontal: 15, marginBottom: 5 }}>
            <Text style={styles.text}>
              {item.userComment}
            </Text>
            <Text style={styles.text2}>{item.comments}</Text>
          </View>
        </View>
      );
    }
  };

  const goBack = () => {
    props.navigation.navigate('Home');
  };
  const setM = () => {
    if (userComment === phone) {
      setModal(true);
    } else {
      setModal2(true);
    }
  };
  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeAreaView>
        <View style={styles.fontViewLogo}>
          <Image source={Logo} style={styles.fontLogo}></Image>
        </View>
        <ScrollView>
          <View style={styles.fontAll}>
            <View
              style={{
                marginHorizontal: 15,

                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
              <Text
                style={{ fontSize: 17, fontWeight: 'bold', color: 'white' }}>
                Bài Đăng
              </Text>
              <TouchableOpacity onPress={() => setM()}>
                <Text
                  style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
                </Text>
              </TouchableOpacity>
            </View>

            <View
              style={{
                backgroundColor: '#rgba(52, 52, 52, 0.5)',
                marginHorizontal: 10,
                marginTop: 10,
                borderRadius: 5,
              }}>
              <View style={{ marginHorizontal: 10, marginTop: 10 }}>
                <Text
                  style={{ color: 'white', fontWeight: 'bold', fontSize: 15 }}>
                  {phone} {email}
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}></View>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    textAlign: 'center',
                  }}>
                  {name}
                </Text>
                <View
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                  }}></View>
                <Text style={{ color: 'white', marginBottom: 15 }}>
                  {position}
                </Text>
              </View>
            </View>
            <View
              style={{
                flexDirection: 'row-reverse',
                marginTop: 10,
                marginHorizontal: 15,
              }}>
              <Text
                style={{ fontSize: 15, fontWeight: 'bold', color: 'white' }}>
                Bình Luận
              </Text>
            </View>
            <ScrollView>
              <View
                style={{
                  backgroundColor: '#rgba(52, 52, 52, 0.5)',
                  marginHorizontal: 10,
                  marginTop: 10,
                  borderRadius: 5,
                  marginBottom: 20,
                }}>
                <View style={{ marginBottom: 15 }}></View>
                <FlatList
                  data={listData}
                  renderItem={({ item }) => {
                    return renderList(item);
                  }}
                  keyExtractor={(item) => item._id}
                  extraData={listData}
                />
                <View style={styles.fontComment2}>
                  
                </View>
              </View>
            </ScrollView>
          </View>
        </ScrollView>
      </SafeAreaView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  profileFont2: {
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    backgroundColor: 'grey',
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
    width: 80,
    height: 80,
  },
  fontViewLogo: {
    alignItems: 'center',
  },

  fontComment2: {
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#rgba(52, 52, 52, 0.3)',
    borderRadius: 5,
  },
  fontTextOp: {},
  fontTextinput: {
    width: '80%',
    height: 40,
    alignItems: 'center',
    borderColor: 'white',
    marginLeft: 10,
    color: 'white',
  },
  edit: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 40,
    marginBottom: 10,
    marginTop: 20,
  },
  cardView: {
    marginHorizontal: 20,
    marginBottom: 5,
    marginTop: 5,
    backgroundColor: '#rgba(52, 52, 52, 0.3)',
    borderRadius: 10,
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  text2: {
    color: 'white',
    marginLeft: 10,

  },
  modalView: {
    position: 'absolute',
    width: '100%',
    backgroundColor: '#rgba(52, 52, 52, 0.0)',
    bottom: 2,
  },
  modalButtonView: {
    backgroundColor: '#d3d3d3',
    borderRadius: 10,
  },
  modalView2: {},
  opa1: {
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 10,
  },
  opa2: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
});

export default Profile;
