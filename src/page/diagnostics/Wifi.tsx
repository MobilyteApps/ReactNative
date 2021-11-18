import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import NetInfo from '@react-native-community/netinfo';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from './../../hooks/useToolkit';
import { add } from './../../slices/Diagnostics';
import { WORKING, NOTWORKING, WIFI } from './../../helper';

export const Wifi: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [infoText, setInfoText] = useState('Checking WiFi status...');
  const dispatch = useAppDispatch();
  const MODULE = WIFI;
  const STEP = 1;

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      try {
        if (state.isConnected) {
          if (state.type == 'wifi') {
            dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
            setInfoText('Wifi is working');
            setTimeout(() => {
              navigation.navigate('Home');
            }, 1000);
          } else {
            setInfoText('Please turn on the wifi connection');
            dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
          }
        } else {
          dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
          setInfoText('Please turn on the wifi connection');
        }
      } catch (error) {
        console.log(error);
      }
    });
    return () => {
      unsubscribe();
    };
  });

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
