import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';
import { MessageService } from "../../services/message.service";
import { DbService } from "../../services/db.service";
import { ItemsService } from "../../services/items.service";

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
    private messageService: MessageService,
    private dbService: DbService,
    private itemsService: ItemsService
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
    let name = this.itemName;
    let expiryDate = this.itemExpiryDate.substring(0, 10);
    this.dbService.storeItem(name, expiryDate).then(data => {
      // refresh item list
      this.dbService.getAllItems().then(data => {
        this.itemsService.items = data;
        this.viewCtrl.dismiss();
      });
    });

  }

  closeModal() {
    this.viewCtrl.dismiss();
  }

}
