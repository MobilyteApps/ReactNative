import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-elements';
import {
  accelerometer,
  gyroscope,
  setUpdateIntervalForType,
  SensorTypes,
} from 'react-native-sensors';
import { map, filter } from 'rxjs/operators';
import { TestActionButton } from '../../components/common/TestActionButton';
import { MOTION, SENSORS, ACCELEROMETER } from '../../helper';
import { useAppDispatch } from '../../hooks/useToolkit';
import { Position } from '../../interfaces';
import { add } from '../../slices/Diagnostics';

export const Sensor: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const MODULE = SENSORS;
  const STEP = 5;

  const [speed, setSpeed] = React.useState(0);
  const [position, setPosition] = React.useState({} as Position);
  const [getBothRes, setBothRes] = React.useState({
    [ACCELEROMETER]: false,
    [MOTION]: false,
  });
  setUpdateIntervalForType(SensorTypes.accelerometer, 1000);
  setUpdateIntervalForType(SensorTypes.gyroscope, 1000);

  React.useEffect(() => {
    const accelerometerSubscription = accelerometer
      .pipe(
        map(({ x, y, z }) => x + y + z),
        filter(speed => speed > 5),
      )
      .subscribe(
        speed => setSpeed(speed),
        error => console.log('The sensor is not available', error),
      );

    const gyroscopeSubscription = gyroscope.subscribe(res => setPosition(res));

    return () => {
      accelerometerSubscription.unsubscribe();
      gyroscopeSubscription.unsubscribe();
    };
  }, []);

  React.useEffect(() => {
    if (getBothRes[ACCELEROMETER] && getBothRes[MOTION]) {
      navigation.navigate('Home');
    }
  }, [getBothRes]);

  const handleButtonClick = (test: string) => (value: string) => {
    setBothRes({ ...getBothRes, [test]: true });
    dispatch(add({ name: test, value: value, step: STEP }));
  };

  return (
    <View style={styles.container}>
      <View style={styles.resGroup}>
        <Text h4>Please move the device for accelerometer test.</Text>
        <View style={styles.accResult}>
          <Text style={styles.accResText}>{speed}</Text>
        </View>
        <Text style={styles.question}>
          Is accelerometer result is updating?
        </Text>
        <TestActionButton
          handleButtonClick={handleButtonClick(ACCELEROMETER)}
        />
      </View>
      <View style={styles.resGroup}>
        <Text h4>Device position.</Text>
        <View style={styles.accResult}>
          <View style={styles.positionRes}>
            <Text>X: {position.x}</Text>
            <Text>Y: {position.y}</Text>
            <Text>Z: {position.z}</Text>
          </View>
        </View>
      </View>
      <Text style={styles.question}>Is device position is updating?</Text>
      <TestActionButton handleButtonClick={handleButtonClick(MOTION)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    width: '90%',
  },
  resGroup: {
    marginTop: 15,
  },
  accResult: {
    alignSelf: 'center',
  },
  accResText: {
    padding: 10,
    fontSize: 19,
  },
  positionRes: {
    marginTop: 20,
    marginBottom: 20,
    display: 'flex',
    flexDirection: 'column',
  },
  postionText: {
    width: '80%',
    borderWidth: 1,
  },
  question: {
    fontSize: 17,
    padding: 10,
    color: 'red',
  },
});
