import React from 'react';
import DeviceInfo from 'react-native-device-info';
import { useImei } from './useImei';
const IMEI = require('react-native-imei');

export function useDeviceInfo() {
  const [info, setInfo] = React.useState({} as any);
  const imeiNumber = useImei();

  React.useEffect(() => {
    getDeviceInformation();
  }, []);

  const getDeviceInformation = async () => {
    const model = DeviceInfo.getModel();
    const deviceId = DeviceInfo.getDeviceId();
    const readableVersion = DeviceInfo.getReadableVersion();
    const systemVersion = DeviceInfo.getSystemVersion();
    const deviceType = DeviceInfo.getDeviceType();
    const deviceName = await DeviceInfo.getDeviceName();
    const carrier = await DeviceInfo.getCarrier();
    const serialNumber = await DeviceInfo.getSerialNumber();
    const totalDiskCapacity = await DeviceInfo.getTotalDiskCapacity();
    const totalMemory = await DeviceInfo.getTotalMemory();
    const information = {
      model,
      deviceId,
      readableVersion,
      systemVersion,
      deviceType,
      deviceName,
      carrier,
      serialNumber,
      totalDiskCapacity: totalDiskCapacity / 1024 / 1024 / 1024,
      totalMemory: totalMemory / 1024 / 1024 / 1024,
    };

    setInfo(information);
  };

  return info;
}
