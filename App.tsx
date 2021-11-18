/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import React from 'react';
 import { useColorScheme } from 'react-native';
 
 import { Colors } from 'react-native/Libraries/NewAppScreen';
 import { NavigationContainer } from '@react-navigation/native';
 import { createNativeStackNavigator } from '@react-navigation/native-stack';
 import { Provider } from 'react-redux';
 import Home from './src/page';
 import { store } from './src/store';
 import {
   Wifi,
   ProximitySensor,
   Bluetooth,
   Camera,
   VolumeUp,
   VolumeDown,
   VibrationPage,
   SpecificCondition,
   Brightness,
   Sensor,
 } from './src/page/diagnostics';
 import {
   VIBRATION,
   VOLUMEUP,
   MIC_RECORDING,
   VOLUMEDOWN,
   SPECIFICCONDITION,
   BRIGHTNESS,
   TOUCH,
   SENSORS,
 } from './src/helper';
 import { MicRecording } from './src/page/diagnostics/MicRecording';
 import Touch from './src/page/diagnostics/Touch';
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
   };
   const Stack = createNativeStackNavigator();
 
   return (
     <Provider store={store}>
       <NavigationContainer>
         <Stack.Navigator>
           <Stack.Screen name="Home" component={Home} />
           <Stack.Screen name="Wifi" component={Wifi} />
           <Stack.Screen name="Proximity" component={ProximitySensor} />
           <Stack.Screen name="Bluetooth" component={Bluetooth} />
           <Stack.Screen name="Camera" component={Camera} />
           <Stack.Screen
             name={VOLUMEUP}
             component={VolumeUp}
             options={{ title: 'Volume Up' }}
           />
           <Stack.Screen
             name={VOLUMEDOWN}
             component={VolumeDown}
             options={{ title: 'Volume Down' }}
           />
           <Stack.Screen
             name={VIBRATION}
             component={VibrationPage}
             options={{ title: 'Vibration' }}
           />
           <Stack.Screen
             name={MIC_RECORDING}
             component={MicRecording}
             options={{ title: 'Mic & Speaker' }}
           />
           <Stack.Screen
             name={SPECIFICCONDITION}
             component={SpecificCondition}
             options={{ title: 'Specific Condition' }}
           />
           <Stack.Screen name={BRIGHTNESS} component={Brightness} />
           <Stack.Screen name={TOUCH} component={Touch} />
           <Stack.Screen name={SENSORS} component={Sensor} />
         </Stack.Navigator>
       </NavigationContainer>
     </Provider>
   );
 };
 
 export default App;
 