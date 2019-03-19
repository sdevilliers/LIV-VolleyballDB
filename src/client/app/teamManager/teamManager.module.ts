import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { TeamManagerComponent } from './teamManager.component';
import { TeamManagerRoutingModule } from './teamManager-routing.module';

@NgModule({
  imports: [
    SharedModule,
    TeamManagerRoutingModule
  ],
  declarations: [
    TeamManagerComponent
  ],
  exports: [
    TeamManagerComponent
  ]
})
export class TeamManagerModule { }
