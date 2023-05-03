import React, {useEffect, useState, useMemo} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

function PostCard({props}) {
  // const date = useMemo(
  //   () => (createdAt ? new Date(createdAt._seconds * 1000) : new Date()),
  //   [createdAt],
  // );
  console.log('포스트 카드의 props is : ', props);

  return (
    <View style={styles.block}>
      <Image
        source={{uri: props.pictureURL[0]}}
        style={styles.image}
        resizeMethod="resize"
        resizeMode="cover"
      />
      <View style={styles.textBlock}>
        <Text style={{fontSize: 17, fontWeight: 'bold', color: 'black'}}>
          {props.post_title}
        </Text>
        <Text style={{fontWeight: '500', color: 'black', marginTop: 10}}>
          상태 {props.grade} 급 {props.post_content}
        </Text>
        <Text></Text>
        <Text>{props.price}</Text>
        <Text date={props.updateat} style={styles.date}>
          {props.updateat}
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
