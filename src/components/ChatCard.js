import React, {useMemo} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

function ChatCard({Chat_Title, Chat_Content, photoURL}) {
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
        borderRadius={30}
      />
      <View style={styles.textBlock}>
        <Text style={{fontFamily: 'GmarketSansTTFBold', fontSize: 15}}>
          {Chat_Title}
        </Text>

        <Text style={{fontFamily: 'NotoSansKR-Light', marginTop: 0}}>
          {Chat_Content}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    paddingTop: 16,
    paddingBottom: 16,
    height: 100,
    flexDirection: 'row', // 혹은 'column'
    borderBottomWidth: 3,
    borderColor: 'white',
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
    marginTop: -7,
    marginLeft: 10,
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
