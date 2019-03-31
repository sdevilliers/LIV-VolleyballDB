import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TeamManagerComponent } from './team-manager.component';
import { TeamDetailComponent } from './team-detail.component';

/**
 * <div class="text-info bg-info">
 *     This module controls the navigation within the TeamManager Module
 *     The '/:id' parameter is based on the id of the team displayed and allows for a unique path for each team without having to list each path in code.
 * </div>
 */
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
