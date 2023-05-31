import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ActivityIndicator} from 'react-native';
import Geolocation from 'react-native-geolocation-service';
import WebView from 'react-native-webview';
import CustomPicker from '../components/CustomPicker';

interface ILocation {
  latitude: number;
  longitude: number;
}

interface IUser {
  user_id: number;
}
interface IProps {
  user1: IUser[];

  model: string;

  setModel: React.Dispatch<React.SetStateAction<string>>;
}

const Map2: React.FC<IProps> = ({user1, model, setModel}) => {
  const [location, setLocation] = useState<ILocation | undefined>(undefined);
  const navigation = useNavigation();

  console.log('dasdsadsadasd : ', model);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => <CustomPicker model={model} setModel={setModel} />,
    });
  }, [navigation, model]);

  const onMessage = (e: {nativeEvent: {data: string}}) => {
    const event = e.nativeEvent.data;
    console.log('map user', user1);
    axios
      .get(`http://52.78.130.186:8080/api/post/${user1[0].user_id}/${event}`)
      .then(res => {
        console.log(res.data);
        const item = res.data;
        const user = {user: user1};
        navigation.navigate('View', {item, user});
      });
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({
          latitude: 37.5,
          longitude: 127.5,
        });
      },
      (error: any) => {
        console.log(error.code, error.message);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);

  useEffect(() => {
    console.log(location);
  }, [location]);

  return (
    <View style={styles.container}>
      {location ? (
        <WebView
          source={{
            uri: `http://52.78.130.186/nearmap?lat=${location.latitude}&lon=${location.longitude}&model=${model}`,
          }}
          onMessage={onMessage}
        />
      ) : (
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'space-around',
            position: 'absolute',
            alignItems: 'center',
            zIndex: 1,
            width: '100%',
            height: '100%',
            backgroundColor: 'white',
          }}>
          <ActivityIndicator size={60} color="#CD67DE" />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  label: {
    fontSize: 24,
  },
});

export default Map2;
