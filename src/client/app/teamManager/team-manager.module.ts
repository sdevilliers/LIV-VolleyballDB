import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamManagerComponent } from './team-manager.component';
import { TeamManagerRoutingModule } from './team-manager-routing.module';
import { TeamDetailComponent } from './team-detail.component';

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
