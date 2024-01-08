import { Component, Input } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Section, SectionProperties } from '@libs/models';

@Component({
  selector: 'la-project-seat-map',
  templateUrl: './seat-map.component.html',
  styleUrls: ['./seat-map.component.scss'],
})
export class SeatMapComponent {
  @Input()
  section: Section = null;

  readonly SectionProperties = SectionProperties;
  readonly sectionForm = this.fb.group({
    [SectionProperties.title]: this.fb.control(null, [Validators.required]),
    [SectionProperties.maxRow]: this.fb.control(10, [Validators.required]),
    [SectionProperties.maxCol]: this.fb.control(10, [Validators.required]),
    [SectionProperties.seatNumber]: this.fb.control(100, [Validators.required]),
    [SectionProperties.index]: this.fb.control(null, []),
  } as Record<keyof Section, FormControl>);

  constructor(private readonly fb: FormBuilder) {}

  // removeSection(event: MouseEvent, index: number) {
  //   event.preventDefault();
  //   event.stopImmediatePropagation();
  //   if (window.confirm('Bạn có chắc chắn muốn xóa item này?')) {
  //     this.sections = this.sections.filter((val, i) => i !== index);
  //   }
  // }
}
