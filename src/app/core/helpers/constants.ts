// Local storage keys
export const LOCAL_STORAGE_KEY = {
  BLUETOOTH_DEVICE_ID: 'bluetooth_device_id',
  BLUETOOTH_Service_UUID: 'bluetooth_service_uuid',
  BLUETOOTH_CHARACTERISTIC_UUID: 'bluetooth_characteristic_uuid'
};

// Toastr colors
export enum TOASTR_COLOR {
  SUCCESS = 'success',
  ERROR = 'error',
  WARNING = 'warning',
  INFO = 'info'
};

export type TToastColor = `${TOASTR_COLOR}`;

//Làm sao để viết được type color như trên