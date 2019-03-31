import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamManagerComponent } from './team-manager.component';
import { TeamManagerRoutingModule } from './team-manager-routing.module';
import { TeamDetailComponent } from './team-detail.component';

/**
 * <div class="text-info bg-info">
 *     This module houses the components that allow the user to manage the teams data in the database
 * </div>
 */
@NgModule({
  imports: [
    SharedModule,
    TeamManagerRoutingModule
  ],
  declarations: [
    TeamManagerComponent,
    TeamDetailComponent,
  ],
  exports: [
    TeamManagerComponent
  ]
})
export class TeamManagerModule { }
