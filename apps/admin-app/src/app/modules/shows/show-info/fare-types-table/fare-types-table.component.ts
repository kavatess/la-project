import { Component, Input } from '@angular/core';
import { FareType } from '@libs/models';

@Component({
  selector: 'la-project-fare-types-table',
  templateUrl: './fare-types-table.component.html',
  styleUrls: ['./fare-types-table.component.scss'],
})
export class FareTypesTableComponent {
  @Input()
  fareTypeList: FareType[] = [];
}
