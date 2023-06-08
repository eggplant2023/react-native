import React from 'react';
import {StyleSheet, View, Pressable, Platform, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

const sigColor = '#CD67DE';

function IconQna({name, color, onPress}) {
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
        <Text style={{fontSize: 20, color: sigColor}}>1:1 문의</Text>
      </Pressable>
    </View>
  );
}

IconQna.defaultProps = {
  color: sigColor,
};

const styles = StyleSheet.create({
  block: {
    width: 'auto',
    marginRight: 0,
    borderRadius: 24,
    overflow: 'hidden',
  },
});

export default IconQna;
