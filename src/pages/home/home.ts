import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { AddItemModalPage } from '../add-item-modal/add-item-modal';
import { ItemService } from "../../services/item.service";
import { DbService } from "../../services/db.service";
import { MessageService } from "../../services/message.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, private localNotifications: LocalNotifications, private itemService: ItemService, private dbService: DbService, private messageService: MessageService) {
  }

  openAddItemModal() {
    let modal = this.modalCtrl.create(AddItemModalPage);
    modal.present();
  }

  editItem(item){

  }

  deleteItem(item) {
    let id = item.id;
    this.dbService.deleteItem(id).then(
      data => {
      this.messageService.show('Item deleted successfully');
      // refresh available server list
      this.dbService.getAllItems().then(data => {
        let items = this.itemService.data2items(data);
        this.itemService.items = items;
      });
      // cancel notification
      this.localNotifications.cancel(id);
    },
      error => {
      this.messageService.show('Error: ' + error);
    });
  }
}
