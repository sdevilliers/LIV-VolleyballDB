/**
 * <div class="text-info bg-info">
 *     This interface is used to connect to the client-side service TeamService
 * </div>
 */
export interface iTeam {
  TeamsID: number;
  TeamName: string;
  Seed: number;
  captian?: string;
  playerTwo?: string;
  playerThree?: string;
  playerFour?: string;
  playerFive?: string;
  playerSix?: string;
}




