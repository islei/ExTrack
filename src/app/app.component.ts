import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DbService } from '../services/db.service';
import { ItemsService } from '../services/items.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbService: DbService, itemsService: ItemsService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // init database
      dbService.init().then(
        d => {
          /*dbService.getAllItems().then(data => {
            itemsService.items = data;
          });*/
          itemsService.items = [{
            id: 1,
            name: 'Office Milk',
            expiryDate: new Date('2018-04-28'),
          },{
            id: 2,
            name: 'Home Milk',
            expiryDate: new Date('2018-04-18'),
          }];
        }
      );
    });
  }
}

