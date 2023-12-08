import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Show } from 'libs/models/src/show';

@Injectable({
  providedIn: 'root',
})
export class CreateShowService {
  private readonly CREATE_SHOW_REQUEST_ROUTE = 'show';

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {}

  createShow(): Show[] {
    return [];
  }
}
