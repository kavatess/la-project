import { Component } from '@angular/core';
import { ShowProperties } from '@libs/models';

@Component({
  selector: 'la-project-create-show',
  templateUrl: './create-show.component.html',
  styleUrls: ['./create-show.component.scss'],
})
export class CreateShowComponent {
  disabledControls = [ShowProperties.status];
}
