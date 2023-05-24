import {Picker} from '@react-native-picker/picker';
import {useEffect, useState} from 'react';
import {View} from 'react-native';

const CustomPicker = ({setCategory}) => {
  const [pick, setPick] = useState('everything');

  useEffect(() => {
    setCategory(pick);
  }, [pick]);

  return (
    <View>
      <Picker
        selectedValue={pick}
        onValueChange={(itemValue, itemIndex) => setPick(itemValue)}
        style={{
          width: 160,
          height: 50,
        }}>
        <Picker.Item label="전체" value="everything" />
        <Picker.Item label="스마트폰" value="SmartPhone" />
        <Picker.Item label="이어폰" value="EarPhone" />
        <Picker.Item label="스마트워치" value="SmartWatch" />
      </Picker>
    </View>
  );
};

export default CustomPicker;
