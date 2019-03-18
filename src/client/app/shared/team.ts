import { iTeam } from './iTeam.interface';

export class Team implements iTeam {
    TeamsID: number;
    TeamName: string;
    Seed: number; //zero-based position of the team in terms of playing ability
    players: string[];
    captain: string;
    constructor(
        seed: number = -1,
        name: string = '',
        players: string[] = [''],
        captain: string = ''
    ) {
        this.TeamName = name;
        this.players = players;
        this.Seed = seed;
        this.captain = captain;
    }
}
