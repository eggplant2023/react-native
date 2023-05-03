import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import PostCard from './PostCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';

function SaleCard(user) {
  const isFocused = useIsFocused(); // isFoucesd Define
  const navigation = useNavigation();
  const [posts, setPosts] = useState({});
  const [filterdCard, setFilterdCard] = useState({});
  const photoUrl = [
    require('ReactNativeFront/src/assets/image/model/1.jpeg'),
    require('ReactNativeFront/src/assets/image/model/2.jpeg'),
    require('ReactNativeFront/src/assets/image/model/3.jpeg'),
    require('ReactNativeFront/src/assets/image/model/4.jpeg'),
    require('ReactNativeFront/src/assets/image/model/5.jpeg'),
  ];
  console.log(user);
  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get('http://52.78.130.186:8080:8080/api/post')
      .then(function (res) {
        // 성공 핸들링
        //console.log('SaleCard res data is : ', res.data);
        let temp = res.data;
        for (let i = 0; i < temp.length; i++) {
          temp[i] = {...temp[i], photoUrl: photoUrl[i]};
        }
        setPosts(temp);
        filterCard();
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
  function filterCard() {
    posts.map(item => {
      console.log('filterCard is :', item);
      const test = user.filter(item => item.id == checkId);
    });
  }
  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('View', item);
      }}>
      <PostCard props={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        renderItem={renderItem}
        contentContainerStyle={{flexGrow: 1}}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 15,
  },
});

export default SaleCard;
