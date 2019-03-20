import { iTeam } from './iTeam.interface';

export class Team implements iTeam{
    TeamName: string;
    TeamsID?: number;
    players?: string[];
    Seed: number;         //zero-based position of the team in terms of playing ability
    captian: string;
    constructor(
        seed?: number,
        name?: string,
        players?: string[],
        captain?: string
    ) {
        this.TeamName = name;
        this.players = players;
        this.Seed = seed;
        this.captian = captain;
    }

    init(team: iTeam): Team {
      if (team) {
        Object.assign(this, team);
      }

      return this;
    }
}
