import React from 'react';
import {StyleSheet, View} from 'react-native';
import PlusButton from '../components/PlusButton';

function FeedScreen() {
  return (
    <View style={styles.container}>
      <PlusButton />
    </View>
  );
}

export default FeedScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
