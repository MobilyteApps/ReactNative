import React from 'react';
import { View, StyleSheet, Vibration } from 'react-native';
import { Text, Image } from 'react-native-elements';
import { IMAGES } from '../../components/common/AppAssets';
import { TestActionButton } from '../../components/common/TestActionButton';
import { VIBRATION } from '../../helper';
import { useAppDispatch } from '../../hooks/useToolkit';
import { add } from '../../slices/Diagnostics';

export const VibrationPage: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const MODULE = VIBRATION;
  const STEP = 10;

  React.useEffect(() => {
    Vibration.vibrate(3 * 1000);
  });
  const handleButtonClick = (value: string) => {
    dispatch(add({ name: MODULE, value: value, step: STEP }));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={IMAGES.PROXIMITY} />
      <Text h4>Did you feel vibration?</Text>
      <TestActionButton handleButtonClick={handleButtonClick} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
  },
  imageStyle: {
    width: 250,
    height: 500,
    marginTop: 30,
  },
  failButtonContainer: {
    padding: 30,
    alignSelf: 'center',
  },
});
