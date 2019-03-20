import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamManagerComponent } from './team-manager.component';
import { TeamDetailComponent } from './team-detail.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'team-manager', component: TeamManagerComponent },
      {
        path: 'team-manager/:id',
        // canActivate: [TeamDetailGuard],
        component: TeamDetailComponent
      },
    ])
  ],
  exports: [RouterModule]
})
export class TeamManagerRoutingModule { }
