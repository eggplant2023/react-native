import React, {useMemo} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

function PostCard({
  grade,
  model_name,
  post_content,
  post_no,
  post_title,
  price,
  status,
  updateat,
  photoURL,
}) {
  // const date = useMemo(
  //   () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
  //   [createdAt],
  // );

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
        <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
          {post_title}
        </Text>
        <Text style={{fontWeight: '500', color: 'black', marginTop: 10}}>
          상태 {grade} 급 {post_content}
        </Text>
        <Text></Text>
        <Text>{price}</Text>
        <Text date={updateat} style={styles.date}>
          {updateat}
        </Text>
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
    width: '28%',
    aspectRatio: 1,
    marginLeft: 20,
    borderRadius: 10,
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

export default PostCard;
