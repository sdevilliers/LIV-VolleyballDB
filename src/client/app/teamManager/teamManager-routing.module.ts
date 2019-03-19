import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamManagerComponent } from './teamManager.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'team-manager', component: TeamManagerComponent }
    ])
  ],
  exports: [RouterModule]
})
export class TeamManagerRoutingModule { }
