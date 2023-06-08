import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  FlatList,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import PostCard from '../components/PostCard';
import PlusButton from '../components/PlusButton';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import CustomPicker from '../components/CustomPicker';

const warnColor = {
  safe: '#EDE7FD',
  warn: '#FEF9E9',
  alert: '#FBD9D9',
};

function FeedScreen({user1, model, setModel}) {
  const [posts, setPosts] = useState({});
  //const [model, setModel] = useState('Galaxy Note 10');
  const navigation = useNavigation();
  const isFocused = useIsFocused(); // isFoucesd Define
  const sigColor = '#CD67DE';
  const [visible, setVisible] = useState(0);
  //const [cardColor, setCardColor] = useState('');

  useEffect(() => {
    if (model == 'everything') {
      setVisible(true);
      console.log('everything 탔어요');
      axios
        .get('http://52.78.130.186:8080/api/post')
        .then(function (res) {
          // 성공 핸들링
          setPosts(res.data);
          setVisible(false);
        })
        .catch(function (error) {
          // 에러 핸들링
          console.log('여기를 탔어요');
          console.log(error);
        })
        .finally(function () {
          // 항상 실행되는 영역
        });
    } else if (model != 'everything') {
      console.log('model 탔어요');
      setVisible(true);
      axios
        .get(`http://52.78.130.186:8080/api/post/model/${model}`)
        .then(function (res) {
          // 성공 핸들링
          setPosts(res.data);
          setVisible(false);
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
  }, [isFocused, model]);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <CustomPicker model={model} setModel={setModel} />,
    });
  }, [navigation, model]);

  useEffect(() => {
    console.log('visible : ', visible);
  }, [visible]);

  const renderItem = ({item}) => (
    <Pressable
      onPress={() => {
        let cardColor;
        if (
          (item.price / item.fairPrice) * 100 > 70 &&
          (item.price / item.fairPrice) * 100 < 130
        ) {
          if (item.isCaptured == 0) {
            console.log('주의 탐');
            cardColor = warnColor.warn;
          } else if (item.isCaptured == 1) {
            console.log('안전 탐');
            cardColor = warnColor.safe;
          }
        } else if (
          (item.price / item.fairPrice) * 100 <= 70 ||
          (item.price / item.fairPrice) * 100 >= 130
        ) {
          if (item.isCaptured == 0) {
            cardColor = warnColor.alert;
            console.log('위험 탐');
          } else if (item.isCaptured == 1) {
            cardColor = warnColor.warn;
            console.log('주의 탐');
          }
        }

        console.log('피드 스크린에서 item값은 이것입니다 : ', item);
        const user = {user: user1};
        navigation.navigate('View', {item, user, cardColor});
      }}>
      <PostCard props={item} />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      {visible ? (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            position: 'absolute',
            alignItems: 'center',
            zIndex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size={60} color="#CD67DE" />
        </View>
      ) : null}

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
    justifyContent: 'center',
    flex: 1,
  },
});

export default FeedScreen;
