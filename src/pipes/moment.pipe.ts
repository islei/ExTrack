import { Pipe, PipeTransform } from '@angular/core';
import moment from "moment";

@Pipe({name: 'momentFromNow'})

export class MomentFromNowPipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    if (!value) return value;

    return moment(value, "YYYY-MM-DD").fromNow();
  }
}
