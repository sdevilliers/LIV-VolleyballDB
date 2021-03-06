import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Team } from '../../shared/team';

@Component({
  moduleId: module.id,
  selector: 'vb-match',
  templateUrl: './match.component.html',
  styleUrls: ['./match.component.css']
})
/**
 * NOT CURRENTLY FUNCTIONAL. TO BE ADDED LATER.
 */
export class MatchComponent implements OnChanges{
  @Input() teamOne: Team;
  @Input() teamTwo: Team;
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
    this.cellClicked.emit(`The team ${this.teamOne.TeamName} was clicked!`);
  }
}
