import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'firebaseDate',
  standalone: true
})
export class FirebaseDatePipe implements PipeTransform {
  transform(value: any): Date | null {
    if (value?.seconds) {
      return new Date(value.seconds * 1000);
    } else if (typeof value?.toDate === 'function') {
      return value.toDate();
    }

    return null;
  }
}
