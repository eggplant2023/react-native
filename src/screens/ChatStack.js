import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {useEffect} from 'react';
import {Image} from 'react-native';
import ChatLobbyScreen from './ChatLobbyScreen';
import ChatRoomScreen from './ChatRoomScreen';

const Stack = createNativeStackNavigator();

function ChatStack({user}) {
  const sigColor = '#CD67DE';
  const navigation = useNavigation();
  useEffect(() => {
    navigation.addListener('blur', () =>
      navigation.reset({routes: [{name: 'Lobby'}]}),
    );
  }, []);

  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Lobby"
        children={() => {
          return <ChatLobbyScreen user={user} />;
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
        name="Room"
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

export default ChatStack;
