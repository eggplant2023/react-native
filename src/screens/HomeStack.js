import React, {useEffect, useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import UploadScreen from './UploadScreen';
import ViewPostScreen from './ViewPostScreen';
import ChatRoomScreen from './ChatRoomScreen';
import SearchScreen from '../screens/SearchScreen';
import Map from './Map';
import {useNavigation} from '@react-navigation/native';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

const Stack = createNativeStackNavigator();

function HomeStack({user, model, setModel}) {
  const sigColor = '#CD67DE';
  const navigation = useNavigation();

  useEffect(() => {
    navigation.addListener('blur', () =>
      navigation.reset({routes: [{name: 'Feed'}]}),
    );
  }, []);

  return (
    <Stack.Navigator initialRouteName="Feed">
      <Stack.Screen
        name="Feed"
        children={() => {
          return <FeedScreen user1={user} model={model} setModel={setModel} />;
        }}
        style={{flex: 1}}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            //fontWeight: 'bold',
            color: sigColor,
            fontFamily: 'GmarketSansTTFBold',
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Upload"
        children={() => {
          return <UploadScreen user={user} />;
        }}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: sigColor,
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />

      <Stack.Screen
        name="View"
        component={ViewPostScreen}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: sigColor,
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Chat"
        component={ChatRoomScreen}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: sigColor,
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Serach"
        children={() => {
          return <SearchScreen user={user} />;
        }}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: sigColor,
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Map"
        component={Map}
        options={{
          title: '가지마켓',
          unmountOnBlur: true,
          headerTitleStyle: {
            fontWeight: 'bold',
            color: sigColor,
          },
          headerTitle: () => (
            <Image
              source={require('ReactNativeFront/src/assets/image/Logo.png')}
              style={{width: 150, height: 50, marginLeft: -10}}
              resizeMode={'stretch'}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
}

export default HomeStack;
