import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { DatePicker } from '@ionic-native/date-picker';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { AddItemModalPage } from '../pages/add-item-modal/add-item-modal';

import { MessageService } from "../services/message.service";
import { DbService } from "../services/db.service";
import { ItemsService } from "../services/items.service";

import { MomentFromNowPipe, MomentFormatPipe } from '../pipes/moment.pipe';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    AddItemModalPage,
    MomentFromNowPipe,
    MomentFormatPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    AddItemModalPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    DatePicker,
    MessageService,
    DbService,
    ItemsService,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
