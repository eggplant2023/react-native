import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {useNavigation} from '@react-navigation/native';
import IconRightButton from '../components/IconRightButton';
import axios from 'axios';

function ViewModifyScreen(route) {
  console.log('route is :', route);
  const [props, setProps] = useState({});
  const [price, setPrice] = useState(0);
  const navigation = useNavigation();
  const sigColor = '#CD67DE';

  const warnColor = {
    safe: '#EDE7FD',
    warn: '#FEF9E9',
    alert: '#FBD9D9',
  };

  useEffect(() => {
    setProps(route.route.params);
    setPrice(
      route.route.params.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
    if (!!props) {
      console.log('props is : ', props);
    }
  }, [props]);

  const deletePost = () => {
    axios
      .get(`http://52.78.130.186:8080/api/post/${props.post_num}/delete`)
      .then(console.log('삭제 성공'))
      .catch(function (error) {
        // 에러 핸들링
        console.log('삭제 실패');
        console.log(error);
      });
    navigation.navigate('MyProfile');
  };

  return (
    <View style={styles.block}>
      <View style={styles.imageBlock}>
        <Image
          source={{uri: route.route.params.pictureURL[0]}}
          style={styles.image}
        />
      </View>
      <View style={styles.userBlock}>
        <Image style={styles.userImage} />
        <View style={styles.userInfo}>
          <View>
            <Text style={{fontSize: 20, color: 'black'}}>{props.nickname}</Text>
            <Text>{props.status}</Text>
          </View>
          <Pressable
            onPress={() => {
              console.log('수정하기');
              navigation.navigate('ModifyScreenView', props);
            }}>
            <Text style={{paddingTop: 25}}>수정하기</Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.commentBlock}>
        <View style={styles.textBlock}>
          <Text style={{fontSize: 20, color: 'black'}}>{props.post_title}</Text>

          <Text>{props.post_content}</Text>
          <Text>상태 {props.grade} 급</Text>
          <Text date={props.updateat} style={styles.date}>
            {props.updateat}
          </Text>
        </View>
        <View style={styles.paddingBlock}>
          <Icon
            name="star-border"
            size={40}
            style={{marginLeft: -10, marginTop: 7}}
          />
          <Text
            style={{
              fontSize: 25,
              paddingTop: 4,
              marginLeft: -120,
              color: 'black',
              fontWeight: 'bold',
            }}>
            {price}
          </Text>
          <View style={styles.button}>
            <Button title="게시물 삭제" color={sigColor} onPress={deletePost} />
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    paddingBottom: 16,
    backgroundColor: 'white',
    flexDirection: 'column', // 혹은 'column'
  },
  userBlock: {
    width: '100%',
    height: '12%',
    borderBottomWidth: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
  },
  userImage: {
    backgroundColor: '#bdbdbd',
    width: '15%',
    aspectRatio: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    borderRadius: 40,
  },
  userInfo: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageBlock: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
  },
  textBlock: {
    height: '80%',
    paddingTop: 15,
    flexDirection: 'column',
    paddingLeft: 10,
    backgroundColor: '#EDE7FD',
  },
  commentBlock: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  paddingBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
  image: {
    backgroundColor: '#bdbdbd',
    height: '100%',
    aspectRatio: 1,
  },
  button: {
    paddingTop: 8,
    width: 90,
  },
});

export default ViewModifyScreen;
