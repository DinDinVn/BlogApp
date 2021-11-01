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
  KeyboardAvoidingView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSelector, useDispatch } from 'react-redux';
import { Title, Card, Button } from 'react-native-paper';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import Bg from '../assets/pexels-athena-2985911.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import Moment from 'react-moment';
import moment from 'moment';
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
        case 'dateComment':
          return route.params.dateComment;
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
  const [dateComment, setDateComment] = useState(getDetails('dateComment'));
  const [listData, setListdata] = useState(getDetails('listData'));
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  useEffect(() => {
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setDateComment(
      year + '/' + month + '/' + date + ' ' + hours + ':' + min + ':' + sec
    );
  }, []);

  const {
    _id,
    name,
    picture,
    phone,
    salary,
    position,
    email,
    emailPost,
    currentDate,
    currentDateEdit,
  } = props.route.params.item;

  const deleteEmploye = () => {
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
  };
  const editEmploye = () => {
    props.navigation.navigate('Create', {
      _id,
      name,
      phone,
      position,
      emailPost,
    });
    setModal(false);
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
        dateComment,
      }),
    })
      .then((res) => res.json())
      .then((datacomment) => {});
    setComments('');
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
  }, [listData]);

  const renderList = (item) => {
    if (item.postId === _id) {
      return (
        <View style={styles.cardView}>
          <View style={{ marginTop: 7, marginHorizontal: 15 }}>
            <Text style={styles.text}>{item.userComment}</Text>

            <Text style={styles.text2}>{item.comments}</Text>
          </View>
          <View style={{ marginHorizontal: 15, marginBottom: 5 }}>
            <Text style={styles.text3}>
              {moment(item.dateComment).fromNow()}
            </Text>
          </View>
        </View>
      );
    }
  };

  const goBack = () => {
    props.navigation.navigate('Home');
  };
  const setM = () => {
    if (emailComment === emailPost) {
      setModal(true);
    } else {
      setModal2(true);
    }
  };
  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <KeyboardAvoidingView
        behavior={Platform.OS == 'ios' ? 'padding' : 'height'}
        style={styles.container}>
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
                    style={{
                      fontSize: 30,
                      fontWeight: 'bold',
                      color: 'white',
                    }}>
                    ...
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
                    style={{
                      color: 'white',
                      fontWeight: 'bold',
                      fontSize: 17,
                    }}>
                    {phone}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        marginTop: 5,
                        fontStyle: 'italic',
                      }}>
                      {emailPost}
                    </Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 13,
                        marginTop: 5,
                        fontStyle: 'italic',
                      }}>
                      {currentDate}
                    </Text>
                  </View>
                  <View
                    style={{
                      backgroundColor: '#bfbfbf',
                      width: '100%',
                      height: 0.5,
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
                      backgroundColor: '#bfbfbf',
                      width: '100%',
                      height: 0.5,
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
                    backgroundColor: '#rgba(52, 52, 52, 0.3)',
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
                    initialNumToRender={4}
                  />
                  <View style={styles.fontComment2}>
                    <TextInput
                      style={styles.fontTextinput}
                      value={comments}
                      placeholder=" Viết Bình luận..."
                      placeholderTextColor="#bfbfbf"
                      onChangeText={(text) => setComments(text)}></TextInput>

                    <View
                      style={{
                        backgroundColor: '#rgba(52, 52, 52, 0.3 )',
                        width: 2,
                        height: 40,
                        marginLeft: 1,
                        marginRight: 7,
                      }}></View>
                    <TouchableOpacity
                      style={styles.fontTextOp}
                      onPress={() => newComment()}>
                      <Image
                        source={Send}
                        style={{
                          width: 20,
                          height: 20,
                          tintColor: '#bfbfbf',
                        }}></Image>
                    </TouchableOpacity>
                  </View>
                </View>
              </ScrollView>
              <View style={styles.modalView2}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal}
                  onRequestClose={() => {
                    setModal(false);
                  }}>
                  <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                      <TouchableOpacity
                        onPress={() => editEmploye()}
                        style={styles.opa1}>
                        <Text style={{ color: 'black', fontSize: 17 }}>
                          Chỉnh Sửa
                        </Text>
                        <Text style={styles.text4}>
                          Chỉnh sửa lần cuối: {currentDateEdit}
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#708090',
                          width: '100%',
                          height: 0.4,
                        }}></View>
                      <TouchableOpacity
                        onPress={() => {
                          deleteEmploye();
                        }}
                        style={styles.opa2}>
                        <Text style={{ color: 'black', fontSize: 17 }}>
                          Xóa Bài
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#708090',
                          width: '100%',
                          height: 0.5,
                        }}></View>
                      <Button
                        onPress={() => setModal(false)}
                        style={{ marginBottom: 15, marginTop: 5 }}>
                        Hủy
                      </Button>
                    </View>
                  </View>
                </Modal>
              </View>
              <View style={styles.modalView2}>
                <Modal
                  animationType="slide"
                  transparent={true}
                  visible={modal2}
                  onRequestClose={() => {
                    setModal2(false);
                  }}>
                  <View style={styles.modalView}>
                    <View style={styles.modalButtonView}>
                      <TouchableOpacity style={styles.opa1}>
                        <Text
                          style={{
                            color: '#a9a9a9',
                            fontSize: 17,
                            marginBottom: 5,
                          }}>
                          Chỉnh Sửa
                        </Text>
                        <Text
                          style={{
                            color: '#a9a9a9',
                            fontSize: 13,
                            fontStyle: 'italic',
                          }}>
                          Bạn không thể chỉnh sửa bài người khác
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#708090',
                          width: '100%',
                          height: 0.4,
                        }}></View>
                      <TouchableOpacity style={styles.opa2}>
                        <Text
                          style={{
                            color: '#a9a9a9',
                            fontSize: 17,
                            marginBottom: 5,
                          }}>
                          Xóa Bài
                        </Text>
                        <Text
                          style={{
                            color: '#a9a9a9',
                            fontSize: 13,
                            fontStyle: 'italic',
                          }}>
                          Bạn không thể xóa bài người khác
                        </Text>
                      </TouchableOpacity>
                      <View
                        style={{
                          backgroundColor: '#708090',
                          width: '100%',
                          height: 0.1,
                          marginBottom: 3,
                        }}></View>
                      <TouchableOpacity style={styles.opa2}>
                        <Text
                          style={{
                            color: '#black',
                            fontSize: 17,
                            marginBottom: 5,
                          }}>
                          Lịch Sử Chỉnh Sửa
                        </Text>
                        <Text style={{ fontStyle: 'italic' }}>
                          Lần cuối: {currentDateEdit}
                        </Text>
                      </TouchableOpacity>

                      <View
                        style={{
                          backgroundColor: '#708090',
                          width: '100%',
                          height: 0.5,
                        }}></View>
                      <Button
                        onPress={() => setModal2(false)}
                        style={{ marginBottom: 15, marginTop: 5 }}>
                        Hủy
                      </Button>
                    </View>
                  </View>
                </Modal>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
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
    marginTop: 5,
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#rgba(52, 52, 52, 0.3)',
    borderRadius: 20,
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

  cardView: {
    marginHorizontal: 20,
    marginBottom: 10,
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
    marginTop: 3,
    marginLeft: 3,
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
  text4: {
    marginTop: 5,
    fontStyle: 'italic',
  },
  text3: {
    fontSize: 12,
    color: 'white',
    fontStyle: 'italic',
    marginTop: 3,
    marginLeft: 3,
  },
});

export default Profile;
