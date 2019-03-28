import { Team } from '../../shared/team';
export class Match {
    matchIndex: number;        //used to order the matches. begins at 0
    startRowIndex: number;  //the location of the first cell of the match
    endRowIndex: number;    //location of the last cell of the match
    teamOne: Team;
    teamTwo: Team;
    winner: Team;
    loser: Team;
    score: number[];
    empty: boolean;

    constructor(
        empty: boolean = true,
        id: number = null,
        cellIndex: number = null,
        teamOne: Team = new Team(),
        teamTwo: Team = new Team(),
        ){
        this.empty = empty;
        this.matchIndex = id;
        this.startRowIndex = cellIndex;
        this.endRowIndex = this.startRowIndex + 1;
        this.teamOne = teamOne;
        this.teamTwo = teamTwo;
    }

    // assigns two teams based on specially ordered list of seeded teams
    assignTeams(teams: Team[]){
        this.teamOne = teams[this.matchIndex * 2];
        this.teamTwo = teams[this.matchIndex * 2 + 1];
        if (this.teamOne.TeamName !== undefined || this.teamTwo.TeamName !== undefined) {
          this.empty = false;
        }
    }

    assignSeedsling(seed1: number, seed2: number) {
        this.teamOne.Seed = seed1;
        this.teamTwo.Seed = seed2;
    }
}
