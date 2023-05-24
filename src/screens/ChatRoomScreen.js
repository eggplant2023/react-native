import {GiftedChat, SystemMessage, Bubble} from 'react-native-gifted-chat';
import {useEffect, useRef, useState} from 'react';
import axios from 'axios';
import React from 'react';
import SockJsClient from 'react-stomp';
import {View} from 'react-native';

const sigColor = '#CD67DE';

function ChatRoomScreen({route}) {
  //console.log('채팅 라우트 user_id 이것입니다.', route.params.user[0].user_id);
  //console.log('채팅방 유저정보는 이것입니다. : ', user);
  //const [messages, setMessages] = useState([]);
  const [chatList, setChatList] = useState([]);
  const [clientConnected, setClientConnected] = useState(false);
  const [apponent, setApponent] = useState('');
  const topic = `/sub/chat/room/${route.params.item.cht_room_no}`;
  const clientRef = useRef(null);
  const [currentUser, setCurrentUser] = useState(route.params.user[0].user_id);
  const [idCount, setIdCount] = useState(0);
  const [chatNum, setChatNum] = useState();

  //const chatUrl = 'http://10.0.2.2:8080/ws-stomp';
  const chatUrl = 'http://52.78.130.186:8080/ws-stomp';

  const onMessageReceive = (msg, topic) => {
    console.log('메세지 수신');
    console.log(msg);
    if (msg.cht_room_num == route.params.item.cht_room_no) {
      const chat = {
        _id: idCount,
        text: msg.cht_text,
        //authorId: msg.cht_member,
        //author: msg.cht_member_name,
        createdAt: msg.cht_time,
        user: {_id: msg.cht_member},
      };
      setChatList([...chatList, chat]);
    }
  };
  useEffect(() => {}, [chatList]);

  const onSendMessage = msg => {
    try {
      var send_message = {
        cht_room_num: route.params.item.cht_room_no,
        cht_member: parseInt(currentUser),
        cht_text: msg[0].text,
      };
      clientRef.current.sendMessage(
        '/pub/chat/sendMessage',
        JSON.stringify(send_message),
      );
      console.log('메세지전송!!');
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };
  const setMessages = msg => {
    setChatList([...chatList, msg]);
  };

  const onConnect = () => {
    console.log('소켓 연결성공!!!!');
    setClientConnected(true);
  };

  const onDisconnect = () => {
    console.log('소켓 연결해제!!!!');
    setClientConnected(true);
  };

  useEffect(() => {
    axios
      .get(
        `http://52.78.130.186:8080/api/chatting/${route.params.item.cht_room_no}`,
      )
      .then(function (res) {
        let temp = res.data.chattingList;
        setIdCount(temp.length);
        temp.map((item, index) => {
          const chat = {
            _id: index,
            text: item.cht_text,
            createdAt: item.cht_time,
            user: {_id: item.cht_member},
          };
          temp[index] = chat;
        });
        setChatList(temp);
      })
      .catch(function (error) {
        // 에러 핸들링
        console.log('여기를 탔어요');
        console.log(error);
      })
      .finally(function () {
        // 항상 실행되는 영역
      });
  }, []);

  useEffect(() => {
    if (!!idCount) {
      console.log('idCount is : ', idCount);
      console.log('chatList is : ', chatList);
    }
  }, [idCount]);

  function renderBubble(props) {
    //console.log('renderBubble is : ', props.currentMessage.user._id);
    const message_sender_id = props.currentMessage.user._id;
    // console.log('message_sender_id is :', message_sender_id);
    // console.log('route.params.cht_member is :', route.params.cht_member);
    return (
      <Bubble
        {...props}
        position={
          message_sender_id == route.params.user[0].user_id ? 'right' : 'left'
        }
        textStyle={{
          right: {
            color: 'white',
            fontSize: 15,
          },
          left: {
            fontSize: 15,
          },
        }}
        wrapperStyle={{
          right: {
            backgroundColor: sigColor,
            marginRight: 15,
            marginVertical: 5,
          },
          left: {
            backgroundColor: '#E6E6E6',
            marginLeft: '5%',
            marginVertical: 5,
          },
        }}
      />
    );
  }

  return (
    <View style={{flex: 1}}>
      <GiftedChat
        messages={chatList}
        renderBubble={renderBubble}
        inverted={false}
        onSend={onSendMessage}
        //   isTyping={true}
        //   renderSystemMessage={this.onRenderSystemMessage}
        //   renderUsernameOnMessage={true}
        //   renderSend={RenderSend}
        //   // textInputProps= {{  autoFocus : true  }}
        //   textInputStyle={{alignSelf: 'center'}}
        //   onPressActionButton={() => {}}
        //   alwaysShowSend={true}
        //   showUserAvatar={true}
        //   placeholder="메시지를 입력하세요."
        //   user={{
        //     _id: 2,
        //     name: 'beanzinu',
        //  }}
      />
      <SockJsClient
        url={chatUrl}
        topics={[topic]}
        onMessage={onMessageReceive}
        ref={clientRef}
        onConnect={onConnect}
        onDisconnect={onDisconnect}
        debug={false}
        style={[{width: '100%', height: '90%'}]}
      />
    </View>
  );
}
export default ChatRoomScreen;
