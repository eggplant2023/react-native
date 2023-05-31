import WebView from 'react-native-webview';
import {useEffect, useState} from 'react';
import {useIsFocused, useNavigation} from '@react-navigation/native';
import {GeoPosition} from 'react-native-geolocation-service';
import axios from 'axios';

function Map(route) {
  const navigation = useNavigation();
  return (
    <WebView
      source={{
        uri: `http://52.78.130.186/map?num=${route.route.params.item.post_num}&lat=${route.route.params.item.location.latitude}&lon=${route.route.params.item.location.longitude}`,
      }}
    />
  );
}
export default Map;
