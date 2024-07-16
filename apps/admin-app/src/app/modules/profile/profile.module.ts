import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from './profile.component';
import { RouterModule } from '@angular/router';
import { profileRoutes } from './profile.routes';
import { ProfileStoreModule } from './store/store.module';

@NgModule({
  declarations: [ProfileComponent],
  imports: [
    CommonModule,
    ProfileStoreModule,
    RouterModule.forChild(profileRoutes),
  ],
})
export class ProfileModule {}
