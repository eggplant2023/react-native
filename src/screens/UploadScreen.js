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
  ScrollView,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconRightButton from '../components/IconRightButton';
//import posts from '../../lib/posts';
import axios from 'axios';
import UploadModeModal from '../components/UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {RadioButton} from 'react-native-paper';

const TABBAR_HEIGHT = 49;
const FLASK_BASE_URL =
  'http://ec2-52-78-130-186.ap-northeast-2.compute.amazonaws.com:5000';
const sigColor = '#CD67DE';

function UploadScreen({user}) {
  console.log('user is', user[0].user_id);
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
  const [description, setDescription] = useState('');
  const [grade, setGrade] = useState('');
  const [fairPrice, setFairPrice] = useState();

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
    //console.log('dasdasdsadasd', res.assets);
    setPothoUri(res);
    onClassification(res);
  };

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
    console.log(`http://52.78.130.186:8080/api/${model}/${grade}`);
    axios.get(`http://52.78.130.186:8080/api/${model}/${grade}`).then(res => {
      setFairPrice(res.data);
    });
  }, [grade, model]);

  const onClassification = props => {
    const data = new FormData();
    const file = {
      name: props.assets[0].fileName,
      type: props.assets[0].type,
      uri: props.assets[0].uri,
    };
    data.append('files', file);
    // axios
    //   .post(FLASK_BASE_URL + '/predict', data, {
    //     headers: {
    //       'Content-Type': 'multipart/form-data',
    //     },
    //   })
    //   .then(res => {
    //     console.log('FLASK_BASE_URL res 는 :', res.data);
    //     if (res.data.answer === 'smartphone') {

    //     }
    //   });
    axios
      .post(FLASK_BASE_URL + '/predict/smartphone', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then(res => {
        setModel(res.data.answer);
        console.log('FLASK_BASE_URL res 는', res.data);
      });
  };

  const onSubmit = () => {
    const formData = new FormData();
    formData.append('model_name', model);
    formData.append('user_no', user[0].user_id);
    formData.append('grade', grade);
    formData.append('status', '판매중');
    formData.append('price', price);
    formData.append('post_title', title);
    formData.append('post_content', description);

    const file = {
      name: pothoUri.assets[0].fileName,
      type: pothoUri.assets[0].type,
      uri: pothoUri.assets[0].uri,
    };
    formData.append('files', file);

    console.log(formData);
    // console.log(formData.get('post'));
    axios
      .post('http://52.78.130.186:8080/api/post/native', formData, {
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
  useEffect(() => {
    console.log('포쏘 유알아이 길이 : ', pothoUri);
  }, [pothoUri]);

  return (
    <View style={styles.block}>
      <ScrollView>
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
              {pothoUri.assets ? (
                <Text>{pothoUri.assets.length}/1</Text>
              ) : (
                <Text>0/1</Text>
              )}
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
        <View style={styles.gradeblock}>
          <Text style={styles.input1}>손상도</Text>
        </View>
        <View style={styles.radio}>
          <View style={styles.radioblock}>
            <Text>S</Text>
            <RadioButton
              color={sigColor}
              value="S"
              status={grade === 'S' ? 'checked' : 'unchecked'}
              onPress={() => setGrade('S')}
            />
            <Text>100%</Text>
          </View>
          <View style={styles.radioblock}>
            <Text>A</Text>
            <RadioButton
              color={sigColor}
              value="A"
              status={grade === 'A' ? 'checked' : 'unchecked'}
              onPress={() => setGrade('A')}
            />
            <Text>90%</Text>
          </View>
          <View style={styles.radioblock}>
            <Text>B</Text>
            <RadioButton
              color={sigColor}
              value="B"
              status={grade === 'B' ? 'checked' : 'unchecked'}
              onPress={() => setGrade('B')}
            />
            <Text>80%</Text>
          </View>
          <View style={styles.radioblock}>
            <Text>C</Text>
            <RadioButton
              color={sigColor}
              value="C"
              status={grade === 'C' ? 'checked' : 'unchecked'}
              onPress={() => setGrade('C')}
            />
            <Text>70%</Text>
          </View>
          <View style={styles.radioblock}>
            <Text>F</Text>
            <RadioButton
              color={sigColor}
              value="F"
              status={grade === 'F' ? 'checked' : 'unchecked'}
              onPress={() => setGrade('F')}
            />
            <Text>60%</Text>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'column',
            marginLeft: 10,
            marginTop: 30,
            marginBottom: -10,
          }}>
          <Text style={{fontSize: 11, color: 'black'}}>
            {model} {grade}급의 평균 가격은 :
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              color: 'black',
              marginTop: 5,
              marginBottom: 10,
            }}>
            {fairPrice} 원 입니다.
          </Text>
        </View>
        <TextInput
          style={styles.input}
          placeholder="가격"
          value={price}
          onChangeText={setPrice}
        />
        <TextInput
          style={styles.input2}
          placeholder="상품 설명"
          value={description}
          onChangeText={setDescription}
        />
      </ScrollView>
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
  gradeblock: {
    flexDirection: 'row',
    //justifyContent: 'space-between',
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
  input2: {
    height: 'auto',
    marginTop: 12,
    marginBottom: 12,
    borderBottomWidth: 0.5,
    padding: 10,
  },
  input1: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
  },
  radio: {
    flexDirection: 'row',
    // marginLeft: 50,
    // marginRight: 50,
    marginTop: -15,
    paddingTop: 15,
    paddingBottom: 15,
    borderRadius: 30,
    justifyContent: 'center',
    backgroundColor: '#EDE7FD',
  },
  radioblock: {
    alignItems: 'center',
    marginHorizontal: 15,
  },
});

// formData.append('file', data.file);
// formData.append(
//   'key',
//   new Blob([JSON.stringify(data.info)], {type: 'application/json'}),
// );

export default UploadScreen;
