import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {Animated, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {RadioButton} from 'react-native-paper';
import IconRightButton from '../components/IconRightButton';
const sigColor = '#CD67DE';

function ModifyScreen(route) {
  const [props, setProps] = useState(route.route.params);
  const [pothoUri, setPothoUri] = useState(props.pictureURL);
  const [title, setTitle] = useState(props.post_title);
  const [model, setModel] = useState(props.model_name);
  const [price, setPrice] = useState(props.price.toString());
  const [description, setDescription] = useState(props.post_content);
  const [grade, setGrade] = useState(props.grade);
  const navigation = useNavigation();

  console.log('ModifyScreen props : ', props);
  const updatePost = {
    user_num: props.user_num,
    status: '판매중',
    post_title: title,
    model_name: model,
    grade: grade,
    price: price,
    post_content: description,
  };

  useEffect(() => {
    console.log('changePost updatePost is : ', updatePost);
  }, [updatePost]);
  //console.log('교체된 title 는 이것입니다 :', title);
  function onSubmit() {
    //여기 에 값이 안들어가
    console.log('교체된 post 는 이것입니다 :', updatePost);
    axios
      .post(
        `http://52.78.130.186:8080/api/post/${props.post_num}/modify`,
        updatePost,
      )
      .then(console.log('수정 성공'))
      .catch(function (error) {
        // console.log('여기를 탔음 1');
        console.log(error);
      });
    navigation.navigate('MyProfile');
  }
  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <IconRightButton name="send" onPress={onSubmit} />,
    });
  }, [navigation, onSubmit]);

  return (
    <View style={styles.block}>
      <View style={styles.imageBlock}>
        <Image
          source={{uri: pothoUri[0]}}
          style={[styles.image]}
          resizeMode="cover"
        />
      </View>
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
      <Text style={styles.input1}>손상도</Text>
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
  input1: {
    height: 40,
    marginTop: 12,
    marginBottom: 12,
    padding: 10,
  },
  radio: {
    flexDirection: 'row',
    marginLeft: 50,
    marginRight: 50,
    justifyContent: 'space-between',
  },
  radioblock: {
    alignItems: 'center',
  },
});

export default ModifyScreen;
