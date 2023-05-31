import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import SaleCard from '../components/SaleCard';
import VisitCard from '../components/VisitCard';
import FavoriteCard from '../components/FavoriteCard';
import {useNavigation} from '@react-navigation/native';

function MyProfileScreen({user, setState}) {
  console.log('MyProfileScreen user is : ', user);
  const [barState, setBarState] = useState('방문 내역');
  const [userImage, setUserImage] = useState('');
  const [pothoUri, setPothoUri] = useState([]);
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const logout = () => {
    console.log('logout press');
    setState(false);
  };

  const navigation = useNavigation();
  const sigColor = '#CD67DE';
  useEffect(() => {
    navigation.setOptions({
      title: '가지마켓',
      headerTitleStyle: {
        fontWeight: 'bold',
        color: sigColor,
      },
    });
  }, [navigation]);

  useEffect(() => {
    axios
      .get(`http://52.78.130.186:8080/api/user/${user[0].user_id}`)
      .then(res => {
        //console.log(res.data);
        setUserImage(res.data);
      });
  });
  useEffect(() => {
    axios
      .get(`http://52.78.130.186:8080/api/user/info/${user[0].user_id}`)
      .then(res => {
        // console.log(res.data);
        setUserName(res.data.nickname);
        setUserEmail(res.data.user_acc);
      });
  });
  return (
    <View style={styles.block}>
      <View style={styles.topBlock}>
        <View style={styles.userBlock}>
          <Pressable
            onPress={() => {
              console.log('sadasfdsfkjdsajbfdskjdsaljk');
            }}
            style={styles.userImage}>
            <Image
              source={{
                uri: userImage,
              }}
              resizeMode="stretch"
              style={styles.userImage1}
            />
          </Pressable>
          <View style={{marginTop: -6}}>
            <Text
              style={{
                fontSize: 20,
                color: 'black',
                fontWeight: '100',
                marginLeft: 15,
                marginTop: 10,
                fontFamily: 'GmarketSansTTFBold',
              }}>
              {userName}
            </Text>
            <Text style={{marginLeft: 15}}>{userEmail}</Text>
          </View>
        </View>
        <Pressable
          style={{alignSelf: 'flex-end', marginRight: 15, marginTop: -25}}
          onPress={() => logout()}>
          <Text>로그아웃</Text>
        </Pressable>
        <View style={styles.btnBlock}>
          <Pressable onPress={() => setBarState('방문 내역')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/receipt.jpg')}
              />
              {barState == '방문 내역' ? (
                <Text style={{fontWeight: 'bold', color: sigColor}}>
                  방문 내역
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  방문 내역
                </Text>
              )}
            </View>
          </Pressable>
          <Pressable onPress={() => setBarState('판매 내역')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/basket.jpg')}
              />
              {barState == '판매 내역' ? (
                <Text style={{fontWeight: 'bold', color: sigColor}}>
                  판매 내역
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  판매 내역
                </Text>
              )}
            </View>
          </Pressable>
          <Pressable onPress={() => setBarState('관심 게시글')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/category.jpg')}
              />
              {barState == '관심 게시글' ? (
                <Text style={{fontWeight: 'bold', color: sigColor}}>
                  관심 게시글
                </Text>
              ) : (
                <Text style={{fontWeight: 'bold', color: 'black'}}>
                  관심 게시글
                </Text>
              )}
            </View>
          </Pressable>
        </View>
      </View>

      <View style={styles.bottomBlock}>
        {
          {
            '방문 내역': <VisitCard user={user} />,
            '판매 내역': <SaleCard user={user[0].user_id} />,
            '관심 게시글': <FavoriteCard user={user} />,
          }[barState]
        }
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    flex: 1,
  },
  topBlock: {
    backgroundColor: 'white',
    flexDirection: 'column',
    height: '33%',
  },
  middleBlock: {
    backgroundColor: 'white',
    height: '10%',
    marginTop: '3%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomBlock: {
    flex: 1,
    backgroundColor: 'white',
    marginTop: '3%',
    height: '100%',
  },
  userBlock: {
    backgroundColor: 'white',
    flexDirection: 'row', // 혹은 'column'
    alignItems: 'center',
    marginTop: 5,
    //justifyContent: 'center',
  },
  image: {
    backgroundColor: '#bdbdbd',
    width: '90%',
    aspectRatio: 1,
  },
  userImage: {
    backgroundColor: '#bdbdbd',
    width: '23%',
    alignItems: 'center',
    justifyContent: 'center',
    aspectRatio: 1,
    marginTop: 5,
    marginBottom: 5,
    marginLeft: 15,
    borderRadius: 100,
  },
  userImage1: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 100,
    aspectRatio: 1,
  },
  btnBlock: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginLeft: 12,
  },
  picBtn: {
    backgroundColor: '#bdbdbd',
    //width: '36%',
    height: '57%',
    aspectRatio: 1,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 40,
  },
  viewBtn: {
    alignItems: 'center',
    marginLeft: 27,
    marginRight: 27,
    marginTop: 10,
    marginBottom: 10,
  },
});

export default MyProfileScreen;
