import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatLobbyScreen from './ChatLobbyScreen';
import ChatRoomScreen from './ChatRoomScreen';

const Stack = createNativeStackNavigator();

function ChatStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Lobby" component={ChatLobbyScreen} />
      <Stack.Screen name="Room" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default ChatStack;
