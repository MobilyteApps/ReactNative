import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements';
import { WORKING, NOTWORKING } from '../../helper';

export const TestActionButton: React.FC<{
  handleButtonClick: any;
}> = ({ handleButtonClick }) => {
  return (
    <View style={styles.container}>
      <Button
        title="Yes"
        buttonStyle={[styles.button, { backgroundColor: 'green' }]}
        onPress={() => handleButtonClick(WORKING)}
      />
      <Button
        title="No"
        buttonStyle={[styles.button, { backgroundColor: 'red' }]}
        onPress={() => handleButtonClick(NOTWORKING)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'nowrap',
    alignSelf: 'center',
    width: '90%',
  },
  button: {
    width: '90%',
  },
});
