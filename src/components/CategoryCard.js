import {Button, StyleSheet, Text, View, TouchableOpacity} from 'react-native';

const sigColor = '#CD67DE';

function CategoryCard() {
  const category = {
    smartPhone: {
      name: '스마트폰',
    },
    smartWatch: {
      name: '스마트워치',
    },
    earPlug: {
      name: '이어폰',
    },
  };
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            fontSize: 20,
            color: 'black',
            fontWeight: 'bold',
            marginLeft: 15,
            marginTop: 15,
          }}>
          현재 관심있는 카테고리
        </Text>
        <TouchableOpacity
          style={{
            borderRadius: 25,
            width: 25,
            height: 25,
            marginRight: -70,
            marginTop: 15,
            backgroundColor: sigColor,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{color: '#fff'}}>+</Text>
        </TouchableOpacity>
        <Text
          style={{
            marginTop: 17,
            marginRight: 15,
            color: 'black',
            fontWeight: 'bold',
          }}>
          추가하기
        </Text>
      </View>
      <View style={styles.block}>
        <View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: '#fff'}}>스마트폰 X</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: '#fff'}}>스마트워치 X</Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity style={styles.btn}>
            <Text style={{color: '#fff'}}>이어폰 X</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  block: {
    flexDirection: 'row',
  },
  btn: {
    backgroundColor: sigColor,
    width: '80%',
    height: '30%',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20,
    borderRadius: 10,
  },
});
export default CategoryCard;
