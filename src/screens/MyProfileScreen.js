import React, {useEffect, useState} from 'react';
import {Image, Pressable, StyleSheet, Text, View} from 'react-native';
import CategoryCard from '../components/CategoryCard';
import SaleCard from '../components/SaleCard';

function MyProfileScreen({user}) {
  console.log('MyProfileScreen user is : ', user[0].id);
  const [state, setState] = useState('구매 내역');
  useEffect(() => {
    console.log('state is : ', state);
  }, [state]);

  return (
    <View style={styles.block}>
      <View style={styles.topBlock}>
        <View style={styles.userBlock}>
          <Image
            source={require('ReactNativeFront/src/assets/image/profile.jpg')}
            style={styles.userImage}
            resizeMode="stretch"
          />
          <Text
            style={{
              fontSize: 20,
              color: 'black',
              fontWeight: 'bold',
              marginLeft: 15,
            }}>
            {user[0].id}
          </Text>
        </View>
        <View style={styles.btnBlock}>
          <Pressable onPress={() => setState('구매 내역')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/receipt.jpg')}
              />
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                구매 내역
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setState('판매 내역')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/basket.jpg')}
              />
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                판매 내역
              </Text>
            </View>
          </Pressable>
          <Pressable onPress={() => setState('관심 카테고리')}>
            <View style={styles.viewBtn}>
              <Image
                style={styles.picBtn}
                source={require('ReactNativeFront/src/assets/image/category.jpg')}
              />
              <Text style={{fontWeight: 'bold', color: 'black'}}>
                관심 카테고리
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
      <View style={styles.middleBlock}>
        <Text style={{fontSize: 20, fontWeight: 'bold', color: 'black'}}>
          {state}
        </Text>
      </View>
      <View style={styles.bottomBlock}>
        {
          {
            '구매 내역': <SaleCard user={user[0].user_id} />,
            '판매 내역': <SaleCard user={user[0].user_id} />,
            '관심 카테고리': <CategoryCard />,
          }[state]
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
