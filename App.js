import React from 'react';
import MainTab from './src/screens/MainTab';
import Login from './src/screens/Login';
import {View} from 'react-native';
import {useState, useEffect} from 'react';

function App() {
  const user = [
    {
      username: '김성훈',
      id: 'rlatjdgns43',
      passward: 1111,
      user_id: 1,
    },
    {
      username: '김승우',
      id: 'rlatmddn43',
      passward: 2222,
      user_id: 2,
    },
    {
      username: '박재윤',
      id: 'qkrwodbs43',
      passward: 3333,
      user_id: 3,
    },
    {
      username: '김현근',
      id: 'rlagusrms43',
      passward: 4444,
      user_id: 4,
    },
  ];
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
        <MainTab user={loginUser} />
      )}
    </>
  );
}
export default App;
