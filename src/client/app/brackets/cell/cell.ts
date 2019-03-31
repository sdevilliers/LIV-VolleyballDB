import { Team } from '../../shared/team';

/**
 * <div class="text-info bg-info">
 *     This Class represents a cell in the two dimensional array within Bracket Table.
 * </div>
 */
export class Cell {
    team: Team;
    class: string;

  /**
   * Sets the Team and CSS class name
   * @param team The team that will be displayed in this cell. If undefined it will display a blank cell
   * @param cls CSS class that controls how this cell will look
   */
    constructor(team: Team = new Team(), cls: string = 'blank'){
        this.team = team;
        this.class = cls;
    }
}
