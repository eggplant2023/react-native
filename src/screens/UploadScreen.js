import React, {
  useEffect,
  useRef,
  useState,
  useCallback,
  Component,
} from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  Keyboard,
  useWindowDimensions,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
//import posts from '../../lib/posts';
import axios from 'axios';
import FeedScreen from './FeedScreen';

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [post, setPost] = useState({});

  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();

  const onSubmit = () => {
    const formData = new FormData();
    changeForm();
    formData.append(
      'post',
      new Blob([JSON.stringify(post)], {type: 'application/json'}),
    );

    formData.append('files', res.assets[0].uri);

    // console.log(formData.get('files'));
    // console.log(formData.get('post'));
    axios
      .post('http://10.0.2.2:8080/api/post', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(function (error) {
        console.log('여기를 탔음 1');
        console.log(error);
      });
    navigation.navigate('Feed');
  };
  const changeForm = () => {
    setPost({
      user_no: 1,
      status: 'S',
      post_title: title,
      model_name: 'iphone XE',
      grade: grade,
      price: price,
      post_content: description,
    });
  };
  useEffect(() => {
    setPost({
      user_no: 1,
      status: 'S',
      post_title: 'test title',
      model_name: 'iphone XE',
      grade: 'A',
      price: 0,
      post_content: description,
    });
  }, []);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton name="send" onPress={onSubmit} />,
    });
  }, [navigation, onSubmit]);

  useEffect(() => {
    const didShow = Keyboard.addListener('keyboardDidShow', () =>
      setIsKeyboardOpen(true),
    );
    const didHide = Keyboard.addListener('keyboardDidHide', () =>
      setIsKeyboardOpen(false),
    );

    return () => {
      didShow.remove();
      didHide.remove();
    };
  }, []);

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isKeyboardOpen ? 0 : width,
      useNativeDriver: false,
      duration: 150,
      delay: 100,
    }).start();
  }, [isKeyboardOpen, width, animation]);

  return (
    <View style={styles.block}>
      <Animated.Image
        source={{uri: res.assets[0]?.uri}}
        style={[styles.image]}
        resizeMode="cover"
      />
      <TextInput
        style={styles.input}
        placeholder="제목"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="모델명"
        value={model}
        onChangeText={setModel}
      />
      <TextInput
        style={styles.input}
        placeholder="손상도"
        value={grade}
        onChangeText={setGrade}
      />
      <TextInput
        style={styles.input}
        placeholder="가격"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="상품 설명"
        value={description}
        onChangeText={setDescription}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  image: {width: 100, height: 100, resizeMode: 'cover'},
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

// formData.append('file', data.file);
// formData.append(
//   'key',
//   new Blob([JSON.stringify(data.info)], {type: 'application/json'}),
// );

export default UploadScreen;
