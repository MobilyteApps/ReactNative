import React, { FC } from 'react';
import Dialog from 'react-native-dialog';
import { useAppDispatch } from '../hooks';
import { addSystemInfo } from '../slices/Diagnostics';

export const Imei: React.FC<{ isPrompt: boolean }> = ({ isPrompt }) => {
  const dispatch = useAppDispatch();
  const [imei, setImei] = React.useState('');
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    setShow(isPrompt);
  }, [isPrompt]);

  const onCancel = () => {
    setShow(false);
  };
  const onSave = () => {
    dispatch(addSystemInfo({ name: 'IMEI', value: imei }));
    setShow(false);
  };
  return (
    <Dialog.Container visible={show}>
      <Dialog.Title>IMEI</Dialog.Title>
      <Dialog.Input onChangeText={text => setImei(text)} />
      <Dialog.Description>Please enter IMEI number.</Dialog.Description>
      <Dialog.Button label="Cancel" onPress={onCancel} />
      <Dialog.Button label="Save" onPress={onSave} />
    </Dialog.Container>
  );
};
