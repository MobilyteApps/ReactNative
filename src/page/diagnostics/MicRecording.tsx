import React from 'react';
import Recording from '../../components/Recording';
import { MIC_RECORDING } from '../../helper';
import { useAppDispatch } from '../../hooks';
import { add } from '../../slices/Diagnostics';

export const MicRecording: React.FC<{ navigation: any }> = ({ navigation }) => {
  const dispatch = useAppDispatch();
  const MODULE = MIC_RECORDING;
  const STEP = 4;

  const handleButtonClick = (value: string) => {
    dispatch(add({ name: MODULE, value: value, step: STEP }));
    navigation.navigate('Home');
  };
  return <Recording handleButtonClick={handleButtonClick} />;
};
