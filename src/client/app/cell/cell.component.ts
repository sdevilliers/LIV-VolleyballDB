import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Team } from '../shared/team';

@Component({
  moduleId: module.id,
  selector: 'vb-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnChanges{
  @Input() team: Team;
  class: string;
  position: string;

  @Output() cellClicked: EventEmitter<string> = new EventEmitter<string>();

  //TODO decide if you want to use this as a component with an input
  //OR and object that uses a constructor to create a new team. Double input causes issues.
  constructor(){ //team: Team = new Team(), cls: string = 'blank'
    //this.team = team;
    //this.class = cls;
  }

  ngOnChanges(): void {
    console.log('ngOnChanges for cell component');
  }
  onClick(): void {
    this.cellClicked.emit(`The team ${this.team.TeamName} was clicked!`);
  }
}
