import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonItem, IonList, IonLabel, IonInput } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms'; // Import FormsModule

import { BluetoothOperationsService } from '../service/bluetooth-operations.service';
import { DatePipe } from '@angular/common';
import { StorageClientService } from '../service/storage-client.service';
import { LOCAL_STORAGE_KEY } from '../core/helpers/constants';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [FormsModule, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonItem, IonList, IonLabel, IonInput],
  providers: [DatePipe, StorageClientService, BluetoothOperationsService]
})
export class Tab1Page {
  macAddress = 'DC:0D:30:E2:DA:D9';
  constructor(
    private platform: Platform,
    private storageClientService: StorageClientService,
    private bluetoothOperationsService: BluetoothOperationsService,
    private datePipe: DatePipe
  ) {}

  ionViewDidEnter() {
    this.bluetoothOperationsService.Scan();
  }

  async print() {
    const deviceId = await this.storageClientService.get(LOCAL_STORAGE_KEY.BLUETOOTH_DEVICE_ID);
    const serviceUuid = await this.storageClientService.get(LOCAL_STORAGE_KEY.BLUETOOTH_Service_UUID);
    const characteristicUuid = await this.storageClientService.get(LOCAL_STORAGE_KEY.BLUETOOTH_CHARACTERISTIC_UUID);
    if (deviceId && serviceUuid && characteristicUuid) {
      try {
        await this.sendPrintCommand(deviceId, serviceUuid, characteristicUuid);
      } catch (error) {
        console.log('Error while printing');
        console.error(error);
        this.bluetoothOperationsService.Disconnect(deviceId);
      }
    }else{
      console.log('Please connect to printer first');
    }
  }

  private async sendPrintCommand(deviceId: string, serviceUuid: string, characteristicUuid: string) {
    //When user clicks on print button we should connect to printer and print as per our requirement
    await this.bluetoothOperationsService.Connect(deviceId);
    await this.bluetoothOperationsService.TurnOnBold(deviceId, serviceUuid, characteristicUuid);
    await this.bluetoothOperationsService.FeedCenter(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothOperationsService.WriteData(deviceId, serviceUuid, characteristicUuid, 'something name');
    await this.bluetoothOperationsService.UnderLine(deviceId, serviceUuid, characteristicUuid);
    await this.bluetoothOperationsService.TurnOffBold(deviceId, serviceUuid, characteristicUuid);
    await this.bluetoothOperationsService.FeedRight(deviceId, serviceUuid, characteristicUuid);

    const currentDate: string = this.datePipe.transform(new Date(), "dd/MM/yyyy hh:mm") as string;
    await this.bluetoothOperationsService.WriteData(deviceId, serviceUuid, characteristicUuid, currentDate);

    await this.bluetoothOperationsService.FeedLeft(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothOperationsService.NewEmptyLine(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothOperationsService.FeedCenter(deviceId, serviceUuid, characteristicUuid);
    await this.bluetoothOperationsService.WriteData(deviceId, serviceUuid, characteristicUuid, "Please Collect after one hour.");
    await this.bluetoothOperationsService.WriteData(deviceId, serviceUuid, characteristicUuid, "---Thank you---");
    await this.bluetoothOperationsService.FeedLeft(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothOperationsService.NewEmptyLine(deviceId, serviceUuid, characteristicUuid);

    await this.bluetoothOperationsService.Disconnect(deviceId);
  }
}
