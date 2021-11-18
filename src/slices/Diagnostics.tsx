import { createSlice } from '@reduxjs/toolkit';
import { Diagnostic } from '../interfaces';
import type { RootState } from './../store';

const initialState: Diagnostic = {
  data: {
    Wifi: '',
    Bluetooth: '',
    ProximitySensor: '',
    VolumeUp: '',
    VolumeDown: '',
    SpecificCondition: '',
  },
  step: 0,
  systemInfo: {},
};

export const diagnosticSlice = createSlice({
  name: 'diagnostics',
  initialState,
  reducers: {
    add: (state, action) => {
      const {
        payload: { name, value, step },
      } = action;
      return {
        ...state,
        data: { ...state.data, [name]: value },
        step: step,
      };
    },

    setSystemInfo: (state, action) => {
      const { payload } = action;
      return {
        ...state,
        systemInfo: payload,
      };
    },

    addSystemInfo: (state, action) => {
      const {
        payload: { name, value },
      } = action;
      return {
        ...state,
        systemInfo: { ...state.systemInfo, [name]: value },
      };
    },
  },
});

export const { add, setSystemInfo, addSystemInfo } = diagnosticSlice.actions;

export const diagnosticData = (state: RootState) => state.diagnostics;

export default diagnosticSlice.reducer;
