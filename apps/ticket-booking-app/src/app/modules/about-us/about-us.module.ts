import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutUsComponent } from './about-us.component';
import { RouterModule } from '@angular/router';
import { aboutUsRoutes } from './about-us.routes';

@NgModule({
  declarations: [AboutUsComponent],
  imports: [CommonModule, RouterModule.forChild(aboutUsRoutes)],
})
export class AboutUsModule {}
