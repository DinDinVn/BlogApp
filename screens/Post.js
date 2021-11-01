import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
import HomePost from './HomePost';
import CreateEmployee from './CreateEmployee';
import Profile from './Profile';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../reducers/reducer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
  title: 'Trang Chủ',
 
  headerShown: false,
  headerStyle: {
    backgroundColor: '#f0ffff',
  },
};
const myOptions2 = {
  title: 'Trang Chủ',
  headerTintColor: 'white',
  headerShown: false,
  headerStyle: {
    backgroundColor: '#87ceeb',
  },
};
const Post = ({ navigation, route, props }) => {
  return (
    <View style={styles.container}>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomePost} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions2, title: '' }}
        />
        <Stack.Screen
          headerRight="none"
          name="Profile"
          component={Profile}
          options={{ ...myOptions2, title: 'Chi Tiết' }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <Post />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
});
