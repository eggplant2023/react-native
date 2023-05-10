import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack';
import MyProfileStack from './MyProfileStack';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {StyleSheet, View} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import ChatStack from './ChatStack';

const Tab = createBottomTabNavigator();

function MainTab({user}) {
  const sigColor = '#CD67DE';
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
                tabBarIcon: ({color}) => (
                  <Icon name="chat" size={24} color={color} />
                ),
              }}
            />
            <Tab.Screen
              name="HomeStack"
              component={HomeStack}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="home" size={24} color={color} />
                ),
              }}
              style={{flex: 1}}
            />
            <Tab.Screen
              name="MyProfileStack"
              children={() => {
                return <MyProfileStack user={user} />;
              }}
              options={{
                tabBarIcon: ({color}) => (
                  <Icon name="person" size={24} color={color} />
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
