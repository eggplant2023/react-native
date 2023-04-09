import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import ChatCard from '../components/ChatCard';
import ChatRoomScreen from './ChatRoomScreen';

function ChatLobbyScreen() {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState([
    {
      roomId: 1,
      message: [
        {user: '사기꾼', text: '싸게싸게 모십니다', createdAt: new Date()},
      ],
    },
    {
      roomId: 2,
      message: [
        {user: '미친이용자', text: '벽돌 받아라~', createdAt: new Date()},
      ],
    },
  ]);

  const renderItem = ({item}) => (
    // console.log('item is : ', item);
    <Pressable
      onPress={() => {
        console.log('item is : ', item.message);
        // console.log('user is : ', item.message[0].user);
        // console.log('text is : ', item.message[0].text);
        navigation.navigate('Room', item.message);
      }}>
      <ChatCard
        Chat_User={item.message[0].user}
        Chat_Content={item.message[0].text}
      />
    </Pressable>
  );
  return (
    <View style={styles.container}>
      <FlatList data={chatRooms} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default ChatLobbyScreen;
