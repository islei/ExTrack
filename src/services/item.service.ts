import { Injectable } from "@angular/core";

@Injectable()
export class ItemService {

  public items: any[] = [];

  constructor() {

  }

  data2items(data:any) {
    let items = [];
    for (var i = 0; i < data.rows.length; i++) {
      let expiryDate = new Date(data.rows.item(i).expiry_date);
      let status = this.getItemStatus(expiryDate);
      items.push({id: data.rows.item(i).id, name: data.rows.item(i).name, expiryDate: expiryDate, status: status});
    }
    return items;
  }

  getItemStatus(expiryDate:Date) {
    let d = new Date();
    let status = '';
    if (d.getTime() >= expiryDate.getTime()) {
      status = 'Expired';
    } else if (d.getTime() + (2* 24 * 60 * 60 * 1000) >= expiryDate.getTime()) {
      status = 'Expires soon';
    } else {
      status = 'Expires';
    }
    return status;
  }


}
