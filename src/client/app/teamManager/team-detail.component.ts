import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { iTeam } from '../shared/iTeam.interface';
import { TeamService } from '../shared/team.service';


@Component({
  moduleId: module.id,
  selector: 'vb-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  pageTitle = 'Team Detail';
  errorMessage = '';
  team: iTeam | undefined;

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
      team => this.team = team,
      error => this.errorMessage = <any>error);
  }

  onBack(): void {
    this.router.navigate(['/team-manager']);
  }

}
