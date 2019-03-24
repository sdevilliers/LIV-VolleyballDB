import { Component, OnInit } from '@angular/core';
import { Team } from '../shared/team';
import { TeamService } from '../shared/team.service';
import { iTeam } from '../shared/iTeam.interface';
import { Router } from '@angular/router';

@Component({
  moduleId: module.id,
  selector: 'vb-team-service',
  templateUrl: './team-manager.component.html',
  styleUrls: ['./team-manager.component.css']
})
export class TeamManagerComponent implements OnInit {

  teams: iTeam[] = [];
  errorMessage: string;
  pageTitle = 'Player List';
  _listFilter: string;
  filteredTeams: iTeam[];
  imageWidth = 50;
  imageMargin = 2;
  showImage = false;

  constructor(private teamService: TeamService,
              private router: Router) {
    if (this.teams === undefined) {
      this.teams = [];
    }
  }

  ngOnInit() {
    this.teamService.getMysqlTeams().subscribe(
      teams => {
        this.teams = teams,
          this.filteredTeams = this.teams;
      },
      error => this.errorMessage = <any>error
    );
  }

  get listFilter(): string {
    return this._listFilter;
  }
  set listFilter(value: string){
    this._listFilter = value;
    this.filteredTeams = this.listFilter ? this.performFilter(this.listFilter) : this.teams;
  }

  performFilter(filterBy: string): iTeam[] {
    filterBy = filterBy.toLocaleLowerCase();
    return this.teams.filter(
      (team: iTeam) =>
      team.TeamName.toLocaleLowerCase().indexOf(filterBy) !== -1
    );
  }

  toggleImage(): void {
    this.showImage = !this.showImage;
  }

  onRatingClicked(message: string): void {
    this.pageTitle = 'Player List ' + message;
  }

  newTeam() {
    this.router.navigate(['/team-manager', 'new']);
  }
}
