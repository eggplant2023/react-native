import axios from 'axios';
import React, {useState, useCallback, useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Pressable} from 'react-native';
import {Searchbar} from 'react-native-paper';
import PostCard from '../components/PostCard';
import {useNavigation} from '@react-navigation/native';

function SearchScreen(user) {
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState({});
  const navigation = useNavigation();
  const onChangeSearch = query => setSearchQuery(query);
  const SearchList = () => {
    console.log('SearchList press!!!');
    axios
      .get(`http://52.78.130.186:8080/api/post/name/desc/${searchQuery}`)
      .then(res => {
        console.log(res.data);
        setPosts(res.data);
      });
  };

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
      <Searchbar
        placeholder="Search"
        onChangeText={onChangeSearch}
        value={searchQuery}
        onSubmitEditing={SearchList}
      />
      <FlatList
        style={{flex: 1, height: '100%'}}
        data={posts}
        renderItem={renderItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInput: {
    marginTop: 40,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
});
export default SearchScreen;
