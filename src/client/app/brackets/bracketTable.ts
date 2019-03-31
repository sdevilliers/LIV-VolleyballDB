import { Cell } from './cell/cell';
import { BracketLogic } from './bracketLogic';
import { Round } from './round/round';

/**
 * <div class="text-info bg-info">
 *     This Class houses the display data for a bracket
 *     The display data is created by transposing the data contained in the BracketLogic round into a two-dimensional array of type Cell.
 *     It enables the rounds to be shown vertically in an HTML table even though HTML does not posses native 'table column' elements.
 * </div>
 */
export class BracketTable {
  public table: Cell[][];

  private bracket: BracketLogic;

  constructor(){
    this.table = [];
  }

  setTable(rounds: Round[], neat: boolean): Cell[][] {
    this.table = [];                         //set tableData to an empty array
    //set rowCount to the highest endRowIndex
    let rowCount = 0;
    for (const round of rounds) {
      if (round.matches[round.matches.length - 1].endRowIndex > rowCount) {
        rowCount = round.matches[round.matches.length - 1].endRowIndex;
      }
    }
    //creates a new cell for each cell in tableData. Rows are the container arrays with the number of rows based on the round with the highest endRowIndex
    for (let rowidx = 0; rowidx <= rowCount; rowidx++) {
      this.table[rowidx] = [];
      for (let colidx = 0; colidx < rounds.length; colidx++) {
        //Every cell is established with null values: teamName = " " and class = "blank"
        this.table[rowidx][colidx] = new Cell();
      }
    }
    //each team in a match gets its own cell. Cell location determined by round index and match start/endRowIndexes
    for (const round of rounds) {
      if (rounds.indexOf(round) === 0 && neat) {
        for (const match of round.matches) {
          this.table[match.startRowIndex][rounds.indexOf(round)] = new Cell(match.teamOne, 'n');
          this.table[match.endRowIndex][rounds.indexOf(round)] = new Cell(match.teamTwo, 'u');
        }
      } else if (rounds.indexOf(round) <= 1 && !neat) {
        for (const match of round.matches) {
          this.table[match.startRowIndex][rounds.indexOf(round)] = new Cell(match.teamOne, 'n');
          this.table[match.endRowIndex][rounds.indexOf(round)] = new Cell(match.teamTwo, 'u');
        }
      } else {
        for (const match of round.matches) {
          this.table[match.startRowIndex][rounds.indexOf(round)].class = 'n';
          this.table[match.endRowIndex][rounds.indexOf(round)].class = 'u';
        }
      }
    }

    return this.table;
  }

  /**
   * Adds the lines to connect the matches
   */
  setlines(neat: boolean, rounds: Round[]): Cell[][] {
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
            this.table[match.endRowIndex + i][rounds.indexOf(round) - 1].class += ' right';
            this.table[match.startRowIndex - i][rounds.indexOf(round) - 1].class += ' right';
          }
        }
      }
    }
    return this.table;
  }
}

