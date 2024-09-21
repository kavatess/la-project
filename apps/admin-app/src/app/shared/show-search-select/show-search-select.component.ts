/* eslint-disable @typescript-eslint/no-unused-vars */
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchSelectModule } from '@libs/front-end';
import { ShowsService } from '../../modules/shows/shows.service';
import { Show } from '@libs/models';
import { of } from 'rxjs';

@Component({
  selector: 'la-project-show-search-select',
  standalone: true,
  imports: [CommonModule, SearchSelectModule],
  templateUrl: './show-search-select.component.html',
  styleUrls: ['./show-search-select.component.scss'],
  providers: [ShowsService],
})
export class ShowSearchSelectComponent {
  @Input()
  multiple = false;

  constructor(private readonly showsService: ShowsService) {}

  findShow = (showIds: string[]) => of(this.showsService.getShowList());

  searchShowByTxt = (txt: string) => of(this.showsService.getShowList());

  displayShow = (show: Show) => show.title;
}
