import React, { useEffect, useState } from 'react';
import { Text } from 'react-native-elements';
import BluetoothStateManager from 'react-native-bluetooth-state-manager';
import { StyleSheet } from 'react-native';
import { useAppDispatch } from './../../hooks/useToolkit';
import { add } from './../../slices/Diagnostics';
import { NOTWORKING, WORKING } from '../../helper';

export const Bluetooth: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [infoText, setInfoText] = useState('Checking bluetooth status...');
  const dispatch = useAppDispatch();
  const MODULE = 'Bluetooth';
  const STEP = 2;

  useEffect(() => {
    BluetoothStateManager.getState().then((bluetoothState: string) => {
      handleBlutoothState(bluetoothState);
    });
    BluetoothStateManager.onStateChange((bluetoothState: string) => {
      handleBlutoothState(bluetoothState);
    });
  });

  function handleBlutoothState(bluetoothState: string) {
    switch (bluetoothState) {
      case 'Unknown':
        setInfoText('Unkown error');
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      case 'Resetting':
        setInfoText('Restting');
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      case 'Unsupported':
        setInfoText('Bluetooth not supported');
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      case 'Unauthorized':
        setInfoText('Unauthrise request');
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      case 'PoweredOff':
        setInfoText('Trun on bluetooth');
        BluetoothStateManager.openSettings();
        dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      case 'PoweredOn':
        setInfoText('Bluetooth is working');
        dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
        setTimeout(() => {
          navigation.navigate('Home');
        }, 1000);
        break;
      default:
        break;
    }
  }

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
