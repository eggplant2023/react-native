import React, {useEffect} from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import MyProfileScreen from './MyProfileScreen';
import {useNavigation, useIsFocused} from '@react-navigation/native';
import ViewModifyScreen from './ViewModifyScreen';
import ModifyScreen from './ModifyScreen';
const Stack = createNativeStackNavigator();

function MyProfileStack({user}) {
  const isFocused = useIsFocused(); // isFoucesd Define
  useEffect(() => {
    //console.log('MyProfileStack props is', user);
  }, [isFocused]);
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MyProfile"
        children={() => {
          return <MyProfileScreen user={user} />;
        }}
        options={{
          unmountOnBlur: true,
        }}
      />
      <Stack.Screen name="ProfileView" component={ViewModifyScreen} />
      <Stack.Screen
        name="ModifyScreenView"
        component={ModifyScreen}
        options={{
          unmountOnBlur: true,
        }}
      />
    </Stack.Navigator>
  );
}

export default MyProfileStack;
