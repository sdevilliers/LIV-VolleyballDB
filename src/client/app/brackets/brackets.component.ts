import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { BracketTable } from './bracketTable';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';
import { Cell } from '../cell/cell';

@Component({
  moduleId: module.id,
  selector: 'vb-brackets',
  templateUrl: './brackets.component.html',
  styleUrls: ['./brackets.component.css']
})
export class BracketsComponent implements OnInit {

  bracket: BracketLogic;    //The data: a bracket object where all the tournament details are kept
  tableData: BracketTable;
  teamCount: number;
  teams: Team[];
  errorMessage: string;
  teamClickedAlert: string;

  constructor(private teamService: TeamService) { //Injects TeamService so that the data for teams can be accessed with the local variable mysqlService
    if (this.teams === undefined) {
      this.teams = [];
    }
    this.tableData = new BracketTable();
  }

  createBracket(teamCount: number): void {
    //remember after move to ensure that teams cannot be less than 2
    let alertMessage: string;
    if (teamCount > 1 && teamCount <= 2000) {
      this.teams = [];
      for (let i = 0; i < teamCount; i++) {
        this.teams[i] = new Team;
        this.teams[i].TeamName = 'Team' + (i + 1);
        this.teams[i].Seed = i + 1;
      }
    } else if (teamCount > 2000) {
      alertMessage = 'Too many teams. Try a number less than 2000';
    } else if (teamCount < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
      alert(alertMessage);
      return;
    } else {
      alertMessage = 'You didn\'t specify an amount of teams, so we used the database.';
    }
    if (this.teams.length < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
    }
    if (alertMessage) {
      alert(alertMessage);
    }
    this.bracket = new BracketLogic(this.teams);
    this.tableData.setTableOldMethod(this.bracket.rounds, this.bracket.neat);
    this.tableData.setlines(this.bracket.neat, this.bracket.rounds);
  }

  getAllMysqlTeams(): void {
    this.teamService.getMysqlTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => this.errorMessage = <any>error
    );
  }

  createMysqlBracket(): void {
    let alertMessage: string;
    this.getAllMysqlTeams();
    if (this.teams.length < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
    }
    if (alertMessage) {
      alert(alertMessage);
    }
    this.bracket = new BracketLogic(this.teams);
  }

  createJsonBracket(): void {
    let alertMessage: string;
    this.teamService.getJsonTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => this.errorMessage = <any>error
    );    if (this.teams.length < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament.';
    }
    if (alertMessage) {
      alert(alertMessage);
    }
    this.bracket = new BracketLogic(this.teams);
  }

  saveTeamTest(): void {
    let teamSeed: number;
    let teamID: number;
    this.getAllMysqlTeams();
    teamSeed = this.teams[this.teams.length - 1].Seed + 1;
    teamID = this.teams[this.teams.length - 1].TeamsID + 1;
    this.teamService.createMysqlTeam(
      {
        TeamsID: teamID,
        TeamName: `Santa\'s Sleigh ${teamSeed}`,
        Seed: teamSeed,
        captian: 'Captain Rudolf',
        playerTwo: 'Dasher',
        playerThree: 'Prancer',
        playerFour: 'Donner',
        playerFive: 'Vixen',
        playerSix: 'Comet'
      }
    ).subscribe(
      team => {
        console.log(team.toString());
        this.getAllMysqlTeams();
      },
      err => {
        console.log(err);
      }
    );
  }

  ngOnInit() {
    this.teamService.getJsonTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => this.errorMessage = <any>error
    );
  }

  onTeamClicked(message: string): void {
    this.teamClickedAlert = message;
  }
}
