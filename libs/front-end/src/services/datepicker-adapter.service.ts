import { Injectable } from '@angular/core';
import {
  NgbDateAdapter,
  NgbDateParserFormatter,
  NgbDateStruct,
} from '@ng-bootstrap/ng-bootstrap';

/**
 * This Service handles how the date is represented in scripts i.e. ngModel.
 */
@Injectable()
export class DatepickerAdapter extends NgbDateAdapter<Date> {
  fromModel(value: Date | null): NgbDateStruct | null {
    if (value) {
      return {
        day: value.getDate(),
        month: value.getMonth() + 1,
        year: value.getFullYear(),
      };
    }
    return null;
  }

  toModel(date: NgbDateStruct | null): Date | null {
    return date ? new Date(date.year, date.month - 1, date.day) : null;
  }
}

@Injectable()
export class DateParserFormatter extends NgbDateParserFormatter {
  readonly DELIMITER = '/';

  parse(value: string): NgbDateStruct | null {
    if (value) {
      const date = value.split(this.DELIMITER);
      return {
        day: parseInt(date[0], 10),
        month: parseInt(date[1], 10),
        year: parseInt(date[2], 10),
      };
    }
    return null;
  }

  format(date: NgbDateStruct | null): string {
    return date
      ? `${date.day}${this.DELIMITER}${date.month}${this.DELIMITER}${date.year}`
      : '';
  }
}
