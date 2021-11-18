import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text } from 'react-native-elements';
import { WORKING, NOTWORKING, BRIGHTNESS } from '../../helper';
import { useAppDispatch } from '../../hooks/useToolkit';
import { add } from '../../slices/Diagnostics';
import SystemSetting from 'react-native-system-setting';
export const Brightness: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [infoText, setInfoText] = useState(
    'Did you see a change in Brightness',
  );
  const [test, setTest] = useState(0);

  const dispatch = useAppDispatch();
  const MODULE = BRIGHTNESS;
  const STEP = 13;

  useEffect(() => {
    async function setBrightness() {
      await SystemSetting.setAppBrightness(0.6);
    }
    setBrightness();
    SystemSetting.getBrightness().then(brightness => {});
  }, []);

  const handleButtonClick = (status: boolean) => {
    switch (status) {
      case true:
        dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
        navigation.navigate('Home');
        break;
      case false:
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        navigation.navigate('Home');
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textStyle}>{infoText}</Text>
      <View>
        <Button
          title="Yes"
          buttonStyle={{ backgroundColor: 'green', width: '100%' }}
          onPress={() => handleButtonClick(true)}
        />
        <Button
          title="No"
          buttonStyle={{ backgroundColor: 'red', width: '100%', marginTop: 20 }}
          onPress={() => handleButtonClick(false)}
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
