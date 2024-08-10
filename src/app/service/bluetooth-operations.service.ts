import { Injectable, OnDestroy } from '@angular/core';
import { BleClient, BleService, textToDataView } from '@capacitor-community/bluetooth-le';
import { StorageClientService } from './storage-client.service';
import { ToastService } from './toastr.service';
import { LOCAL_STORAGE_KEY, TOASTR_COLOR } from '../core/helpers/constants';
import { FilterUsableUuid } from '../core/helpers/filter_usable_uuid.helper';

@Injectable({
  providedIn: 'root'
})
export class BluetoothOperationsService implements OnDestroy {
  constructor(
    private storageClientService: StorageClientService,
    private toastrService: ToastService
  ) { }

  async Initialize() {
    await BleClient.initialize({ androidNeverForLocation: true });
  }

  async Connect(deviceId: string) {
    await BleClient.connect(deviceId);
  }

  async Disconnect(deviceId: string) {
    await BleClient.disconnect(deviceId);
  }

  async VerifyAndEnabled() {
    if (!await BleClient.isEnabled()) {
      await BleClient.enable();
    }
  }

  async Scan() {
    await this.Initialize();
    await this.VerifyAndEnabled();
    let bleDevice = await BleClient.requestDevice({ allowDuplicates: false });
    if (bleDevice) {
      await BleClient.connect(bleDevice.deviceId, this.Disconnect);
      this.toastrService.showToastr('Connected', TOASTR_COLOR.SUCCESS);
      await this.storageClientService.set(LOCAL_STORAGE_KEY.BLUETOOTH_DEVICE_ID, bleDevice.deviceId);

      await this.AssignServices();
    }
  }

  async AssignServices() {
    const deviceId = await this.storageClientService.get(LOCAL_STORAGE_KEY.BLUETOOTH_DEVICE_ID);
    let bleService: BleService[] = await BleClient.getServices(deviceId);
    const usableUuid = FilterUsableUuid.filterUuid(bleService);

    if (usableUuid) {
      this.storageClientService.set(LOCAL_STORAGE_KEY.BLUETOOTH_Service_UUID, usableUuid.serviceUuid);
      this.storageClientService.set(LOCAL_STORAGE_KEY.BLUETOOTH_CHARACTERISTIC_UUID, usableUuid.characteristicUuid);
    }
  }


  async LineFeed(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView((new Uint8Array([10])).buffer));
  }

  async TurnOnBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const boldOn = new Uint8Array([27, 69, 1]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOn.buffer));
  }

  async TurnOffBold(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const boldOff = new Uint8Array([27, 69, 0]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(boldOff.buffer));
  }

  async FeedLeft(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const left = new Uint8Array([27, 97, 0]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(left.buffer));
  }

  async FeedCenter(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const center = new Uint8Array([27, 97, 1]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(center.buffer));
  }

  async FeedRight(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    const right = new Uint8Array([27, 97, 2]);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, new DataView(right.buffer));
  }

  async WriteData(deviceId: string, serviceUuid: string, characteristicUuid: string, text: string) {
    await this.LineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(text));
  }

  async UnderLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await this.LineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView('-'.repeat(30)));
  }

  async NewEmptyLine(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    await this.LineFeed(deviceId, serviceUuid, characteristicUuid);
    await BleClient.write(deviceId, serviceUuid, characteristicUuid, textToDataView(`${' '.repeat(18)}\n`));
  }

  ngOnDestroy(): void {
  }
}