import React from 'react';
import { Header } from 'react-native-elements';

export const AppHeader = () => (
  <Header
    backgroundColor={'#fff'}
    centerComponent={{ text: 'Phone Check', style: { color: '#000' } }}
  />
);
