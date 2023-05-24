import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {StyleSheet, View, FlatList, Pressable} from 'react-native';
import PostCard from '../components/PostCard';
import PlusButton from '../components/PlusButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomPicker from '../components/CustomPicker';

function FeedScreen(user) {
  const [posts, setPosts] = useState({});
  const [category, setCategory] = useState('');
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // isFoucesd Define
  const sigColor = '#CD67DE';
  //console.log('FeedScreen user :', user);
  useEffect(() => {
    // console.log('isFocused is : ', isFocused);
    // console.log('category is :', category);
    if (category === 'everything') {
      //console.log('everything axios working!!');
      axios
        .get('http://52.78.130.186:8080/api/post')
        .then(function (res) {
          // 성공 핸들링
          let temp = res.data;
          // for (let i = 0; i < temp.length; i++) {
          //   temp[i] = {...temp[i], photoUrl: photoUrl[i]};
          // }
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
    } else if (category === 'SmartPhone') {
      //console.log('SmartPhone axios working!!');
      axios
        .get('http://52.78.130.186:8080/api/post/category/smartphone')
        .then(function (res) {
          // 성공 핸들링
          let temp = res.data;
          // for (let i = 0; i < temp.length; i++) {
          //   temp[i] = {...temp[i], photoUrl: photoUrl[i]};
          // }
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
    } else if (category === 'EarPhone') {
      //console.log('EarPhone axios working!!');
      axios
        .get('http://52.78.130.186:8080/api/post/category/earphone')
        .then(function (res) {
          // 성공 핸들링
          let temp = res.data;
          // for (let i = 0; i < temp.length; i++) {
          //   temp[i] = {...temp[i], photoUrl: photoUrl[i]};
          // }
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
    } else if (category === 'SmartWatch') {
      //console.log('SmartWatch axios working!!');
      axios
        .get('http://52.78.130.186:8080/api/post/category/smartwatch')
        .then(function (res) {
          // 성공 핸들링
          let temp = res.data;
          // for (let i = 0; i < temp.length; i++) {
          //   temp[i] = {...temp[i], photoUrl: photoUrl[i]};
          // }
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
    }
  }, [isFocused, category]);

  useEffect(() => {
    navigation.setOptions({
      title: '가지마켓',
      headerRight: () => <CustomPicker setCategory={setCategory} />,
      headerTitleStyle: {
        fontWeight: 'bold',
        color: sigColor,
      },
      headerStyle: {},
    });
  }, [navigation]);

  // useEffect(() => {
  //   if (!!posts) {
  //     console.log('피드스크린 포스트 : ', posts);
  //   }
  // }, [posts]);

  const renderItem = ({item}) => (
    //console.log('item is : ', item),
    <Pressable
      onPress={() => {
        navigation.navigate('View', {item, user});
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
