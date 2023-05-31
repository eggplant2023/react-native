import {
  StyleSheet,
  TextInput,
  View,
  Animated,
  Keyboard,
  useWindowDimensions,
  Pressable,
  Text,
  Button,
  Image,
  Dimensions,
} from 'react-native';
import {useState, useEffect} from 'react';
import {Bubble} from 'react-native-gifted-chat';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

function Login({user, setState, setLoginUser}) {
  //console.log(user);
  const [checkId, setCheckId] = useState('');
  const [checkPw, setCheckPw] = useState('');

  function checkUser() {
    user.map(item => {
      console.log('checkUser : ', item);
      if (checkId == item.id && checkPw == item.passward) {
        const test = user.filter(item => item.id == checkId);
        console.log('아이디와 패스워드가 일치합니다.');
        console.log(item);
        setState(true);
        setLoginUser(test);
      }
    });
  }

  return (
    <View style={styles.block}>
      <Image
        source={require('ReactNativeFront/src/assets/image/Logo.png')}
        style={{width: screenWidth, height: screenHeight / 6, marginBottom: 20}}
        resizeMode={'stretch'}
      />
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        onChangeText={setCheckId}
      />
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        onChangeText={setCheckPw}
      />
      <Pressable
        style={({pressed}) => [
          {
            backgroundColor: pressed ? '#bc67de' : '#CD67DE',
          },
          styles.button,
        ]}
        onPress={() => {
          checkUser();
        }}>
        <Text style={{color: '#E6E6E6', fontWeight: 'bold', fontSize: 15}}>
          로그인
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    justifyContent: 'center',
  },
  text: {
    marginLeft: 30,
    alignItems: 'center',
  },
  input: {
    backgroundColor: '#E6E6E6',
    width: '83%',
    height: 48,
    paddingLeft: 15,
    borderRadius: 20,
    marginBottom: 18,
    alignSelf: 'center',
  },
  button: {
    //backgroundColor: '#CD67DE',
    width: '83%',
    height: 48,
    //paddingLeft: 15,
    borderRadius: 20,
    marginBottom: 18,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default Login;
