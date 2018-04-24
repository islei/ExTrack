import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';
import { MessageService } from './message.service';

@Injectable()
export class DbService {

  public db;

  constructor(private sqlite: SQLite, private messageService: MessageService) {

  }

  // sqlfiddle http://sqlfiddle.com/#!7/fe7de/2

  init() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
    })
      .catch(e => console.log(e));
  }

  private createTables() {
    this.db.executeSql('CREATE TABLE items(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(200), expiry_date TEXT)', {})
      .then(() => {

      })
      .catch(e => console.log(e));
  }

  getAllItems() {
    return this.db.executeSql("SELECT * FROM items", []).then((data) => {
      let items = [];
      if (data.rows.length > 0) {
        for (var i = 0; i < data.rows.length; i++) {
          items.push({id: data.rows.item(i).id, name: data.rows.item(i).name, expiryDate: data.rows.item(i).expiry_date});
        }
      }
      return items;
    }, error => {
      this.messageService.show('Error1: ' + error);
      return [];
    });
  }

  storeItem(name, expiry_date) {
    return this.db.executeSql("INSERT INTO items(name, expiry_date) VALUES (?, ?);", [name, expiry_date]).then(
      (data) => {
        this.messageService.show('Item added successfully');
      }, error => {
        this.messageService.show('Error: ' + error);
      });
  }

  updateItem(id, name, expiry_date) {
    return this.db.executeSql("UPDATE item SET name = ?, expiry_date = ? WHERE id = ?;", [name, expiry_date, id]).then(
      (data) => {
        this.messageService.show('Item updated successfully');
      }, error => {
        this.messageService.show('Error: ' + error);
      });
  }

  deleteItem(id) {
    return this.db.executeSql("DELETE FROM items WHERE id = ?;", [id]).then(
      (data) => {
        this.messageService.show('Item deleted successfully');
      }, error => {
        this.messageService.show('Error: ' + error);
      });
  }

}
