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
} from 'react-native';
import {useState, useEffect} from 'react';
import {Bubble} from 'react-native-gifted-chat';
function Login({user, setState, setLoginUser}) {
  //console.log(user);
  const [checkId, setCheckId] = useState('');
  const [checkPw, setCheckPw] = useState('');

  function checkUser() {
    user.map(item => {
      //console.log(item);
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
      <Text style={styles.text}>Id</Text>
      <TextInput
        style={styles.input}
        placeholder="아이디를 입력하세요"
        onChangeText={setCheckId}
      />
      <Text style={styles.text}>Passward</Text>
      <TextInput
        style={styles.input}
        placeholder="비밀번호를 입력하세요"
        onChangeText={setCheckPw}
      />
      <Button
        title="로그인"
        onPress={() => {
          checkUser();
        }}
      />
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
    height: 40,
    marginTop: 12,
    marginRight: 12,
    marginBottom: 12,
    marginLeft: 12,
    borderBottomWidth: 0.5,
    padding: 10,
  },
});

export default Login;
