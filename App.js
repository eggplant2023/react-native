import React from 'react';
import MainTab from './src/screens/MainTab';
import Login from './src/screens/Login';
import {View} from 'react-native';
import {useState, useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';

function App() {
  useEffect(() => {
    PermissionsAndroid.requestMultiple([
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION,
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    ]);
  }, []);
  // const user = [
  //   {
  //     id: '1',
  //     passward: 1,
  //     user_id: 1,
  //   },
  //   {
  //     id: '2',
  //     passward: 2,
  //     user_id: 2,
  //   },
  //   {
  //     id: '3',
  //     passward: 3,
  //     user_id: 3,
  //   },
  //   {
  //     id: '4',
  //     passward: 4,
  //     user_id: 4,
  //   },
  // ];
  const user = [];

  for (let i = 1; i <= 70; i++) {
    user.push({
      id: i.toString(),
      passward: i,
      user_id: i,
    });
  }
  useEffect(() => {
    console.log('user list : ', user);
  }, []);
  const [state, setState] = useState(false);
  const [loginUser, setLoginUser] = useState({
    id: '',
    passward: '',
    username: '',
    user_id: 0,
  });
  console.log('loginUser is :', loginUser);
  return (
    <>
      {state == false ? (
        <Login user={user} setState={setState} setLoginUser={setLoginUser} />
      ) : (
        <MainTab user={loginUser} setState={setState} />
      )}
    </>
  );
}
export default App;
