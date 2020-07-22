import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'masmas'
})
export class MasmasPipe implements PipeTransform {

  transform(value: number, add: number = 1): number {    
    return value + add;
  }

}