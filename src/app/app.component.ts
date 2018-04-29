import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { DbService } from '../services/db.service';
import { ItemService } from '../services/item.service'

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = HomePage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, dbService: DbService, itemService: ItemService) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      statusBar.styleDefault();
      splashScreen.hide();
      // init database
      dbService.init().then(
        d => {
          // for production
          dbService.getAllItems().then(data => {
            let items = itemService.data2items(data);
            itemService.items = items;
          });
          // for testing in browser
          /*itemService.items = [{
            id: 1,
            name: 'Office Milk Long long name my app',
            expiryDate: new Date('2017-12-1'),
            status: 'Expires soon',
          },{
            id: 2,
            name: 'Home Brand Chicken Wings 120 g',
            expiryDate: new Date('2017-04-18'),
            status: 'Expired',
          },{
            id: 1,
            name: 'Office Milk 2',
            expiryDate: new Date('2018-11-30'),
            status: 'Expires',
          }];*/
        }
      );
    });
  }
}

