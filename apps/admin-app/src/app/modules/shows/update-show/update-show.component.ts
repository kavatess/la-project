import { Component, OnInit, ViewChild } from '@angular/core';
import { distinctUntilChanged, map } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { NgbNavChangeEvent } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { showFormActions } from './store/update-show.actions';
import { ShowFormComponent } from '../show-info/show-form/show-form.component';
import { ShowFormState, UpdateShowState } from './store/update-show.reducer';
import { showFormSelector } from './store/update-show.selectors';

@Component({
  selector: 'la-project-update-show',
  templateUrl: './update-show.component.html',
  styleUrls: ['./update-show.component.scss'],
})
export class UpdateShowComponent implements OnInit {
  readonly formState$ = this.store.select(showFormSelector);
  readonly showTitle$ = this.formState$.pipe(
    map((state) => state.data.title),
    distinctUntilChanged()
  );

  @ViewChild(ShowFormComponent)
  private showformComp: ShowFormComponent;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly store: Store<UpdateShowState>
  ) {}

  ngOnInit(): void {
    this.loadShowData();
  }

  onNavChange(changeEv: NgbNavChangeEvent) {
    if (changeEv.activeId === 1) {
      return this.store.dispatch(
        showFormActions.saveData({ formState: this.getFormState() })
      );
    }
    if (changeEv.activeId === 2) {
      // return this.store.dispatch
    }
    if (changeEv.activeId === 3) {
      // return this.store.dispatch
    }
  }

  private loadShowData(): void {
    const showId = this.router.snapshot.paramMap.get('showId');
    this.store.dispatch(showFormActions.getShowDataById({ showId }));
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
}
