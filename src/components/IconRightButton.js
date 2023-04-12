import React from 'react';
import {StyleSheet, View, Pressable, Platform, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const sigColor = '#CD67DE';

function IconRightButton({name, color, onPress}) {
  return (
    <View style={styles.block}>
      <Pressable
        style={({pressed}) => [
          styles.circle,
          Platform.OS === 'ios' &&
            pressed && {
              opacity: 0.3,
            },
        ]}
        onPress={onPress}
        android_ripple={{color: '#eee'}}>
        <Text style={{fontSize: 20, color: sigColor}}>완료</Text>
      </Pressable>
    </View>
  );
}

IconRightButton.defaultProps = {
  color: sigColor,
};

const styles = StyleSheet.create({
  block: {
    marginRight: -8,
    borderRadius: 24,
    overflow: 'hidden',
  },
  circle: {
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default IconRightButton;
