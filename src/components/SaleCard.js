import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import PostCard from './PostCard';
import {useIsFocused, useNavigation} from '@react-navigation/native';

function SaleCard(user) {
  const isFocused = useIsFocused(); // isFoucesd Define
  const navigation = useNavigation();
  const [posts, setPosts] = useState({});

  console.log('sale card user : ', user.user);
  useEffect(() => {
    // 컴포넌트가 처음 마운트될 때 포스트 목록을 조회한 후 `posts` 상태에 담기
    axios
      .get(`http://52.78.130.186:8080/api/post/sell/${user.user}`)
      .then(function (res) {
        console.log('dsadsadas', res.data);
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
  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        navigation.navigate('ProfileView', item);
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
