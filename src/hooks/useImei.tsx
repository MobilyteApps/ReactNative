import React from 'react';
import { PermissionsAndroid, Platform } from 'react-native';
const IMEI = require('react-native-imei');

export const useImei = async () => {
  const [imei, setImei] = React.useState('IMEI');
  const checkPermission = async () => {
    if (Platform.OS === 'android') {
      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.READ_PHONE_STATE,
          PermissionsAndroid.PERMISSIONS.READ_PRIVILEGED_PHONE_STATE,
        ]);

        console.log('write external stroage', grants);

        if (
          grants['android.permission.READ_PHONE_STATE'] ===
          PermissionsAndroid.RESULTS.GRANTED
        ) {
          console.log('permissions granted');
        } else {
          console.log('All required permissions not granted');
          return;
        }
      } catch (err) {
        console.warn(err);
        return;
      }
    }
  };

  React.useEffect(() => {
   // checkPermission();
  //  const imeiNumber = IMEI.getImei();
  //  setImei(imeiNumber);
  });
  return imei;
};
