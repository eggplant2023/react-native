import {GiftedChat, SystemMessage, Bubble} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import axios from 'axios';
import React from 'react';

const sigColor = '#CD67DE';

function ChatRoomScreen({route}) {
  //console.log(route.params.cht_room_no);
  //const [messages, setMessages] = useState([]);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 1,
        },
      },
      {
        _id: 2,
        text: 'hi',
        createdAt: new Date(),
        user: {
          _id: 2,
        },
      },
    ]);
  }, []);

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get(`http://10.0.2.2:8080/api/chatting/${route.params.cht_room_no}`)
      .then(function (res) {
        // 성공 핸들링
        console.log(`chatting/${route.params.cht_room_no} is : `, res.data);
        //setPosts(res.data);
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

  // useEffect(() => {
  //   setMessages(route.params);
  //   console.log('messages is :', messages);
  // }, [messages]);
  // useEffect(() => {
  //   if (!!messages) {
  //     //console.log('posts : ', posts);
  //   }
  // }, [messages]);

  // const onSend = React.useCallback((msg = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  // }, []);

  function renderBubble(props) {
    const message_sender_id = props.currentMessage.user._id;
    // console.log('message_sender_id is :', message_sender_id);
    // console.log('route.params.cht_member is :', route.params.cht_member);
    return (
      <Bubble
        {...props}
        position={message_sender_id == 2 ? 'right' : 'left'}
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
            marginLeft: -32,
            marginVertical: 5,
          },
        }}
      />
    );
  }
  return (
    <GiftedChat
      messages={messages}
      renderBubble={renderBubble}
      user={{
        _id: '1',
      }}

      //onSend={messages => onSend(messages)}
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
  );
}
export default ChatRoomScreen;
