import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Button,
  ScrollView,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import WebView from 'react-native-webview';

const screenWidth = Dimensions.get('window').width;

function ViewModifyScreen(route) {
  console.log('route is :', route.route.params);
  const [props, setProps] = useState({});
  const [price, setPrice] = useState(0);
  const [cardColor, setCardColor] = useState('');
  const [buttonStatus, setButtonStatus] = useState('판매종료');
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
  const soldOut = () => {
    console.log('dsajhdkasbdjksabjdbsanlfbsjkdlnakdbasn');
    setButtonStatus('판매완료');
    axios.get(`http://52.78.130.186:8080/api/post/${props.post_num}/soldout`);
  };
  useEffect(() => {
    // console.log('가격', props.price);
    // console.log('공정 가격', props.fairPrice.toFixed());
    if (
      (route.route.params.price / route.route.params.fairPrice) * 100 > 70 &&
      (route.route.params.price / route.route.params.fairPrice) * 100 < 130
    ) {
      if (route.route.params.isCaptured == 0) {
        setCardColor(warnColor.warn);
      } else if (route.route.params.isCaptured == 1) {
        setCardColor(warnColor.safe);
      }
    } else if (
      (route.route.params.price / route.route.params.fairPrice) * 100 <= 70 ||
      (route.route.params.price / route.route.params.fairPrice) * 100 >= 130
    ) {
      if (route.route.params.isCaptured == 0) {
        setCardColor(warnColor.alert);
      } else if (route.route.params.isCaptured == 1) {
        setCardColor(warnColor.warn);
      }
    }
  }, []);
  return (
    <View style={styles.block}>
      <ScrollView>
        <View style={styles.imageBlock}>
          <Image
            source={{uri: route.route.params.pictureURL[0]}}
            style={styles.image}
          />
        </View>
        <View style={styles.userBlock}>
          <Image
            source={{uri: route.route.params.profile_image}}
            style={styles.userImage}
          />
          <View style={styles.userInfo}>
            <View>
              <Text style={{fontSize: 20, color: 'black'}}>
                {props.nickname}
              </Text>
              {buttonStatus == '판매완료' ? (
                <Text>{buttonStatus}</Text>
              ) : (
                <Text>{props.status}</Text>
              )}
            </View>
            <Pressable
              onPress={() => {
                deletePost();
              }}>
              <Text style={{paddingTop: 27, marginLeft: 120}}>삭제하기</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                navigation.navigate('ModifyScreenView', props);
              }}>
              <Text style={{paddingTop: 27, marginLeft: 10}}>수정하기</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.commentBlock}>
          <View
            style={{
              height: 'auto',
              paddingTop: 15,
              flexDirection: 'column',
              paddingLeft: 10,
              paddingRight: 10,
              backgroundColor: cardColor,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'GmarketSansTTFBold',
              }}>
              {props.post_title}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 11}}>{props.model_name} </Text>
              <Icon name="dot-fill" style={{marginTop: 4}} size={8} />
              <Text style={{fontSize: 11, marginLeft: 2}}>
                {route.route.params.written_date.substr(0, 10)}
              </Text>
            </View>

            <Text style={{fontSize: 11}}>상태 : {props.grade} 급</Text>

            <Text
              style={{
                fontSize: 15,
                fontFamily: 'NotoSansKR-Light',
                //color: 'black',
                fontWeight: 'bold',
                marginTop: 10,
              }}>
              {props.post_content}
            </Text>
            <View
              style={{
                height: 200,
                borderRadius: 20,
                marginTop: 15,
                marginBottom: 15,
                width: screenWidth - 20,
                overflow: 'hidden',
              }}
              pointerEvents="none">
              <WebView
                source={{
                  uri: `http://52.78.130.186/map?num=${route.route.params.post_num}&lat=${route.route.params.location.latitude}&lon=${route.route.params.location.longitude}`,
                }}
                style={{
                  marginTop: -240,
                  marginLeft: -60,
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={styles.paddingBlock}>
        <View style={{flexDirection: 'row', width: 190}}>
          <View style={{flexDirection: 'column'}}>
            <View style={{flexDirection: 'row', marginTop: -5, marginLeft: -5}}>
              <Text
                style={{
                  fontSize: 25,
                  paddingTop: 8,
                  marginLeft: 20,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                {price}
              </Text>
              <Text
                style={{
                  fontSize: 20,
                  paddingTop: 12,
                  marginLeft: 2,
                  color: 'black',
                  fontWeight: 'bold',
                }}>
                원
              </Text>
            </View>

            <Text style={{fontSize: 10, marginLeft: 16}}>
              최근 거래가 :{' '}
              {route.route.params.fairPrice
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              원
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          {route.route.params.status == '판매완료' ? (
            <Button
              title={route.route.params.status}
              color={sigColor}
              onPress={() => {
                soldOut();
              }}
            />
          ) : (
            <Button
              title={buttonStatus}
              color={sigColor}
              onPress={() => {
                soldOut();
              }}
            />
          )}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    //paddingBottom: 16,
    backgroundColor: 'white',
    flexDirection: 'column', // 혹은 'column'
  },
  userBlock: {
    width: '100%',
    height: 70,
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
    paddingHorizontal: 16,
    backgroundColor: 'white',
    height: 60,
  },

  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
  image: {
    backgroundColor: '#bdbdbd',
    height: 290,
    aspectRatio: 1,
  },
  button: {
    paddingTop: 12,
    width: 90,
  },
});

export default ViewModifyScreen;
