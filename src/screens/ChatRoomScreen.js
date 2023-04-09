import {GiftedChat, SystemMessage} from 'react-native-gifted-chat';
import {useEffect, useState} from 'react';
import React from 'react';

function ChatRoomScreen({route}) {
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    setMessages(route.params);
    console.log('messages is :', messages);
  }, [messages]);
  useEffect(() => {
    if (!!messages) {
      //console.log('posts : ', posts);
    }
  }, [messages]);

  // const onSend = React.useCallback((msg = []) => {
  //   setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  // }, []);

  return (
    <GiftedChat
      messages={messages}
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
