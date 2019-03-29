import { Component, Input, Output, EventEmitter, OnChanges, OnInit } from '@angular/core';
import { Team } from '../../shared/team';

@Component({
  moduleId: module.id,
  selector: 'vb-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})

export class CellComponent implements OnChanges, OnInit{
  @Input() team: Team;
  @Input() teamChoices: Team[];
  @Input() tdClass: string;
  position: string;
  selectedValue: Team = null;

  @Output() cellClicked: EventEmitter<string> = new EventEmitter<string>();
  disabled: string;

  constructor(){ //team: Team = new Team(), cls: string = 'blank'
    //this.team = team;
    //this.class = cls;
  }

  ngOnChanges(): void {
  }
  onClick(): void {
    this.cellClicked.emit(`The team ${this.team.TeamName} was clicked!`);
  }

  ngOnInit(): void {
    this.selectedValue = this.teamChoices[this.team.Seed - 1];
    this.position = `Team ${this.team.Seed}`;
  }
}
