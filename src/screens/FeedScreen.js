import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList} from 'react-native';
import PostCard from '../components/PostCard';
import PlusButton from '../components/PlusButton';
import {useIsFocused} from '@react-navigation/native';

function FeedScreen() {
  const [posts, setPosts] = useState({});
  const isFocused = useIsFocused(); // isFoucesd Define

  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get('http://10.0.2.2:8080/api/post')
      .then(function (res) {
        // 성공 핸들링
        //console.log(res.data);
        setPosts(res.data);
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
      //console.log('posts : ', posts);
    }
  }, [posts]);

  return (
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderItem} />
      <PlusButton />
    </View>
  );
}
const renderItem = ({item}) => (
  console.log('item is : ', item),
  (
    <PostCard
      grade={item.grade}
      model_name={item.model_name}
      post_content={item.post_content}
      post_no={item.post_no}
      post_title={item.post_title}
      price={item.price}
      status={item.status}
      updateat={item.updateat}
      photoURL={item.photoURL}
    />
  )
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default FeedScreen;
