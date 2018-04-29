import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { MessageService } from "../../services/message.service";
import { DbService } from "../../services/db.service";
import { ItemService } from "../../services/item.service";

/**
 * Generated class for the AddItemModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-add-item-modal',
  templateUrl: 'add-item-modal.html',
})
export class AddItemModalPage {

  public itemName: string = '';
  public itemExpiryDate: string = new Date().toISOString();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    private datePicker: DatePicker,
    private localNotifications: LocalNotifications,
    private messageService: MessageService,
    private dbService: DbService,
    private itemService: ItemService
  ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddItemModalPage');
  }

  addItem() {
    if (!this.itemName) {
      this.messageService.show('The item name field is required.');
    }
    if (!this.itemExpiryDate) {
      this.messageService.show('The item expiry date is required');
    }
    let itemName = this.itemName;
    let itemExpiryDate = this.itemExpiryDate;
    // Save to db
    this.dbService.storeItem(itemName, itemExpiryDate.substring(0, 10)).then(
      data => {
      this.messageService.show('Item added successfully');
      // Schedule delayed notification
      let notificationId = data.insertId;
      let notificationText = this.getNotificationText(itemName, itemExpiryDate);
      let notificationDate = this.getNotificationDate(itemExpiryDate);
      this.scheduleNotification(notificationId, notificationText, notificationDate);
      // refresh item list
      this.dbService.getAllItems().then((data) => {
        let items = this.itemService.data2items(data);
        this.itemService.items = items;
        this.viewCtrl.dismiss();
      });
    },
      error =>{
      this.messageService.show('Error: ' + error);
    });
  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

  private getNotificationText(itemName:string, itemExpiryDate:string) {
    return itemName + ' is expiring soon on ' + itemExpiryDate.substring(0, 10);
  }

  private getNotificationDate(itemExpiryDate:string) {
    let expiryDate = new Date(itemExpiryDate).getTime();
    let notificationDate = new Date( expiryDate - 2 * 24 * 60 * 60 * 1000);
    return notificationDate;
  }

  private scheduleNotification(notificationId:number, notificationText:string, notificationDate:Date) {
    this.localNotifications.schedule({
      id: notificationId,
      text: notificationText,
      trigger: {at: notificationDate},
      led: 'FF0000',
      vibrate: true,
      sound: null
    });
  }

}
