import { Component } from '@angular/core';
import { NavController, ModalController, Platform } from 'ionic-angular';
import { AddItemModalPage } from '../add-item-modal/add-item-modal';
import { ItemsService } from "../../services/items.service";
import { DbService } from "../../services/db.service";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  nowDate: Date = new Date();

  constructor(public navCtrl: NavController, public modalCtrl: ModalController, public platform: Platform, private itemsService: ItemsService, private dbService: DbService) {
    this.platform.ready().then((readySource) => {
      console.log(this.nowDate);
    });
  }

  openAddItemModal() {
    let modal = this.modalCtrl.create(AddItemModalPage);
    modal.present();
  }

  editItem(item){

  }

  deleteItem(item) {
    let id = item.id;
    this.dbService.deleteItem(id).then(data => {
      // refresh available server list
      this.dbService.getAllItems().then(data => {
        this.itemsService.items = data;
      });
    });
  }
}
