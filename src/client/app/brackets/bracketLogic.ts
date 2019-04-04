import { Cell } from './cell/cell';
import { Team } from '../shared/team';
import { Round } from './round/round';


export class BracketLogic {

  neat = false;                               // whether or not the number of teams competing in this bracket is 2^n, where n is an integer
                                              // eg. if false, a 'messy' round is needed to sort out the by
  firstMessyMatchCount: number;               // the number of matches in the first round of 'non-neat' bracket
  firstNeatMatchCount: number;                // match count of the first 'neat' round (without a by)
  neatSeeds: number[];                        // ordered team seeds of the first 'neat' round (round 2 in a 'non-neat' bracket)
                                              // match location specified by index
  messySeeds: number[];                       // Array of seed values that show the proper order of the teams in the first ('messy') round in a 'non-neat' bracket

  rounds: Round[] = [];
  roundCount: number;
  public tableData: Cell[][];                 // dimensions: tableData[row][column] output of the bracketLogic class

  private teams: Team[];

  constructor(teams: Team[]) {
    this.teams = teams;
    //sets the roundCount, firstMessyMatchCount, firsNeatMatchCount,
    this.setVariables(teams.length);
    //construct a neat or 'messy' bracket as required
    if (this.neat) {
      this.rounds = this.generateNeat(this.roundCount, this.firstNeatMatchCount);
      this.rounds[0].fillMatches(this.teams, this.neatSeeds);
    } else {
      //create a neat empty rounds array using the firstNeatMatchCount (teams.length - extra teams)
      this.rounds = this.generateNeat(this.roundCount - 1, this.firstNeatMatchCount);
      this.rounds[0].fillMatches(this.teams, this.neatSeeds);
      //create and insert round one to deal with the by
      this.rounds = this.addRoundOne(this.rounds, this.messySeeds, this.firstMessyMatchCount, this.teams);
    }
  }

  /**
   * Sets the roundCount, neatSeeds, firstMessyMatchCount, firstNeatMatchCount, neatSeeds, messySeeds, and neat properties of this class
   * All the variables are set at the end of the function
   * @param teamsLength The number of teams playing in the bracket.
   */
  setVariables(teamsLength: number) {
    // - Start at the last round and assume team1 v. team2
    let neatSeeds: number[] = [1, 2];
    let roundCount = 1;
    //loop backwards from the final match of the final round...
    for (
      let prevSeeds: number[] = [];
      //...stopping when the previous round would be have more teams than teamsLength
      2 * neatSeeds.length <= teamsLength;
      roundCount++ , neatSeeds = prevSeeds, prevSeeds = []
    ) {
      const first: number = neatSeeds[1] + 1; //first Seed of the seeds to be added to the previous round
      const last: number = first + neatSeeds.length - 1; //last of the seeds to be added to the previous round

      // put players from this round as teamOne of each of the previous matches
      for (let j = 0, k = 0; k < neatSeeds.length; j += 2, k++) {
        prevSeeds[j] = neatSeeds[k];
      }
      //pair the teamOne teams with their matching partners according to 1 vs. last, 1+1 vs. last-1 ...etc.
      for (let j = last, k = 1; k <= neatSeeds.length; j-- , k++) {
        //fills position after where 'k' is with j
        prevSeeds[prevSeeds.indexOf(k) + 1] = j;
      }
      // - move back a round
    }

    const extraMatches = teamsLength - neatSeeds.length;
    let neat: boolean;
    let messySeeds: number[] = [];
    if (extraMatches === 0) {
      neat = true;
    } else {
      roundCount++;
      neat = false;

      //set variables to define the range of seeds to be pulled back to the messy round
      const last: number = neatSeeds[1];
      const first: number = last + 1 - extraMatches;
      //pull those seeds back into the messyRound
      for (let i = first; i <= last; i++) {
        messySeeds[neatSeeds.indexOf(i)] = i;
        neatSeeds[neatSeeds.indexOf(i)] = null;
      }
      //space the seeds adequately
      const shift = 0;
      for (let i = 0; i < messySeeds.length; i++) {
        if (!messySeeds[i]) {
          messySeeds[i] = null;
        }
        if (messySeeds[i] != null && messySeeds[i + 1] != null) {
          //shift the section of array beginning at i+1 by one index in the positive direction
          messySeeds[messySeeds.length] = null;
          messySeeds = messySeeds.copyWithin(i + 2, i + 1);
          messySeeds[i + 1] = null;
        }
      }
      //add the others to messy seeds with their matching partners
      for (let j = last + extraMatches, k = first; k <= last; j-- , k++) {
        //fills position after where 'k' is
        messySeeds[messySeeds.indexOf(k) + 1] = j;
      }
    }

    this.roundCount = roundCount;
    this.neatSeeds = neatSeeds;
    this.firstNeatMatchCount = neatSeeds.length / 2;
    this.messySeeds = this.deleteNullAndUndefinedElements(messySeeds);
    this.firstMessyMatchCount = this.deleteNullAndUndefinedElements(messySeeds).length / 2;
    this.neat = neat;

  }

  /**
   * Creates a neat bracket based on a firstNeatMatchCount of a power of 2.
   * @param roundCount Number of rounds in the created bracket.
   * @param firstNeatMatchCount Number of matches in the first round. Must be a power of 2.
   */
  generateNeat(roundCount: number, firstNeatMatchCount: number): Round[] {
    let matchCount = firstNeatMatchCount;
    let gap = 2;                                //number of cells between matches
    let smallGap = 0;
    const rounds: Round[] = [];
    for (let i = 0; i < roundCount; i++) {
      rounds[i] = new Round(matchCount, gap, smallGap);
      //update variables for the next round
      matchCount = matchCount / 2;
      // each smallGap is equal to the previous gap
      smallGap = gap;
      gap = gap * 2 + 2;
    }
    return rounds;
  }

  /**
   * Creates a round for the extra matches in a 'messy bracket'
   * @param rounds All the rounds that will follow RoundOne with RoundTwo = rounds[0]
   * @param messySeeds Array of seed values that represent the subset of 'messy' teams (teams in RoundOne of a non-neat bracket) in their proper order
   * @param firstMessyMatchCount The number of matches in the first round of 'non-neat' bracket
   * @param teams All the teams in the bracket, ordered starting at teams[0] = #1 team
   */
  addRoundOne(rounds: Round[], messySeeds: number[], firstMessyMatchCount: number, teams: Team[]): Round[] {
    //shift the vertical position all the matches in the other rounds down by 1
    for (const round of rounds) { round.shiftDown(1); }
    // create the round
    const roundOne: Round = new Round(firstMessyMatchCount, 0, 0);
    // fill and adjust spacing
    roundOne.fillMatches(teams, messySeeds);
    //roundOne.assignLocationsAndTeams(teams, messySeeds, rounds[0].matches);
    roundOne.spaceMatches(rounds[0]);
    // add roundOne to the rounds array
    rounds.unshift(roundOne);
    return rounds;
  }

  /**
   * Deletes the Null And Undefined Elements of an array.
   * @param array The array to be modified.
   */
  private deleteNullAndUndefinedElements(array: number[]): number[] {
    const x: number[] = [];
    for (const item of array) {
      if (item != null && item !== undefined) {
        x[x.length] = item;
      }
    }
    return x;
  }
}






