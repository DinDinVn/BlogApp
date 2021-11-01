import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import Constants from 'expo-constants';
import HomePostTest from './HomePostTest';
import CreateEmployee from './CreateEmployee';
import ProfileTest from './ProfileTest';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { reducer } from '../reducers/reducer';

const store = createStore(reducer);

const Stack = createStackNavigator();

const myOptions = {
  title: 'Trang Chủ',
  headerTintColor: 'white',
  headerShown: false,
  headerStyle: {
    backgroundColor: '#rgba(52, 52, 52, 0.4)',
  },
};
const PostTest = ({ navigation, route, props }) => {
  return (
    <View style={styles.container} >
      <Stack.Navigator>
        <Stack.Screen name="homePostTest" component={HomePostTest} options={myOptions} />
        <Stack.Screen
          name="Create"
          component={CreateEmployee}
          options={{ ...myOptions, title: '' }}
        />
        <Stack.Screen
          headerRight="none"
          name="Profile"
          component={ProfileTest}
          options={{ ...myOptions, title: 'Chi Tiết' }}
        />
      </Stack.Navigator>
    </View>
  );
};

export default () => {
  return (
    <Provider store={store}>
      <PostTest />
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
});
