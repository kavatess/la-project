import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './shows.component';
import { RouterModule } from '@angular/router';
import { showRoutes } from './shows.routes';

@NgModule({
  declarations: [ShowsComponent],
  imports: [CommonModule, RouterModule.forChild(showRoutes)],
})
export class ShowsModule {}
