import React, {useMemo} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

function ChatCard({Chat_User, Chat_Content, photoURL}) {
  const onOpenProfile = () => {
    // TODO: 사용자 프로필 화면 열기
  };

  return (
    <View style={styles.block}>
      <Image
        source={{uri: photoURL}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.textBlock}>
        <Text>{Chat_User}</Text>
        <Text></Text>
        <Text>{Chat_Content}</Text>
      </View>
      <View style={styles.paddingBlock}>
        {/* <Text style={styles.description}>{description}</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
    flexDirection: 'row', // 혹은 'column'
  },
  textBlock: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '20%',
    aspectRatio: 1,
    marginBottom: 16,
    marginLeft: 20,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    marginBottom: 8,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default ChatCard;
