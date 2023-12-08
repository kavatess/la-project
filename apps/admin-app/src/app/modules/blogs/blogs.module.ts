import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BlogsComponent } from './blogs.component';
import { RouterModule } from '@angular/router';
import { blogsRoutes } from './users.routes';

@NgModule({
  declarations: [BlogsComponent],
  imports: [CommonModule, RouterModule.forChild(blogsRoutes)],
})
export class BlogsModule {}
