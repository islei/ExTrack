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
          // for production
          /*dbService.getAllItems().then(data => {
            itemsService.items = data;
          });*/
          // for testing in browser
          itemsService.items = [{
            id: 1,
            name: 'Office Milk',
            expiryDate: new Date('2018-04-28'),
            status: 'Expires soon',
          },{
            id: 2,
            name: 'Home Milk',
            expiryDate: new Date('2017-04-18'),
            status: 'Expired',
          },{
            id: 1,
            name: 'Office Milk 2',
            expiryDate: new Date('2018-04-30'),
            status: 'Expires',
          }];
        }
      );
    });
  }
}

