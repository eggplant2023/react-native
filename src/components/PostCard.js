import React, {useEffect, useState, useMemo} from 'react';
import {View, StyleSheet, Text, Image, Pressable} from 'react-native';

const warnColor = {
  safe: '#EDE7FD',
  warn: '#FEF9E9',
  alert: '#FBD9D9',
};

function PostCard({props}) {
  //console.log('포스트 카드의 props is : ', props);
  const [price, setPrice] = useState(0);
  const [cardColor, setCardColor] = useState('');
  const [warnMsg, setWarnMsg] = useState('');
  const [msgColor, setMsgColor] = useState('');
  const sigColor = '#CD67DE';

  useEffect(() => {
    setPrice(props.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','));
    //console.log('포스트 카드의 props : ', props);
  }, [props]);

  useEffect(() => {
    // console.log('가격', props.price);
    // console.log('공정 가격', props.fairPrice.toFixed());
    if (
      (props.price / props.fairPrice) * 100 > 70 &&
      (props.price / props.fairPrice) * 100 < 130
    ) {
      if (props.isCaptured == 0) {
        setCardColor(warnColor.warn);
        setWarnMsg('\n다운로드된 사진일 가능성이 존재합니다.');
        setMsgColor('#DF0101');
      } else if (props.isCaptured == 1) {
        setCardColor(warnColor.safe);
        setWarnMsg('\n안전한 게시글입니다.');
        setMsgColor(sigColor);
      }
    } else if (
      (props.price / props.fairPrice) * 100 <= 70 ||
      (props.price / props.fairPrice) * 100 >= 130
    ) {
      if (props.isCaptured == 0) {
        setCardColor(warnColor.alert);
        setWarnMsg(
          '평균시세와 가격 간 큰 차이가 존재합니다.\n다운로드된 사진일 가능성이 존재합니다.',
        );
        setMsgColor('#DF0101');
      } else if (props.isCaptured == 1) {
        setWarnMsg('\n평균시세와 가격 간 큰 차이가 존재합니다.');
        setCardColor(warnColor.warn);
        setMsgColor('#DF0101');
      }
    }
  }, [props]);
  return (
    <View
      style={{
        paddingTop: 16,
        paddingBottom: 16,
        flexDirection: 'row', // 혹은 'column'
        backgroundColor: cardColor,
        borderBottomWidth: 3,
        borderColor: 'white',

        height: 'auto',
      }}>
      <View style={styles.image}>
        <Image
          source={{uri: props.pictureURL[0]}}
          style={styles.image1}
          resizeMethod="resize"
          resizeMode="cover"
        />
        <View
          style={{
            alignItems: 'center',
            backgroundColor: sigColor,
            marginTop: 5,
            paddingTop: 5,
            paddingBottom: 5,
            borderRadius: 10,
          }}>
          <Text style={{color: 'white'}}>{props.status}</Text>
        </View>
      </View>
      <View>
        <View style={styles.textBlock}>
          {props.post_title.length >= 16 ? (
            <View>
              <Text
                style={{
                  fontSize: 17,
                  //fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'GmarketSansTTFBold',
                  marginLeft: 0,
                }}>
                {props.post_title.substr(0, 16)} ···
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 17,
                  //fontWeight: 'bold',
                  color: 'black',
                  fontFamily: 'GmarketSansTTFBold',
                  marginLeft: 0,
                }}>
                {props.post_title.substr(0, 18)}
              </Text>
            </View>
          )}
          <Text style={{fontWeight: 'bold', color: 'black', marginTop: 11}}>
            상태 {props.grade} 급
          </Text>
          <Text style={{fontFamily: 'NotoSansKR-Light', marginTop: 0}}>
            {props.post_content.substr(0, 20)} ···
          </Text>

          <Text style={{marginTop: 0, color: 'black', fontWeight: 'bold'}}>
            {price} 원
          </Text>
        </View>
        <View
          style={{
            marginLeft: 10,
          }}>
          <Text style={{color: msgColor, fontSize: 13}}>{warnMsg}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  textBlock: {
    flexDirection: 'column',
    paddingLeft: 10,
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  paddingBlock: {
    marginTop: 50,
    //paddingHorizontal: 16,
  },
  head: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '28%',
    aspectRatio: 1,
    marginLeft: 20,
    borderRadius: 10,
  },
  image1: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 10,
  },
  description: {},
  date: {
    color: '#757575',
    fontSize: 12,
    lineHeight: 18,
  },
});

export default PostCard;
