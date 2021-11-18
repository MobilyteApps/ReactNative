import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, Image } from 'react-native-elements';
import { IMAGES } from '../../components/common/AppAssets';
import {
  SPECIFICCONDITION,
  WORKING,
  NOTWORKING,
  WATERDAMAGE,
  BENTFRAME,
  TOUCHIC,
  YES,
  NO,
} from '../../helper';
import { useAppDispatch } from '../../hooks/useToolkit';
import { add } from '../../slices/Diagnostics';

export const SpecificCondition: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [infoText, setInfoText] = useState('');
  const [test, setTest] = useState(0);

  const dispatch = useAppDispatch();
  const MODULE = SPECIFICCONDITION;
  const STEP = 12;

  const Tests = ['Water Damage?', 'Bent Frame?', 'Touch IC?'];
  useEffect(() => {
    setInfoText('Water Damage ?');
    // setTest(test + 1);
  }, []);

  const handleButtonClick = async (value: string, test: number) => {
    console.log('test', test);
    switch (test) {
      case 0:
        dispatch(add({ name: WATERDAMAGE, value: value, step: STEP }));
        setTest(test + 1);
        break;
      case 1:
        setTest(test + 1);
        dispatch(add({ name: BENTFRAME, value: value, step: STEP }));
        break;
      case 2:
        setTest(test + 1);
        dispatch(add({ name: TOUCHIC, value: value, step: STEP }));
        navigation.navigate('Home');
        break;
      default:
        return;
    }
  };

  return (
    <View style={styles.container}>
      {/* <Image style={styles.imageStyle} source={IMAGES.PROXIMITY} /> */}
      <Text style={styles.textStyle}>{Tests[test]}</Text>
      <View>
        <Button
          title="Yes"
          buttonStyle={{ backgroundColor: 'green', width: '100%' }}
          onPress={() => handleButtonClick(YES, test)}
        />
        <Button
          title="No"
          buttonStyle={{ backgroundColor: 'red', width: '100%', marginTop: 20 }}
          onPress={() => handleButtonClick(NO, test)}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    alignItems: 'center',
  },
  imageStyle: {
    width: 250,
    height: 500,
    marginTop: 30,
  },
  textStyle: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 18,
    padding: 30,
  },
});
