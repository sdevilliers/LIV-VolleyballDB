import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team.service';
import { Team } from '../shared/team';
import { outOfBoundsError } from '@angular/core/src/di/reflective_errors';
import { iTeam } from '../shared/iTeam.interface';


@Component({
  moduleId: module.id,
  selector: 'vb-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  pageTitle = 'Team Detail';
  errorMessage = '';
  id: string;
  team: Team | undefined;
  showSpinner1 = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {
  }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      if (this.id === 'new') {
        this.team = new Team(undefined, undefined, 'New Team', ['Captain/Player 1', 'Player 2', 'Player 3', 'Player 4', 'Player 5', 'Player 6']);
      } else {
        const id = +this.id;
        this.getTeam(id);
      }
    }
  }

  getTeam(id: number) {
    this.showSpinner1 = true;
    this.teamService.getMysqlTeam(id).subscribe(
      (team: any) => {
        this.team = team;
        this.showSpinner1 = false;
        },
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/team-manager']);
  }

  trackByIndex(index: number, obj: any): any {
    return index;
  }

  saveTeam() {
    this.showSpinner1 = true;
    this.teamService.createMysqlTeam(
      {
        TeamName: this.team.TeamName,
        Seed: this.team.Seed,
        captian: this.team.players[0],
        playerTwo: this.team.players[1],
        playerThree: this.team.players[2],
        playerFour: this.team.players[3],
        playerFive: this.team.players[4],
        playerSix: this.team.players[5]
      }
    ).subscribe(
      team => {
        console.log(team.toString());
        this.getTeam(team.TeamsID);
        this.showSpinner1 = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  updateTeam() {
    this.showSpinner1 = true;
    this.teamService.updateMySqlTeam(
      {
        TeamsID: this.team.TeamsID,
        TeamName: this.team.TeamName,
        Seed: this.team.Seed,
        captian: this.team.players[0],
        playerTwo: this.team.players[1],
        playerThree: this.team.players[2],
        playerFour: this.team.players[3],
        playerFive: this.team.players[4],
        playerSix: this.team.players[5]
      }
    ).subscribe(
      team => {
        console.log(team.toString());
        this.showSpinner1 = false;
      },
      err => {
        console.log(err);
      }
    );
  }

  deleteTeam(team: iTeam) {
    this.showSpinner1 = true;
    this.teamService.deleteMySqlTeam(team).subscribe(
      team => {
        console.log(team.toString());
        this.showSpinner1 = false;
      },
      err => {
        console.log(err);
      }
    );
    this.router.navigate(['/team-manager']);
  }
}
