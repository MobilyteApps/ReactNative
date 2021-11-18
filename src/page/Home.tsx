import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Text } from 'react-native-elements';

import { AllTestList, List } from '../components/home';
import { HomelistInterface, HomeListHeader } from '../interfaces';
import {
  ACCELEROMETER,
  BENTFRAME,
  MOTION,
  NO,
  NOTWORKING,
  SENSORS,
  SPECIFICCONDITION,
  STEPS,
  TOUCHIC,
  WATERDAMAGE,
  WORKING,
} from './../helper/index';
import { useDeviceInfo, useAppDispatch, useAppSelector } from '../hooks';
import { setSystemInfo } from '../slices/Diagnostics';
import { Imei } from '../components/Imei';

const Home: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const deviceInfo = useDeviceInfo();
  const dispatch = useAppDispatch();

  const [isDiagnosticStart, setIsDiagnosticStart] = React.useState(false);
  const [isPrompt, setisPrompt] = React.useState(false);

  const digData = useAppSelector(state => state.diagnostics);
  const { step, data } = digData;

  React.useEffect(() => {
    dispatch(setSystemInfo(deviceInfo));
  }, [deviceInfo, dispatch]);

  React.useEffect(() => {
    if (digData.systemInfo.IMEI === undefined) {
      setisPrompt(true);
    }
    if (isDiagnosticStart && step > 0 && step < STEPS.length) {
      setTimeout(() => {
        goToDiagnosticsPage(STEPS[step]);
      }, 1000);
    }
    if (isDiagnosticStart && step === STEPS.length) {
      setIsDiagnosticStart(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [digData, isDiagnosticStart, step]);

  const goToDiagnosticsPage = (page: string) => {
    navigation.navigate(page);
  };

  function startDiagnostic() {
    setIsDiagnosticStart(true);
    goToDiagnosticsPage('Wifi');
  }

  function getDiagnosticsRes(field: string): string {
    switch (field) {
      case SENSORS:
        return data[ACCELEROMETER] === WORKING && data[MOTION] === WORKING
          ? WORKING
          : NOTWORKING;
      case SPECIFICCONDITION:
        return data[WATERDAMAGE] === NO &&
          data[BENTFRAME] === NO &&
          data[TOUCHIC] === NO
          ? WORKING
          : NOTWORKING;
      default:
        return data[field];
    }
  }
  //console.log(JSON.stringify(data, null, 4))

  return (
    <ScrollView>
      <View style={styles.beginButtonHolder}>
        <Button title="Beginss" onPress={startDiagnostic} />
      </View>
      <Imei isPrompt={isPrompt} />
      <View>
        {AllTestList.map((item: HomeListHeader, i) => (
          <View key={i}>
            <Text style={styles.listTitle} h4>
              {item.title}
            </Text>
            {item.list.map((l: HomelistInterface, index: number) => (
              <List
                key={index}
                item={l}
                diagnosticStart={isDiagnosticStart}
                navigate={goToDiagnosticsPage}
                isWorking={getDiagnosticsRes(l.name)}
              />
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  beginButtonHolder: {
    padding: 20,
  },
  listTitle: {
    height: 40,
    marginTop: 10,
    textAlign: 'center',
  },
});

export default Home;
