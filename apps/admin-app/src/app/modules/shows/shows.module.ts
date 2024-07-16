import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShowsComponent } from './shows.component';
import { RouterModule } from '@angular/router';
import { showsRoutes } from './shows.routes';
import { ShowsService } from './shows.service';

@NgModule({
  declarations: [ShowsComponent],
  imports: [CommonModule, RouterModule.forChild(showsRoutes), ],
  providers: [ShowsService],
})
export class ShowsModule {}
