import {useIsFocused, useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {FlatList, Pressable, StyleSheet, View} from 'react-native';
import PostCard from './PostCard';

function VisitCard(user) {
  const [posts, setPosts] = useState({});
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  console.log(user.user);
  useEffect(() => {
    axios
      .get(`http://52.78.130.186:8080/api/visit/${user.user[0].user_id}`)
      .then(res => {
        setPosts(res.data);
      });
  }, [isFocused]);
  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
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

export default VisitCard;
