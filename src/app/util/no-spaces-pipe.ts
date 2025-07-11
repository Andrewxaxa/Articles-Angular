import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'noSpaces',
})
export class NoSpacesPipe implements PipeTransform {
  transform(value: string): string {
    return value.toLocaleLowerCase().replace(/\s+/g, '-');
  }
}
