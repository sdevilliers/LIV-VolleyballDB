export class Team {
    name: string;
    players: string[];
    seed: number;         //zero-based position of the team in terms of playing ability
    captain: string;
    constructor(
        seed?: number,
        name?: string,
        players?: string[],
        captain?: string
    ) {
        this.name = name;
        this.players = players;
        this.seed = seed;
        this.captain = captain;
    }
}
