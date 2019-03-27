import { Cell } from '../cell/cell';
import { Team } from '../shared/team';
import { Round } from '../shared/round';

export class BracketLogic {

    neat = false;                               // whether or not the number of teams competing in this bracket is 2^n, where n is an integer
                                                  // eg. if false, a 'messy' round is needed to sort out the by
    firstMessyMatchCount: number;                       // the number of matches in the first round of 'non-neat' bracket
    firstNeatMatchCount: number;                // match count of the first 'neat' round (without a by)
    neatSeeds: number[];                        // ordered team seeds of the first 'neat' round (round 2 in a 'non-neat' bracket)
    messySeeds: number[];                       // ordered team seeds of the first ('messy') round in a 'non-neat' bracket

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
            //create a neat empty rounds array using the teams.length - extra teams
            this.rounds = this.generateNeat(this.roundCount, this.firstNeatMatchCount);
            this.rounds[0].assignTeams(this.teams, this.neatSeeds);
        } else {
            this.rounds = this.generateNeat(this.roundCount - 1, this.firstNeatMatchCount);
            this.rounds[0].assignTeams(this.teams, this.neatSeeds);
            this.rounds = this.addRoundOne(this.rounds, this.messySeeds, this.firstMessyMatchCount, this.teams);
        }
        this.setMatchSeeds(this.teams, this.neatSeeds, this.messySeeds, this.neat);
        this.tableData = this.setTableData(this.rounds, this.tableData, this.neat);
    }

    // Sets the roundCount, neatSeeds, firstMessyMatchCount, firstNeatMatchCount, neatSeeds, messySeeds, and neat properties of this class
    // All the variables are set at the end of the function
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
                if (!messySeeds[i]){
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

        this.roundCount             = roundCount;
        this.neatSeeds              = neatSeeds;
        this.firstNeatMatchCount    = neatSeeds.length / 2;
        this.messySeeds             = messySeeds;
        this.firstMessyMatchCount   = messySeeds.length / 2;
        this.neat                   = neat;

    }

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

    // creates a round for the extra matches in a 'messy bracket'
    addRoundOne(rounds: Round[], messySeeds: number[], extraMatches: number, teams: Team[]): Round[] {
        for (const round of rounds) {
            round.shiftDown(1);
        }
        const roundOne: Round = new Round(extraMatches, 0, 0);
        roundOne.assignLocationsTeams(teams, messySeeds, rounds[0].matches);
        rounds.unshift(roundOne);
        return rounds;
    }

    //arranges the teams within first two rounds of the bracket
    setMatchSeeds(teams: Team[], neatSeeds: number[], messySeeds: number[], neat: boolean): any {
            if (neat) {
                this.rounds[0].assignTeams(teams, neatSeeds);
            } else {
                console.log('SetMatchSeeds If not neat has not been specified');
            }
    }

    setTableData(rounds: Round[], tableData: Cell[][], neat: boolean): Cell[][] {
        tableData = [];                         //set tableData to an empty array
        //set rowCount to the highest endRowIndex
        let rowCount = 0;
        for (const round of rounds) {
            if (round.matches[round.matches.length - 1].endRowIndex > rowCount) {
                rowCount = round.matches[round.matches.length - 1].endRowIndex;
            }
        }
        //creates a new cell for each cell in tableData. Rows are the container arrays with the number of rows based on the round with the highest endRowIndex
        for (let rowidx = 0; rowidx <= rowCount; rowidx++) {
            tableData[rowidx] = [];
            for (let colidx = 0; colidx < rounds.length; colidx++) {
                //Every cell is established with null values: teamName = " " and class = "blank"
                tableData[rowidx][colidx] = new Cell();
            }
        }
        //each team in a match gets its own cell. Cell location determined by round index and match start/endRowIndexes
        for (const round of rounds) {
            if (rounds.indexOf(round) === 0 && neat) {
                for (const match of round.matches) {
                    tableData[match.startRowIndex][rounds.indexOf(round)] = new Cell(match.teamOne, 'n');
                    tableData[match.endRowIndex][rounds.indexOf(round)] = new Cell(match.teamTwo, 'u');
                }
            } else if (rounds.indexOf(round) <= 1 && !neat) {
                for (const match of round.matches) {
                    tableData[match.startRowIndex][rounds.indexOf(round)] = new Cell(match.teamOne, 'n');
                    tableData[match.endRowIndex][rounds.indexOf(round)] = new Cell(match.teamTwo, 'u');
                }
            } else {
                for (const match of round.matches) {
                    tableData[match.startRowIndex][rounds.indexOf(round)].class = 'n';
                    tableData[match.endRowIndex][rounds.indexOf(round)].class = 'u';
                }
            }
        }

        tableData = this.setlines(neat, rounds, tableData);

        return tableData;
    }

    //adds the lines to connect the matches
    setlines(neat: boolean, rounds: Round[], tableData: Cell[][]): Cell[][] {
        for (const round of rounds) {
            //length of the lines in cell units = gap two rounds ago. Or = 0, for the first 2 or three rounds
            let length;
            if (rounds.indexOf(round) === 1 || rounds.indexOf(round) === 0) {
                length = 0;
            } else if (rounds.indexOf(round) >= 1) {
                length = rounds[rounds.indexOf(round) - 2].gap;
            }
            if (!neat && rounds.indexOf(round) === 2) {
                length = 0;
            }
            for (const match of round.matches) {
                //add lines above and below all the matches that aren't empty
                if (match.empty === false) {
                    //use the startRowIndex and the round index to position the line in tableData
                    //loop through each cell of the line
                    for (let i = 1; i <= length; i++) {
                        //use the startRowIndex and the round index to position the line in tableData
                        tableData[match.endRowIndex + i][rounds.indexOf(round) - 1].class += ' right';
                        tableData[match.startRowIndex - i][rounds.indexOf(round) - 1].class += ' right';
                    }
                }
            }
        }
        return tableData;
    }
}






