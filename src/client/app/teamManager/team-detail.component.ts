import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TeamService } from '../shared/team.service';
import { Team } from '../shared/team';


@Component({
  moduleId: module.id,
  selector: 'vb-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  pageTitle = 'Team Detail';
  errorMessage = '';
  team: Team | undefined;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private teamService: TeamService) {
  }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      const id = +param;
      this.getTeam(id);
    }
  }

  getTeam(id: number) {
    this.teamService.getTeam(id).subscribe(
      (team: any) => {
        this.team = team;
        },
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/team-manager']);
  }

}
