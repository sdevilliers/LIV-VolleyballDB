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
  @Input() class: string;
  position: string;

  @Output() cellClicked: EventEmitter<string> = new EventEmitter<string>();

  constructor(){ //team: Team = new Team(), cls: string = 'blank'
    //this.team = team;
    //this.class = cls;
  }

  ngOnChanges(): void {
    console.log('ngOnChanges for cell component');
  }
  onClick(): void {
    this.cellClicked.emit(`The team ${this.team.name} was clicked!`);
  }
}
