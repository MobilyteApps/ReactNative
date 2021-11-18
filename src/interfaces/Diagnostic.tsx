export interface Diagnostic {
  data: {
    Wifi: string;
    Bluetooth: string;
    ProximitySensor: string;
    VolumeUp: string;
    VolumeDown: string;
    SpecificCondition: string;
  };
  step: number;
  systemInfo: {};
}