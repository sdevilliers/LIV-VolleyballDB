import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';

@Component({
  moduleId: module.id,
  selector: 'vb-team-service',
  templateUrl: './teamManager.component.html',
  styleUrls: ['./teamManager.component.css']
})
export class TeamManagerComponent implements OnInit {

  teams: Team[];
  errorMessage: string;

  constructor(private myTeamService: TeamService) {
    if (this.teams === undefined) {
      this.teams = [];
    }
  }

  ngOnInit() {
    console.log('TeamManagerComponent is initialized');
  }
}
