import {Picker} from '@react-native-picker/picker';
import {useNavigation} from '@react-navigation/native';
import {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable} from 'react-native';
import Icon from 'react-native-vector-icons/SimpleLineIcons';

const CustomPicker = ({model, setModel}) => {
  //const [pick, setPick] = useState('Galaxy Note 10');
  const navigation = useNavigation();
  useEffect(() => {
    console.log('CustomPicker : ', model);
  }, [setModel]);

  return (
    <View style={styles.container}>
      <Picker
        selectedValue={model}
        onValueChange={(itemValue, itemIndex) => setModel(itemValue)}
        style={{
          width: 190,
          height: 50,
        }}
        mode="dropdown"
        numberOfLines={10}>
        <Picker.Item label="전체" value="everything" />
        <Picker.Item label="Galaxy Note 10" value="Galaxy Note 10" />
        <Picker.Item label="Galaxy Note 20" value="Galaxy Note 20" />
        <Picker.Item label="Galaxy S10" value="Galaxy S10" />
        <Picker.Item label="Galaxy S20" value="Galaxy S20" />
        <Picker.Item label="Galaxy S21" value="Galaxy S21" />
        <Picker.Item label="Galaxy Z Flip3" value="Galaxy Z Flip3" />
        <Picker.Item label="Galaxy Z Fold3" value="Galaxy Z Fold3" />
        <Picker.Item label="iPhone 7" value="iPhone 7" />
        <Picker.Item label="iPhone 11" value="iPhone 11" />
        <Picker.Item label="iPhone 12" value="iPhone 12" />
        <Picker.Item label="iPhone 13" value="iPhone 13" />
        <Picker.Item label="iPhone SE" value="iPhone SE" />
        <Picker.Item label="iPhone X" value="iPhone X" />
        <Picker.Item label="iPhone XR" value="iPhone XR" />
      </Picker>
      <Pressable onPress={() => navigation.navigate('Serach')}>
        <Icon name="magnifier" size={24} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  icon: {
    marginTop: 15,
  },
});

export default CustomPicker;
