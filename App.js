import React, { useEffect, useState } from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-community/async-storage';

import SignupScreen from './screens/SignupScreen';
import LoginScreen from './screens/LoginScreen';
import HomeSceen from './screens/HomeScreen';
import Test from './screens/Test';
import Home from './screens/Home';
import Post from './screens/Post';
import PostTest from './screens/PostTest';
import HomePostTest from './screens/HomePostTest';

const Stack = createStackNavigator();

const App = ({ navigation }) => {
  const myOption = {
    title: 'Trang Chủ',
    headerTintColor: 'white',

    headerStyle: {
      backgroundColor: '#1e90ff',
    },
  };
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none">
        <Stack.Screen name="home" component={Home} headerMode="none" />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="postTest" component={PostTest} />
        <Stack.Screen name="post" component={Post} />
        <Stack.Screen name="homeScreen" component={HomeSceen} />
        <Stack.Screen name="signup" component={SignupScreen} />
        <Stack.Screen name="test" component={Test} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
