import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { FailButton } from '../../components/common/FailButton';
import { useAppDispatch } from './../../hooks/useToolkit';
import { add } from './../../slices/Diagnostics';
import { NOTWORKING, WORKING } from '../../helper';
import { IMAGES } from '../../components/common/AppAssets';
import { Alert } from 'react-native';
const Proximity = require('react-native-proximity');

export const ProximitySensor: React.FC<{ navigation: any }> = ({
  navigation,
}) => {
  let STATUS = 0;
  const dispatch = useAppDispatch();
  const MODULE = 'Proximity';
  const STEP = 3;

  useEffect(() => {
    Proximity.addListener(_proximityListener);
    return () => {
      Proximity.removeListener(_proximityListener);
    };
  }, []);

  const _proximityListener = (data: any) => {
    switch (data.proximity) {
      case true:
        dispatch(add({ name: MODULE, value: WORKING, step: STEP }));
        STATUS = 1;
        Alert.alert('Proximity Sensor Working Fine', '', [
          { text: 'OK', onPress: () => navigation.goBack() },
        ]);
        navigation.navigate('Home');
        break;
      case false:
        if ((STATUS = 0))
          dispatch(add({ name: MODULE, value: NOTWORKING, step: STEP }));
        break;
      default:
        break;
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.imageStyle} source={IMAGES.PROXIMITY}></Image>
      <View style={styles.failButtonContainer}>
        <FailButton onPress={() => navigation.goBack()} />
      </View>
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
