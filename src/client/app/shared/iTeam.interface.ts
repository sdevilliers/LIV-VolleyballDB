/**
 * <div class="text-info bg-info">
 *     This interface is used to connect to the server-side api
 * </div>
 */

/* tslint:disable-next-line:class-name */
export interface iTeam {
  TeamsID?: number;
  TeamName: string;
  Seed: number;
  captian?: string; //TODO change 'captian' to 'captian' and decapitate the first three
  playerTwo?: string;
  playerThree?: string;
  playerFour?: string;
  playerFive?: string;
  playerSix?: string;
}
