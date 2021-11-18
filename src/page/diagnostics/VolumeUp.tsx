import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import { StyleSheet, Linking } from 'react-native';
import { useAppDispatch } from './../../hooks/useToolkit';
import { add } from './../../slices/Diagnostics';
import { WORKING, NOTWORKING, VOLUMEUP } from './../../helper';
import SystemSetting from 'react-native-system-setting';

export const VolumeUp: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [infoText, setInfoText] = useState('Press Volume Up Key');
  const dispatch = useAppDispatch();
  const MODULE = VOLUMEUP;
  const STEP = 8;
  let CURRENTVOLUME = 0;

  useEffect(() => {
    SystemSetting.getVolume().then(async volume => {
      CURRENTVOLUME = volume;
    });
    const volumeListener = SystemSetting.addVolumeListener(data => {
      const volume = data.value;
      try {
        if (CURRENTVOLUME > volume) {
          setInfoText('Press Volume Up Key');
          dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
          CURRENTVOLUME = volume;
        } else if (CURRENTVOLUME == volume) {
          setInfoText('Volume Up Key Working Fine');
          dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
          navigation.navigate('Home');
          CURRENTVOLUME = volume;
        } else {
          setInfoText('Volume Up Key Working Fine');
          dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
          navigation.navigate('Home');
          //CURRENTVOLUME = volume
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      SystemSetting.removeVolumeListener(volumeListener);
    };
  }, []);

  return <Text style={styles.textStyle}>{infoText}</Text>;
};

const styles = StyleSheet.create({
  textStyle: {
    alignSelf: 'center',
    fontWeight: '500',
    fontSize: 18,
    padding: 30,
  },
});
