import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import ViewModifyScreen from './ViewModifyScreen';
import ModifyScreen from './ModifyScreen';
import ViewPostScreen from './ViewPostScreen';
import ChatRoomScreen from './ChatRoomScreen';
import {Image} from 'react-native';
const Stack = createNativeStackNavigator();

function MyProfileStack({user, setState}) {
  const isFocused = useIsFocused(); // isFoucesd Define
  const navigation = useNavigation();
  const sigColor = '#CD67DE';
  useEffect(() => {
    //console.log('MyProfileStack props is', user);
  }, [isFocused]);
  useEffect(() => {
    navigation.addListener('blur', () =>
      navigation.reset({routes: [{name: 'MyProfile'}]}),
    );
  }, [isFocused]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        children={() => {
          return <MyProfileScreen user={user} setState={setState} />;
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
        name="ProfileView"
        component={ViewModifyScreen}
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
        name="ModifyScreenView"
        component={ModifyScreen}
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
    </Stack.Navigator>
  );
}

export default MyProfileStack;
