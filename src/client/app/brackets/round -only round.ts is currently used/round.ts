import { Team } from '../../shared/team';
import { Match } from '../match -only match.ts is currently used/match';

export class Round {                                    //takes in the round # and teams as parameters to construct the round

  matchCount: number;
  gap: number;           //gap between matches 1 unit = 1 cell height
  smallGap: number;      //the smaller gap at the top/bottom of the round.
  matches: Match[] = []; //records the match locations by index value (each index value corresponds to 2 rows of the table)

  constructor(matchCount: number, gap: number = 0, smallGap: number = 0) {
    this.gap = gap;
    this.matchCount = matchCount;
    this.smallGap = smallGap;
    this.matches = this.generateMatches(gap, matchCount, smallGap);
  }

  /**
   * verifies that the number of teams competing in this round is 2^n, where n is an integer
   */
  isNeat(): boolean {
    let matchCount = this.matches.length;
    while (1 < matchCount) {
      if (matchCount % 2 === 1) {
        return false;
      } else {
        matchCount = matchCount / 2;
      }
    }
    return true;
  }

  /**
   * Assigns the teams to existing matches
   * @param teams All the teams in the bracket, ordered starting at teams[0] = seed #1 team
   * @param seeds Array of seed values that represent the subset of teams in this round in their proper order. Null values represent empty teams.
   */
  fillMatches(teams: Team[], seeds: number[]) {
    // line up the teams needed for this round
    const orderedTeams = this.mapSeedsToTeams(teams, seeds);
    // loop through the matches in this round and assign the corresponding teams
    for (const match of this.matches) {
      match.assignTeams(orderedTeams);
    }
  }

  // /**
  //  * Used only for RoundOne
  //  * Assigns the locations of 'messy' matches to this round
  //  * @param nextRound The following round i.e. RoundTwo of the 'non-neat' bracket (for proper alignment).
  //  */
  // spaceMatches(nextRound: Match[]) {
  // }

  //assigns the locations and teams of 'messy' matches given an array of seeds and the matches in the following round
  assignLocationsAndTeams(teams: Team[], messySeeds: number[], nextRound: Match[]) {
    //loop through the seeds array and assign teams
    for (let seedIdx = 0, matchIdx = 0; seedIdx < messySeeds.length; seedIdx++) {
      //if the index is not null
      if (messySeeds[seedIdx]) {
        //assign start location
        this.matches[matchIdx].startRowIndex = seedIdx;
        //assign the team
        this.matches[matchIdx].teamOne = teams[messySeeds[seedIdx] - 1];
        //next Seed (they come in pairs)
        seedIdx++;
        //assign end location
        this.matches[matchIdx].endRowIndex = seedIdx;
        //assign the team
        this.matches[matchIdx].teamTwo = teams[messySeeds[seedIdx] - 1];
        //this match is complete - next match
        matchIdx++;
      }
    }

    //assign locations to line previous matches up with empty (nameless) teams
    for (let r1MatchIdx = 0, r2MatchIdx = 0; r2MatchIdx < nextRound.length; r2MatchIdx++) {
      if (nextRound[r2MatchIdx].teamOne.TeamName === '') {
        this.matches[r1MatchIdx].endRowIndex = nextRound[r2MatchIdx].startRowIndex;
        this.matches[r1MatchIdx].startRowIndex = this.matches[r1MatchIdx].endRowIndex - 1;
        r1MatchIdx++;
      }
      if (nextRound[r2MatchIdx].teamTwo.TeamName === '') {
        this.matches[r1MatchIdx].startRowIndex = nextRound[r2MatchIdx].endRowIndex;
        this.matches[r1MatchIdx].endRowIndex = this.matches[r1MatchIdx].startRowIndex + 1;
        r1MatchIdx++;
      }
    }
  }

  /**
   * moves the whole round down by the specified number of cells
   */
  shiftDown(shift: number) {
    for (const match of this.matches) {
      match.startRowIndex += shift;
      match.endRowIndex += shift;
    }
  }

  /**
   * initializes the matches that fill this round
   */
  private generateMatches(gap: number, matchCount: number, smallGap: number): Match[] {
    const matches: Match[] = [];
    let cellIndex = 0;
    cellIndex += smallGap;
    let i;
    //fills in matches separated by this round's gap width
    for (i = 0; i < matchCount - 1; i++) {
      //each match stores its position via the cellIndex
      matches[i] = new Match(false, i, cellIndex);
      cellIndex += 2;
      cellIndex += gap;
    }
    matches[i] = new Match(false, i, cellIndex);
    cellIndex += smallGap;
    return matches;
  }

  /**
   * Returns an array of teams that matches the length and order of the seeds array
   * @param teams All the teams in the bracket, ordered starting at teams[0] = seed #1 team
   * @param seeds Array of seed values that represent the subset of desired teams in their proper order. Null values represent empty teams.
   */
  private mapSeedsToTeams(teams: Team[], seeds: number[]): Team[] {
    const orderedTeams: Team[] = [];
    let i = 0;
    for (const seed of seeds) {
      if (seed === null || seed === undefined){
        orderedTeams[i] = new Team();
      } else {
        orderedTeams[i] = teams[seed - 1];
      }
      i++;
    }
    return orderedTeams;
  }
}
