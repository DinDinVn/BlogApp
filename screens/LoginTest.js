import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  Alert,
  TouchableOpacity,
  ImageBackground,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { Card, FAB } from 'react-native-paper';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-community/async-storage';
import Bg from '../assets/pexels-athena-2985911.jpg';
import LogOut from '../assets/exit.png';
import Test from '../assets/bglogo.jpg';
import Logo from '../assets/chat.png';

const TestHome = ({ navigation, route, props }) => {
   const [songs, setSongs] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [page, setPage] = React.useState(1);
  const [last_page, setLast_page] = React.useState(1);

  const {saveSongs, isPlaying, isPauseTrigger} = props;
   const _renderItems = useCallback(
    // the same reference with each rerender
    ({item, index}) => (<TouchableNativeFeed
        key={item.id}
        onPress={() => {
          console.log('onPress', songs);
          saveSongs(songs, index);
          isPlaying(true);
          isPauseTrigger(!isPauseTrigger);
        }}
        background={TouchableNativeFeedback.Ripple('white')}
        delayPressIn={0}
        useForeground>
        <Card
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#121212',
            flex: 1,
          }}>
          <FastImage
            source={{uri: item.img}}
            resizeMode={FastImage.resizeMode.cover}
            style={styles.cardImg}
          />
          <Body style={{...styles.cardItem, width: '100%'}}>
            <View style={styles.radioCardName}>
              <Text style={styles.text} numberOfLines={1}>
                {item.name}
              </Text>
            </View>
          </Body>
        </Card>
      </TouchableNativeFeed>
    ),
    [saveSongs, isPlaying, isPauseTrigger],
  );
   const renderFooter = useCallback(
    // the same reference with each rerender
    () => {
      return loading ? (
        <View style={styles.loader}>
          <ActivityIndicator size="large" />
        </View>
      ) : null;
    },
    [loading],
  );
  const handleLoadMore = useCallback(
    // the same reference with each rerender
    () => {
      if (page <= last_page - 1) {
        setPage(page + 1);
      }
    },
    [page, last_page],
  );
 
  

  console.log(data, loading);
  
  const fetchData = () => {
    fetch('http://192.168.137.1:3000/data')
      .then((res) => res.json())
      .then((results) => {
        // setData(results)
        // setLoading(false)
        dispatch({ type: 'ADD_DATA', payload: results });
        dispatch({ type: 'SET_LOADING', payload: false });
        
      });
  };

  useEffect(() => {
    fetchData();
  }, []);
  
 

  const [nameUser, setnameUser] = useState('loading');
   
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
        setnameUser(data.nameUser);
      });
  };
  useEffect(() => {
    Boiler();
  }, []);

  const renderList = (item) => {
    return (
      <Card
        style={styles.mycard}
        onPress={() => navigation.navigate('Profile', { item })}>
        <View style={styles.cardView}>
          <View style={{ marginLeft: 10, paddingBottom: 25, paddingTop: 25 }}>
            <Text style={styles.text}>{item.name}</Text>
            <Text style={styles.text2}>{item.phone}</Text>
          </View>
        </View>
      </Card>
    );
  };

  return (
    <ImageBackground source={Bg} style={{ flex: 1, resizeMode: 'cover' }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{ flex: 2, alignItems: 'center', marginLeft: 10 }}>
            <Text style={styles.textUser}>Xin Chào:</Text>
            <Text style={styles.textUser2}>{nameUser}</Text>
          </View>
          <View style={styles.fontViewLogo}>
            <Image source={Logo} style={styles.fontLogo}></Image>
          </View>
          <TouchableOpacity
            style={{ flex: 2, flexDirection: 'row-reverse' }}
            onPress={() => navigation.replace('home')}
            small={false}>
            <Image source={LogOut} style={styles.iconLogout}></Image>
          </TouchableOpacity>
        </View>

        <View style={{ marginHorizontal: 5, borderRadius: 10 }}>
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
          maxToRenderPerBatch={3}
          
        />

        <TouchableOpacity
          onPress={() => navigation.navigate('Create')}
          style={styles.fab2}
          small={false}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>
            Đăng Bài
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
    marginBottom: 20,
    color: '#ffffff',
  },
  text2: {
    fontSize: 18,
    paddingLeft: 20,
    color: '#ffffff',
  },
  fab2: {
    alignItems: 'center',
    backgroundColor: '#rgba(52, 52, 52, 0.2)',
    paddingBottom: 15,
    marginHorizontal: 30,

    paddingTop: 15,
    borderRadius: 15,
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
  textUser: {
    fontSize: 15,
    fontWeight: 'bold',

    color: '#ffffff',
    marginBottom: 5,

    fontStyle: 'italic',
  },
  textUser2: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    marginLeft: 7,
  },
  textPost: {
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 'auto',
    marginTop: 'auto',
  },
  iconLogout: {
    width: 27,
    height: 27,
    tintColor: 'white',
    marginRight: 10,
  },
  fontLogo: {
    width: 85,
    height: 85,
  },
  fontViewLogo: {
    flex: 3,
    alignItems: 'center',
  },
});

export default TestHome;
