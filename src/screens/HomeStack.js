import React, {useState} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import FeedScreen from './FeedScreen';
import UploadScreen from './UploadScreen';
import ViewPostScreen from './ViewPostScreen';
import ChatRoomScreen from './ChatRoomScreen';

const Stack = createNativeStackNavigator();

function HomeStack({user}) {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        children={() => {
          return <FeedScreen user={user} />;
        }}
        style={{flex: 1}}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen
        name="Upload"
        children={() => {
          return <UploadScreen user={user} />;
        }}
        options={{title: '새 게시물', headerBackTitle: '뒤로가기'}}
      />
      <Stack.Screen name="View" component={ViewPostScreen} />
      <Stack.Screen name="Chat" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default HomeStack;
