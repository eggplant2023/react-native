import axios from 'axios';
import {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  Pressable,
  Button,
  ScrollView,
  TouchableHighlight,
  Dimensions,
} from 'react-native';
import Icon from 'react-native-vector-icons/Octicons';
import {useNavigation} from '@react-navigation/native';
import WebView from 'react-native-webview';

//const {screenWidth, screenHeight} = Dimensions.get('screen');
const screenWidth = Dimensions.get('window').width;

const warnColor = {
  safe: '#EDE7FD',
  warn: '#FEF9E9',
  alert: '#FBD9D9',
};

function ViewPostScreen(route) {
  const [props, setProps] = useState({});
  const [price, setPrice] = useState(0);
  const sigColor = '#CD67DE';
  const navigation = useNavigation();
  const [starMark, setStarMark] = useState();
  //const [cardColor, setCardColor] = useState('');
  const [reportStatus, setReportStatus] = useState(true);
  const [userCheck, setUserCheck] = useState(true);

  console.log('상세 보기  route.route.params : ', route.route.params);
  useEffect(() => {
    if (
      route.route.params.user.user[0].user_id ==
      route.route.params.item.user_num
    ) {
      setUserCheck(false);
    } else {
      setUserCheck(true);
    }
  }, []);

  useEffect(() => {
    console.log('userCheck : ', userCheck);
  }, [userCheck]);

  const warnColor = {
    safe: '#EDE7FD',
    warn: '#FEF9E9',
    alert: '#FBD9D9',
  };

  const handleStarmark = () => {
    setStarMark(!starMark);
  };

  //방문 기록 남기기.
  useEffect(() => {
    axios.get(
      `http://52.78.130.186:8080/api/post/${route.route.params.user.user[0].user_id}/${route.route.params.item.post_num}`,
    );
  }, []);

  //좋아요 추가, 삭제
  useEffect(() => {
    if (starMark == true) {
      console.log('과심 목록 추가');
      axios.get(
        `http://52.78.130.186:8080/api/like/add/${route.route.params.user.user[0].user_id}/${route.route.params.item.post_num}`,
      );
    } else if (starMark == false) {
      console.log('과심 목록 제거');
      axios.get(
        `http://52.78.130.186:8080/api/like/delete/${route.route.params.user.user[0].user_id}/${route.route.params.item.post_num}`,
      );
    }
  }, [starMark]);

  //좋아요 누른 게시글 판별
  useEffect(() => {
    axios
      .get(
        `http://52.78.130.186:8080/api/like/num/${route.route.params.user.user[0].user_id}`,
      )
      .then(res => {
        console.log('관심 있어 하는 게시글의 넘버는', res.data);
        const test = res.data.filter(
          item => item === route.route.params.item.post_num,
        );
        //console.log(route.route.params.item.post_num);
        //console.log(test);

        if (test == route.route.params.item.post_num) {
          setStarMark(true);
          console.log('setStarMark(true);');
        } else {
          setStarMark(false);
          console.log('setStarMark(false);');
        }
      });
  }, []);

  //세자리 마다 , 넣어주기
  useEffect(() => {
    setProps(route.route.params.item);
    setPrice(
      route.route.params.item.price
        .toString()
        .replace(/\B(?=(\d{3})+(?!\d))/g, ','),
    );
    if (!!props) {
      //console.log('props is : ', props);
    }
  }, [props]);

  //채팅룸으로 넘어가기
  const createChattingroom = () => {
    console.log(route.route.params);
    axios
      .get(
        `http://52.78.130.186:8080/api/chattingroom/post/${props.post_num}/${route.route.params.user.user[0].user_id}`,
      )
      .then(res => {
        let item = res.data;
        let user = route.route.params.user.user;

        navigation.navigate('Chat', {item, user});
      });
  };

  // useEffect(() => {
  //   // console.log('가격', props.price);
  //   // console.log('공정 가격', props.fairPrice.toFixed());
  //   if (
  //     (route.route.params.item.price / route.route.params.item.fairPrice) *
  //       100 >
  //       70 &&
  //     (route.route.params.item.price / route.route.params.item.fairPrice) *
  //       100 <
  //       130
  //   ) {
  //     if (route.route.params.item.isCaptured == 0) {
  //       setCardColor(warnColor.warn);
  //     } else if (route.route.params.item.isCaptured == 1) {
  //       setCardColor(warnColor.safe);
  //     }
  //   } else if (
  //     (route.route.params.item.price / route.route.params.item.fairPrice) *
  //       100 <=
  //       70 ||
  //     (route.route.params.item.price / route.route.params.item.fairPrice) *
  //       100 >=
  //       130
  //   ) {
  //     if (route.route.params.item.isCaptured == 0) {
  //       setCardColor(warnColor.alert);
  //     } else if (route.route.params.item.isCaptured == 1) {
  //       setCardColor(warnColor.warn);
  //     }
  //   }
  // }, []);

  const doingReport = () => {
    setReportStatus(false);
    axios
      .get(
        `http://52.78.130.186:8080/api/post/report/${route.route.params.user.user[0].user_id}/${route.route.params.item.post_num}`,
      )
      .then(console.log('신고하기 성공'));
  };

  return (
    <View style={styles.block}>
      <ScrollView>
        <View style={styles.imageBlock}>
          <Image
            source={{uri: route.route.params.item.pictureURL[0]}}
            style={styles.image}
            //resizeMode={'contain'}
          />
        </View>
        <View style={styles.userBlock}>
          <Image
            source={{uri: route.route.params.item.profile_image}}
            style={styles.userImage}
          />
          <View style={styles.userInfo}>
            <View>
              <Text style={{fontSize: 20, color: 'black'}}>
                {props.nickname}
              </Text>
              <Text style={{marginLeft: 1}}>{props.status}</Text>
            </View>
            {reportStatus ? (
              <View style={{flexDirection: 'row', paddingTop: 27}}>
                <TouchableHighlight onPress={doingReport}>
                  <View style={styles.button2}>
                    <Text>신고하기 </Text>
                    <Icon name="stop" style={{paddingTop: 4}}></Icon>
                  </View>
                </TouchableHighlight>
              </View>
            ) : (
              <View style={{flexDirection: 'row', paddingTop: 27}}>
                <View style={styles.button2}>
                  <Text>신고완료 </Text>
                  <Icon name="check" style={{paddingTop: 4}} />
                </View>
              </View>
            )}
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
              backgroundColor: route.route.params.cardColor,
            }}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontFamily: 'GmarketSansTTFBold',
                //fontWeight: 'bold',
                // marginTop: -25,
              }}>
              {props.post_title}
            </Text>

            <View style={{flexDirection: 'row'}}>
              <Text style={{fontSize: 11}}>{props.model_name} </Text>
              <Icon name="dot-fill" style={{marginTop: 4}} size={8} />
              <Text style={{fontSize: 11, marginLeft: 2}}>
                {route.route.params.item.written_date.substr(0, 10)}
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

            <Pressable
              onPress={() => {
                navigation.navigate('Map', route.route.params);
              }}>
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
                    uri: `http://52.78.130.186/map?num=${route.route.params.item.post_num}&lat=${route.route.params.item.location.latitude}&lon=${route.route.params.item.location.longitude}`,
                  }}
                  style={{
                    marginTop: -240,
                    marginLeft: -60,
                  }}
                />
              </View>
            </Pressable>
          </View>
        </View>
      </ScrollView>

      <View style={styles.paddingBlock}>
        <View style={{flexDirection: 'row'}}>
          <Pressable onPress={handleStarmark} style={{marginLeft: 10}}>
            {starMark ? (
              <View>
                <Icon
                  name="star-fill"
                  size={36}
                  style={{
                    color: '#CD67DE',
                    position: 'absolute',
                    marginTop: 11,
                    marginLeft: -8,
                  }}
                />
                <Icon
                  name="star"
                  size={40}
                  style={{marginLeft: -10, marginTop: 10, color: '#CD67DE'}}
                />
              </View>
            ) : (
              <Icon
                name="star"
                size={40}
                style={{marginLeft: -10, marginTop: 10, color: '#CD67DE'}}
              />
            )}
          </Pressable>
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
              {route.route.params.item.fairPrice
                .toString()
                .split('.')[0]
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
              원
            </Text>
          </View>
        </View>
        <View style={styles.button}>
          {userCheck ? (
            <Button
              title="판매자와 채팅하기"
              color={sigColor}
              onPress={createChattingroom}
            />
          ) : null}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    //flex: 1,

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
    width: 125,
  },
  button2: {
    //paddingTop: 27,
    flexDirection: 'row',
    backgroundColor: 'white',
  },
});

export default ViewPostScreen;
