import { Team } from './team';
import { Match } from './match';

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

    //assigns the 'neat' teams of matches given an ordered and correctly spaced array of seeds
    assignTeams(teams: Team[], seeds: number[]) {
        //loop through the seeds array
        for (let seedIdx = 0, matchIdx = 0; seedIdx < seeds.length; seedIdx++) {
            //assign the team
            //make sure that the seeds that are null are set to new Team()
            if (seeds[seedIdx] == null) {
                this.matches[matchIdx].teamOne = new Team();
            } else {
                this.matches[matchIdx].teamOne = teams[seeds[seedIdx] - 1];
            }
            //next Seed (they come in pairs)
            seedIdx++;
            //assign the team
            if (seeds[seedIdx] == null) {
                this.matches[matchIdx].teamTwo = new Team();
            } else {
                this.matches[matchIdx].teamTwo = teams[seeds[seedIdx] - 1];
            }
            //this match is complete - next match
            matchIdx++;
        }
    }

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

    //moves the whole round down by the specified number of cells
    shiftDown (shift: number) {
        for (const match of this.matches) {
            match.startRowIndex += shift;
            match.endRowIndex += shift;
        }
    }
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
}
