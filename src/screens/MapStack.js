import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import Map2 from './Map2';
import Map from './Map';
import ViewPostScreen from './ViewPostScreen';
import {Image} from 'react-native';
import ChatRoomScreen from './ChatRoomScreen';

const Stack = createNativeStackNavigator();

function MapStack({user, model, setModel}) {
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // isFoucesd Define
  const sigColor = '#CD67DE';
  useEffect(() => {
    //console.log('MyProfileStack props is', user);
  }, [isFocused]);

  useEffect(() => {
    navigation.addListener('blur', () =>
      navigation.reset({routes: [{name: 'Map1'}]}),
    );
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Map1"
        children={() => {
          return <Map2 user1={user} model={model} setModel={setModel} />;
        }}
        options={{
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

export default MapStack;
