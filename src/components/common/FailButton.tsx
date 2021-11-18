import React from 'react';
import { Button } from 'react-native-elements';

export const FailButton = (props:any) => (
    <Button title="FAIL"
        type="solid"
        disabled={props.disable}
        onPress={props.onPress}
        buttonStyle={{ backgroundColor: 'red', width: 100 }}
        titleStyle={{ fontWeight: 'bold' }}
    />
);
