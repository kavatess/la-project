import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FareType } from '@libs/models';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FareTypesTableService } from './fare-types-table.service';
import { FareTypeModalComponent } from './fare-type-modal/fare-type-modal.component';
import { catchError, filter, map, of } from 'rxjs';

@Component({
  selector: 'la-project-fare-types-table',
  templateUrl: './fare-types-table.component.html',
  styleUrls: ['./fare-types-table.component.scss'],
})
export class FareTypesTableComponent {
  @Input()
  showId = '';
  @Input()
  fareTypeList: FareType[] = [];
  @Output()
  fareTypeListChange = new EventEmitter();

  constructor(
    private readonly modalService: NgbModal,
    private readonly api: FareTypesTableService
  ) {}

  async editFareType(fareType: FareType) {
    const modalRef = this.modalService.open(FareTypeModalComponent);
    modalRef.componentInstance.modalMode = 'edit';
    modalRef.componentInstance.data = fareType;
    modalRef.componentInstance.ngOnChanges();

    const data = await modalRef.result.catch((error) => {
      console.error(error);
      return null;
    });

    if (data) {
      this.fareTypeListChange.emit();
    }
  }

  deleteFareType({ id, title }: FareType): void {
    const confirmation = window.confirm(
      `Are you sure that you want to delete '${title}' fare type?`
    );
    if (confirmation) {
      this.api
        .deleteFareTypeById(id)
        .pipe(
          catchError((error) => {
            console.error(error);
            return of({ id: null });
          }),
          map((data) => data?.id || null),
          filter((deletedId) => !!deletedId)
        )
        .subscribe(() => {
          this.fareTypeListChange.emit();
        });
    }
  }

  async addFareType() {
    const modalRef = this.modalService.open(FareTypeModalComponent);
    modalRef.componentInstance.modalMode = 'add';

    const result = await modalRef.result.catch((error) => {
      console.error(error);
      return null;
    });

    if (result) {
      this.fareTypeListChange.emit();
    }
  }
}
