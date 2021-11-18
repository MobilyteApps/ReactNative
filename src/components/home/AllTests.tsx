import {
  WIFI,
  BLUETOOTH,
  VIBRATION,
  MIC_RECORDING,
  PROXIMITY,
  SPECIFICCONDITION,
  BRIGHTNESS,
  TOUCH,
  SENSORS,
  VOLUMEUP,
  VOLUMEDOWN,
  CAMERA,
} from './../../helper';

export const AllTestList = [
  {
    title: 'Proximity',
    list: [
      { title: 'Wifi', icon: 'wifi', name: WIFI },
      { title: 'Bluetooth', icon: 'bluetooth', name: BLUETOOTH },
      { title: 'Proximity', icon: 'av-timer', name: PROXIMITY },
      { title: 'Mic & Speaker', icon: 'volume-up', name: MIC_RECORDING },
      { title: 'Sensors', icon: 'sensor-door', name: SENSORS },
    ],
  },
  {
    title: 'Buttons',
    list: [
      { title: 'Power Button', icon: 'power', name: 'PowerButton' },
      { title: 'Flip Switch', icon: 'flip', name: 'FlipSwitch' },
      { title: 'Volume Up Button', icon: 'volume-up', name: VOLUMEUP },
      {
        title: 'Volume Down Button',
        icon: 'volume-down',
        name: VOLUMEDOWN,
      },
    ],
  },
  {
    title: 'Vibration',
    list: [
      { title: 'Vibration', icon: 'vibration', name: VIBRATION },
      { title: 'Camera', icon: 'camera', name: CAMERA },
    ],
  },
  {
    title: 'Others',
    list: [
      { title: 'Specific Condition', icon: 'camera', name: SPECIFICCONDITION },
      { title: 'Brightness', icon: 'camera', name: BRIGHTNESS },
    ],
  },
];
