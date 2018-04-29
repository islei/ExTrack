import { Injectable } from "@angular/core";
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbService {

  public db;

  constructor(private sqlite: SQLite) {

  }

  init() {
    return this.sqlite.create({
      name: 'data.db',
      location: 'default'
    }).then((db: SQLiteObject) => {
      this.db = db;
      this.createTables();
    }).catch(e => console.log(e));
  }

  createTables() {
    this.db.executeSql('CREATE TABLE items(id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(200), expiry_date TEXT)', {});
  }

  getAllItems() {
    return this.db.executeSql("SELECT * FROM items ORDER BY date(expiry_date)", [])
  }

  storeItem(name, expiry_date) {
    return this.db.executeSql("INSERT INTO items(name, expiry_date) VALUES (?, ?);", [name, expiry_date]);
  }

  updateItem(id, name, expiry_date) {
    return this.db.executeSql("UPDATE item SET name = ?, expiry_date = ? WHERE id = ?;", [name, expiry_date, id]);
  }

  deleteItem(id) {
    return this.db.executeSql("DELETE FROM items WHERE id = ?;", [id]);
  }

}
