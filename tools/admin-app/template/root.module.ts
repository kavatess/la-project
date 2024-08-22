import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { <%= name %>sRoutes } from './<%= name %>s.routes';
import { <%= className %>sComponent } from './<%= name %>s.component';
import { AdvancedTableModule } from '@libs/front-end';

@NgModule({
  declarations: [<%= className %>sComponent],
  imports: [
    CommonModule,
    AdvancedTableModule,
    RouterModule.forChild(<%= name %>sRoutes),
  ],
})
export class <%= className %>sModule {}
