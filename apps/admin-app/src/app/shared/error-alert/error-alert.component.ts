import { Component, ViewChild } from '@angular/core';
import { NgbAlert, NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { debounceTime, tap } from 'rxjs';
import { CommonModule } from '@angular/common';
import { ErrorAlertService } from './error-alert.service';

@Component({
  selector: 'la-project-error-alert',
  standalone: true,
  imports: [CommonModule, NgbAlertModule],
  templateUrl: './error-alert.component.html',
  styleUrls: ['./error-alert.component.scss'],
  providers: [ErrorAlertService],
})
export class ErrorAlertComponent {
  errorMsg = '';

  @ViewChild(NgbAlert, { static: false }) alert: NgbAlert;

  constructor(private readonly service: ErrorAlertService) {
    this.service._message$
      .pipe(
        takeUntilDestroyed(),
        tap((msg) => (this.errorMsg = msg)),
        debounceTime(5000)
      )
      .subscribe(() => this.alert?.close());
  }
}
