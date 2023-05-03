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
  Pressable,
  Text,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconRightButton from '../components/IconRightButton';
//import posts from '../../lib/posts';
import axios from 'axios';
import FeedScreen from './FeedScreen';
import UploadModeModal from '../components/UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';

const TABBAR_HEIGHT = 49;

function UploadScreen() {
  const route = useRoute();
  const {res} = route.params || {};
  const {width} = useWindowDimensions();
  const animation = useRef(new Animated.Value(width)).current;
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);

  const [pothoUri, setPothoUri] = useState([]);

  const [post, setPost] = useState({});

  const [status, setStatus] = useState('');
  const [title, setTitle] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [grade, setGrade] = useState('');
  const [description, setDescription] = useState('');

  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
  };

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    //console.log(res.data);
    setPothoUri(res);
  };
  useEffect(() => {
    if (!!pothoUri) {
      console.log('pothoUri : ', pothoUri);
    }
  }, [pothoUri]);

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }
  };

  useEffect(() => {
    setPost({
      user_no: 1,
      status: 'SS',
      post_title: 'ssssss',
      model_name: 'iphone XE',
      grade: 'SSS',
      price: 1000,
      post_content: 'SSSSSS',
    });
  }, []);
  useEffect(() => {
    if (!!post) {
      //console.log('post : ', post);
    }
  }, [post]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('model_name', 'iphone XE');
    formData.append('user_no', '1');
    formData.append('grade', 'S');
    formData.append('status', 'S');
    formData.append('price', '10000');
    formData.append('post_title', 'react Native');
    formData.append('post_content', 'react native test');

    const file = {
      name: pothoUri.assets[0].fileName,
      type: pothoUri.assets[0].type,
      uri: pothoUri.assets[0].uri,
    };
    formData.append('files', file);

    console.log(formData);
    // console.log(formData.get('post'));
    axios
      .post('http://10.0.2.2:8080/api/post/native', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .catch(function (error) {
        // console.log('여기를 탔음 1');
        console.log(error);
      });
    navigation.navigate('Feed');
  };
  // const changeForm = () => {
  //   setPost({
  //     user_no: 1,
  //     status: '',
  //     post_title: '',
  //     model_name: 'iphone XE',
  //     grade: '',
  //     price: 0,
  //     post_content: '',
  //   });
  // };

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
      <View style={styles.imageBlock}>
        {pothoUri.assets && (
          <Animated.Image
            source={pothoUri.assets}
            style={[styles.image]}
            resizeMode="cover"
          />
        )}

        <Pressable onPress={() => setModalVisible(true)}>
          <View
            style={{
              alignItems: 'center',
              paddingTop: 15,
              margin: 10,
              width: 80,
              height: 80,
              borderWidth: 1,
              borderRadius: 10,
            }}>
            <Icon name="camera-outline" size={36} />
            <Text>1/10</Text>
          </View>
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
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
  imageBlock: {
    marginLeft: 10,
    marginTop: 10,
    flexDirection: 'row',
  },
  image: {
    margin: 10,
    width: 80,
    height: 80,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'cover',
  },
  input: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    borderBottomWidth: 0.5,
    padding: 10,
  },
});

// formData.append('file', data.file);
// formData.append(
//   'key',
//   new Blob([JSON.stringify(data.info)], {type: 'application/json'}),
// );

export default UploadScreen;
