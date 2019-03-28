import { Team } from '../../shared/team';

export class Cell {
    team: Team;
    class: string;

    constructor(team: Team = new Team(), cls: string = 'blank'){
        this.team = team;
        this.class = cls;
    }
}
