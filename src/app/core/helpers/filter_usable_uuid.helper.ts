import { BleService } from "@capacitor-community/bluetooth-le";

export class FilterUsableUuid {
  static filterUuid(bleService: BleService[]): { serviceUuid: string, characteristicUuid: string } | null {
    for (let service of bleService) {
      const characteristics = service.characteristics;
      const writableIndex: number = characteristics.findIndex(characteristic=>characteristic.properties.write);
      if (writableIndex > -1) {
        return {
          serviceUuid: service.uuid,
          characteristicUuid: characteristics[writableIndex].uuid
        }
      }
    }
    return null;
  }
}