import { Component, OnInit } from '@angular/core';
import { BracketLogic } from './bracketLogic';
import { BracketTable } from './bracketTable';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';

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
  teamClickedAlert: string; //Used during development to check how the event bindings work.
  bShowSpinner1 = false;
  bShowSpinner2 = false;

  /**
   * Injects TeamService so that the data for teams can be accessed with the local variable mysqlService
   * @param teamService Injectable that helps connect to the database.
   */
  constructor(private teamService: TeamService) {
    if (this.teams === undefined) {
      this.teams = [];
    }
    this.tableData = new BracketTable();
  }

  /**
   * Creates an Empty Bracket
   * @param teamCount Number of teams in the bracket
   */
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
      alertMessage = 'Too many teams. Try a number less than 300';
    } else if (teamCount < 2) {
      alertMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
      return;
    } else {
      alertMessage = 'You didn\'t specify an amount of teams';
    }
    alert(alertMessage);
    this.bShowSpinner1 = true;
    this.sleep(100).then(() => {
      this.createBracket();
      this.bShowSpinner1 = false;
    });
  }

  /**
   * Fetches the database teams using the TeamService and saves them in the array this.teams
   */
  getAllMysqlTeams(): void {
    this.teamService.getMysqlTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => this.errorMessage = <any>error
    );
  }

  /**
   * Creates a bracket with the teams in the database.
   */
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

  /**
   * Used to create a sample bracket when more than teamCount parameter in the createUIBracket is too big.
   * Creates a bracket based on the teams in the json file in the assets folder.
   */
  createJsonBracket(): void {
    this.teamService.getJsonTeams().subscribe(
      teams => {
        this.teams = teams;
        this.createBracket(this.errorMessage);
      },
      error => this.errorMessage = <any>error
    );
  }

  /**
   * Method used during development to auto-generate a team.
   */
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

  /**
   * Executes right after the constructor
   */
  ngOnInit() {
    this.teamService.getJsonTeams().subscribe(
      teams => {
        this.teams = teams;
      },
      error => this.errorMessage = <any>error
    );
  }

  /**
   * Initiates creation of an empty bracket when the enter key is pressed. Bound to a 'keydown' event in the template.
   * @param $event  Information about which key was pressed
   * @param teamCnt The number of teams in the empty bracket
   */
  onKeydown($event: any, teamCnt: number) {
    if ($event.code === 'Enter') {
      this.createUIBracket(teamCnt);
    }
  }

  /**
   * Method used during development to check how the event bindings work.
   */
  onTeamClicked(message: string): void {
    this.teamClickedAlert = message;
  }

  /**
   * Pauses the main thread.
   * @param milliseconds  Length of the pause in milliseconds
   */
  sleep = (milliseconds: number) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  }

  /**
   * Does the actual work for creating the bracket.
   * @param errorMessage  Explains any validation error for teams.length. null/undefined if no error
   */
  private createBracket(errorMessage?: string): boolean {
    if (this.teams.length < 2) {
      errorMessage = 'You don\'t have enough teams to make a tournament. You need at least 2';
    } else if (this.teams.length > 300) {
      errorMessage = 'Too many teams. Try using less than 300';
    }
    if (errorMessage) {
      alert(errorMessage);
    }
    this.bracket = new BracketLogic(this.teams);
    this.tableData.setTable(this.bracket.rounds, this.bracket.neat);
    this.tableData.setLines(this.bracket.neat, this.bracket.rounds);
    return true;
  }
}
