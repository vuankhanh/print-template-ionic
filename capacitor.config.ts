import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'io.ionic.starter',
  appName: 'print-template-ionic',
  webDir: 'www',
  plugins: {
    "AndroidPermissions": {
      "permissions": [
        "android.permission.BLUETOOTH",
        "android.permission.BLUETOOTH_ADMIN",
        "android.permission.BLUETOOTH_CONNECT",
        "android.permission.ACCESS_COARSE_LOCATION",
        "android.permission.INTERNET"
      ]
    },
    "BluetoothLe": {
      "displayStrings": {
        "scanning": "Scanning...",
        "cancel": "Cancel",
        "availableDevices": "Available Devices",
        "noDeviceFound": "No Device Found",
        "connecting": "Connecting...",
        "connected": "Connected",
        "disconnect": "Disconnect",
        "disconnected": "Disconnected"
      }
    }
  }
};

export default config;
