import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'twoDigits' })
export class TwoDigitsPipe implements PipeTransform {
    transform(value: number): string {
        let str = value.toString();
        return ('0' + str).slice(-2);
    }
}