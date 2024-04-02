import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FareType, Section, SectionProperties } from '@libs/models';

enum SeatMapViewModes {
  Create = 'Create',
  Update = 'Update',
}

@Component({
  selector: 'la-project-seat-map-manager',
  templateUrl: './seat-map-manager.component.html',
  styleUrls: ['./seat-map-manager.component.scss'],
})
export class SeatMapManagerComponent {
  @Input()
  sections: Section[] = [];
  @Input()
  selectedSection: Section = null;
  @Input()
  fareTypes: FareType[] = [];
  @Output()
  sectionChange = new EventEmitter();

  readonly SectionProperties = SectionProperties;
  readonly SeatMapViewModes = SeatMapViewModes;
  readonly selectedSectionCtrl = new FormControl(null);

  viewMode: SeatMapViewModes = SeatMapViewModes.Update;

  createBtnOnClick(event: MouseEvent) {
    this.viewMode = SeatMapViewModes.Create;
    event.preventDefault();
  }

  onSectionChange(event: Event) {
    // console.log((event.target as HTMLSelectElement).value);
    this.sectionChange.emit((event.target as HTMLSelectElement).value);
  }
}
