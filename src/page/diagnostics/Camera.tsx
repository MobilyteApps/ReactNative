import React, { useEffect } from 'react';
import { useState } from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';
import { RNCamera } from 'react-native-camera';
import { useCamera } from 'react-native-camera-hooks';
import { Text } from 'react-native-elements';
import { TestActionButton } from '../../components/common/TestActionButton';
import { CAMERA } from '../../helper';
import { useAppDispatch } from '../../hooks';
import { add } from '../../slices/Diagnostics';

const initialValues = {
  type: 'back',
  isRecording: false,
};

export const Camera: React.FC<{
  navigation: any;
}> = ({ navigation }) => {
  const [
    { cameraRef, type, isRecording },
    { recordVideo, setIsRecording, toggleFacing, takePicture },
  ] = useCamera(initialValues);
  const MODULE = CAMERA;
  const STEP = 9;

  const [backImage, setBackCameraImage] = useState('');
  const [frontImage, setFrontCameraImage] = useState('');
  const [taken, setImage] = useState(false);
  const dispatch = useAppDispatch();

  const handleButtonClick = (value: string) => {
    dispatch(add({ name: MODULE, value: value, step: STEP }));
    navigation.navigate('Home');
  };

  const capture = async () => {
    try {
      setTimeout(async () => {
        const data = await takePicture();
        if (type == 'back') {
          setBackCameraImage(data.uri);
          toggleFacing();
        } else {
          setFrontCameraImage(data.uri);
          setImage(true);
        }
      }, 5000);
    } catch (error) {
      console.warn(error);
    } finally {
    }
  };

  useEffect(() => {
    switch (type) {
      case 'back':
        capture();
        break;
      case 'front':
        capture();
        break;
      default:
        break;
    }
  }, [type]);

  return (
    <View style={styles.container}>
      {taken == false ? (
        <RNCamera
          ref={cameraRef}
          captureAudio={false}
          style={{ flex: 1 }}
          type={type}
        />
      ) : (
        <View style={{ flex: 1, height: '80%' }}>
          <ImageBackground
            source={{ uri: backImage }}
            style={styles.imageStyle}>
            <View style={styles.overlayShadow} />
          </ImageBackground>
          <ImageBackground
            source={{ uri: frontImage }}
            style={styles.imageStyle}
          />
          <Text h4 style={{ alignSelf: 'center' }}>
            Is camera working?
          </Text>
          <TestActionButton handleButtonClick={handleButtonClick} />
        </View>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    flex: 1,
    width: '100%',
  },
  imageStyle: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: '#fff',
  },
  overlayShadow: {
    height: '40%',
    width: '60%',
    alignSelf: 'center',
    marginTop: 100,
    shadowColor: '#fff',
    shadowOffset: {
      width: 12,
      height: 12,
    },
    shadowOpacity: 2,
    shadowRadius: 20,
    elevation: 24,
  },
  failButtonContainer: {
    padding: 30,
    alignSelf: 'center',
  },
});
