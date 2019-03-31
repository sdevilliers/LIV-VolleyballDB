import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { BracketTable } from './bracketTable';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';


/**
 * <div class="text-info bg-info">
 *     This Component brings the logic (BracketLogic) and display (BracketTable) classes together.
 *     It provides user interface to create an empty bracket for a certain number of teams.
 *     It also allows for the creation of a bracket using the teams in the database, that are retrieved via the TeamService service.
 * </div>
 */
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
  bShowSpinner1 = false;
  bShowSpinner2 = false;

  constructor(private teamService: TeamService) { //Injects TeamService so that the data for teams can be accessed with the local variable mysqlService
    if (this.teams === undefined) {
      this.teams = [];
    }
    this.tableData = new BracketTable();
  }

  createUIBracket(teamCount: number): void {
    //remember after move to ensure that teams cannot be less than 2
    let alertMessage: string;
    if (teamCount > 1 && teamCount <= 300) {
      this.teams = [];
      for (let i = 0; i < teamCount; i++) {
        this.teams[i] = new Team;
        this.teams[i].TeamName = 'Team' + (i + 1);
        this.teams[i].Seed = i + 1;
      }
    } else if (teamCount > 300) {
      alertMessage = 'Too many teams. Try a number less than 2000';
    } else if (teamCount < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
      alert(alertMessage);
      return;
    } else {
      alertMessage = 'You didn\'t specify an amount of teams';
    }
    this.bShowSpinner1 = true;
    this.sleep(100).then(() => {
      this.createBracket();
      this.bShowSpinner1 = false;
    });
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
    this.bShowSpinner2 = true;
    this.teamService.getMysqlTeams().subscribe(
      teams => {
        this.teams = teams;
        this.createBracket(this.errorMessage);
        this.bShowSpinner2 = false;
      },
      error => this.errorMessage = <any>error
    );
  }

  createJsonBracket(): void {
    this.teamService.getJsonTeams().subscribe(
      teams => {
        this.teams = teams;
        this.createBracket(this.errorMessage);
      },
      error => this.errorMessage = <any>error
    );
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

  onKeydown($event: any, teamCnt: number) {
    if ($event.code === 'Enter'){
      this.createUIBracket(teamCnt);
    }
  }

  onTeamClicked(message: string): void {
    this.teamClickedAlert = message;
  }

  sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  private createBracket(errorMessage?: string): boolean {
    if (this.teams.length < 2) {
      errorMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
    } else if (this.teams.length > 300) {
      errorMessage = 'Too many teams. Try using less than 2000';
    }
      if (errorMessage) {
        alert(errorMessage);
      }
    this.bracket = new BracketLogic(this.teams);
    this.tableData.setTable(this.bracket.rounds, this.bracket.neat);
    this.tableData.setlines(this.bracket.neat, this.bracket.rounds);
    return true;
  }
}
