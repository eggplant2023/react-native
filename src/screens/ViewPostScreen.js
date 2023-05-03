import {useEffect, useState} from 'react';
import {View, StyleSheet, Text, Image, Pressable, Button} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

function ViewPostScreen(route) {
  const [props, setProps] = useState({});
  const [price, setPrice] = useState(0);
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
      // console.log('route.route.params', route.route.params);
      // console.log('props is : ', props);
    }
  }, [props]);
  return (
    <View style={styles.block}>
      <View style={styles.imageBlock}>
        <Image source={props.photoUrl} style={styles.image} />
      </View>
      <View style={styles.userBlock}>
        <Image style={styles.userImage} />
        <View style={styles.userInfo}>
          <View>
            <Text style={{fontSize: 20, color: 'black'}}>{props.user_no}</Text>
            <Text>{props.status}</Text>
          </View>
          <Text style={{paddingTop: 25}}>신고하기</Text>
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
            <Button title="채팅하기" color={sigColor} />
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
    width: 80,
  },
});

export default ViewPostScreen;
