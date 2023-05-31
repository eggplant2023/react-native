import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, Text, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ChatStack from './ChatStack';
import MapStack from './MapStack';

const Tab = createBottomTabNavigator();

function MainTab({user, setState}) {
  const sigColor = '#CD67DE';
  const [model, setModel] = useState('Galaxy Note 10');
  return (
    <SafeAreaProvider>
      <View style={styles.block}>
        <NavigationContainer>
          <Tab.Navigator
            screenOptions={{
              headerShown: false,
              tabBarShowLabel: false,
              tabBarActiveTintColor: sigColor,
            }}
            initialRouteName="HomeStack">
            <Tab.Screen
              name="ChatStack"
              children={() => {
                return <ChatStack user={user} />;
              }}
              options={{
                title: '홈',
                tabBarIcon: ({color}) => (
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Icon name="chat" size={24} color={color} />
                    <Text style={{color: color, fontSize: 11}}>가지톡</Text>
                  </View>
                ),
              }}
            />
            <Tab.Screen
              name="HomeStack"
              children={() => {
                return (
                  <HomeStack user={user} model={model} setModel={setModel} />
                );
              }}
              options={{
                tabBarIcon: ({color}) => (
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Icon name="home" size={24} color={color} />
                    <Text style={{color: color, fontSize: 11}}>홈</Text>
                  </View>
                ),
              }}
              style={{flex: 1}}
            />
            <Tab.Screen
              name="MapStack"
              children={() => {
                return (
                  <MapStack user={user} model={model} setModel={setModel} />
                );
              }}
              options={{
                tabBarIcon: ({color}) => (
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Icon name="map" size={24} color={color} />
                    <Text style={{color: color, fontSize: 11}}>지도</Text>
                  </View>
                ),
              }}
              style={{flex: 1}}
            />
            <Tab.Screen
              name="MyProfileStack"
              children={() => {
                return <MyProfileStack user={user} setState={setState} />;
              }}
              options={{
                tabBarIcon: ({color}) => (
                  <View style={{flexDirection: 'column', alignItems: 'center'}}>
                    <Icon name="person" size={24} color={color} />
                    <Text style={{color: color, fontSize: 11}}>MY</Text>
                  </View>
                ),
              }}
            />
          </Tab.Navigator>
        </NavigationContainer>
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    zIndex: 0,
  },
});

export default MainTab;
