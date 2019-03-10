export class Cell {
    teamName: string;
    class: string;

    constructor(name: string = ' ', cls: string = 'blank'){
        this.teamName = name;
        this.class = cls;
    }
}
