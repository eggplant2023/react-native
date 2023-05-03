import {useNavigation, useIsFocused} from '@react-navigation/native';
import {useState, useEffect} from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import ChatCard from '../components/ChatCard';
import ChatRoomScreen from './ChatRoomScreen';
import axios from 'axios';

function ChatLobbyScreen({user}) {
  const navigation = useNavigation();
  const [chatRooms, setChatRooms] = useState([{}]);
  const isFocused = useIsFocused(); // isFoucesd Define

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get(`http://10.0.2.2:8080/api/chattingroom/guest/${user[0].user_id}`)
      .then(function (res) {
        // 성공 핸들링
        //console.log('chattingroom/guest/1 is : ', res.data);
        setChatRooms(res.data);
        //console.log('chatRoom is : ', chatRooms);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log('여기를 탔어요');
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, [isFocused]);
  useEffect(() => {
    if (!!chatRooms) {
      // console.log('chatRooms is : ', chatRooms);
    }
  }, [chatRooms]);

  const renderItem = ({item}) => (
    //console.log('item is : ', item);
    <Pressable
      onPress={() => {
        console.log('item is : ', item);
        // console.log('user is : ', item.message[0].user);
        // console.log('text is : ', item.message[0].text);
        navigation.navigate('Room', {item, user});
      }}>
      <ChatCard Chat_User={item.post_name} Chat_Content={item.last_cht_msg} />
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
