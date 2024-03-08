import { Component, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { showFormActions } from './store/update-show.actions';
import { ShowFormComponent } from '../show-info/show-form/show-form.component';
import { ShowFormState, UpdateShowState } from './store/update-show.reducer';
import {
  fareTypesSelectors,
  seatMapSelectors,
  showFormSelector,
} from './store/update-show.selectors';
import { FareTypeProperties, SectionProperties } from '@libs/models';

@Component({
  selector: 'la-project-update-show',
  templateUrl: './update-show.component.html',
  styleUrls: ['./update-show.component.scss'],
})
export class UpdateShowComponent implements OnInit {
  readonly SectionProperties = SectionProperties;
  readonly formState$ = this.store.select(showFormSelector);
  readonly showTitle$ = this.formState$.pipe(
    map((state) => state.data.title),
    distinctUntilChanged()
  );
  readonly sections$ = this.store.select(seatMapSelectors.sections);
  readonly fareTypeList$ = this.store.select(fareTypesSelectors.data);

  @ViewChild(ShowFormComponent)
  private showformComp: ShowFormComponent;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly store: Store<UpdateShowState>
  ) {}

  ngOnInit(): void {
    this.fetchShowIdToStore();
  }

  onNavChange(changeEv: NgbNavChangeEvent) {
    if (changeEv.activeId === 1) {
      this.fetchShowFormToStore();
    }
    if (changeEv.nextId === 1) {
      return this.getShowData();
    }
    if (changeEv.nextId === 2) {
      this.getShowFareTypes();
      return this.getSectionData();
    }
    if (changeEv.nextId === 3) {
      return this.getShowFareTypes();
    }
  }

  private fetchShowIdToStore(): void {
    this.store.dispatch(
      showFormActions.fetchShowId({
        showId: this.router.snapshot.paramMap.get('showId'),
      })
    );
  }

  private fetchShowFormToStore(): void {
    this.store.dispatch(
      showFormActions.fetchShowForm({
        formState: this.getFormState(),
      })
    );
  }

  private getShowData(): void {
    this.store.dispatch(showFormActions.getShowData());
  }

  private getSectionData(): void {
    this.store.dispatch(showFormActions.getShowSectionList());
  }

  private getShowFareTypes(): void {
    // this.store.dispatch(showFormActions.getShowFareTypes());
    this.store.dispatch(
      showFormActions.loadFareTypes({
        data: [
          {
            [FareTypeProperties.title]: 'VIP',
            [FareTypeProperties.displayColor]: 'yellow',
            [FareTypeProperties.price]: 1000000,
          },
          {
            [FareTypeProperties.title]: 'Thường',
            [FareTypeProperties.displayColor]: 'lightblue',
            [FareTypeProperties.price]: 500000,
          },
        ],
      })
    );
  }

  private getFormState(): ShowFormState {
    const { value, valid, pristine, dirty, touched } = this.showformComp.form;
    return {
      valid,
      pristine,
      dirty,
      touched,
      data: value,
    };
  }

  onSectionChange(sectionId: string) {
    this.store.dispatch(showFormActions.changeSection({ sectionId }));
  }
}
