import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import PostCard from './PostCard';

function FavoriteCard(user) {
  const [posts, setPosts] = useState({});
  const navigation = useNavigation();
  console.log('FavoriteCard 유저값은', user.user);
  useEffect(() => {
    axios
      .get(`http://52.78.130.186:8080/api/like/${user.user[0].user_id}`)
      .then(res => {
        //console.log('관심목록 데이터 입니다', res.data);
        setPosts(res.data);
      })
      .catch(error => {
        console.log('에러가 났어요', error);
      });
  }, []);
  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
        console.log('관심 목록에서 유저값은 이것입니다 : ', user);
        //const user = props.user;
        navigation.navigate('View', {item, user});
      }}>
      <PostCard props={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <FlatList data={posts} renderItem={renderItem} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
  },
});

export default FavoriteCard;
