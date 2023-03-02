import React, {useState} from 'react';
import {View, Pressable, StyleSheet, Platform} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import UploadModeModal from './UploadModeModal';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {useNavigation} from '@react-navigation/native';

const TABBAR_HEIGHT = 49;

const imagePickerOption = {
  mediaType: 'photo',
  maxWidth: 768,
  maxHeight: 768,
  includeBase64: Platform.OS === 'android',
};

function PlusButton() {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation();

  const imagePickerOption = {
    mediaType: 'photo',
    maxWidth: 768,
    maxHeight: 768,
    includeBase64: Platform.OS === 'android',
  };

  const bottom = Platform.select({
    android: TABBAR_HEIGHT / 2,
    ios: TABBAR_HEIGHT / 2 + insets.bottom - 4,
  });

  const onPickImage = res => {
    if (res.didCancel || !res) {
      return;
    }
    navigation.push('Upload', {res});
  };

  const onLaunchCamera = () => {
    launchCamera(imagePickerOption, onPickImage);
  };

  const onLaunchImageLibrary = () => {
    launchImageLibrary(imagePickerOption, onPickImage);
  };
  const onPress = () => {
    if (Platform.OS === 'android') {
      setModalVisible(true);
      return;
    }
  };

  return (
    <>
      <View style={[styles.wrapper, {bottom}]}>
        <Pressable
          android_ripple={{
            color: '#ffffff',
          }}
          style={styles.circle}
          onPress={() => setModalVisible(true)}>
          <Icon name="add" color="white" size={24} />
        </Pressable>
      </View>
      <UploadModeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onLaunchCamera={onLaunchCamera}
        onLaunchImageLibrary={onLaunchImageLibrary}
      />
    </>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    zIndex: 5,
    borderRadius: 30,
    height: 60,
    width: 60,
    position: 'absolute',
    left: '85%',
    top: '82%',
    transform: [
      {
        translateX: -27,
      },
    ],
    ...Platform.select({
      ios: {
        shadowColor: '#4d4d4d',
        shadowOffset: {width: 0, height: 4},
        shadowOpacity: 0.3,
        shadowRadius: 4,
      },
      android: {
        elevation: 5,
        overflow: 'hidden',
      },
    }),
  },
  circle: {
    backgroundColor: '#6200ee',
    borderRadius: 30,
    height: 60,
    width: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default PlusButton;
