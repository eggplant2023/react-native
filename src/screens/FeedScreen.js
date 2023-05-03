import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import PostCard from '../components/PostCard';
import PlusButton from '../components/PlusButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';

function FeedScreen() {
  const [posts, setPosts] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // isFoucesd Define
  const photoUrl = [
    require('ReactNativeFront/src/assets/image/model/1.jpeg'),
    require('ReactNativeFront/src/assets/image/model/2.jpeg'),
    require('ReactNativeFront/src/assets/image/model/3.jpeg'),
    require('ReactNativeFront/src/assets/image/model/4.jpeg'),
    require('ReactNativeFront/src/assets/image/model/5.jpeg'),
  ];
  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get('http://10.0.2.2:8080/api/post')
      .then(function (res) {
        // 성공 핸들링
        let temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          temp[i] = {...temp[i], photoUrl: photoUrl[i]};
        }
        setPosts(temp);
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
    if (!!posts) {
      console.log('피드스크린 포스트 : ', posts);
    }
  }, [posts]);

  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
        navigation.navigate('View', item);
      }}>
      <PostCard
        props={item}
        // grade={item.grade}
        // model_name={item.model_name}
        // post_content={item.post_content}
        // post_no={item.post_no}
        // post_title={item.post_title}
        // price={item.price}
        // status={item.status}
        // updateat={item.updateat}
        // photoURL={item.photoURL}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        style={{flex: 1, height: '100%'}}
        data={posts}
        renderItem={renderItem}
      />
      <PlusButton />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
