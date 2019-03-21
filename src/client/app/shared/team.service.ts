import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Team } from './team';
import { iTeam } from './iTeam.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = 'assets/teams.json'; //TODO refactor the json file in both client and server side

  constructor(private http: HttpClient) { }

  getTeams(): Observable<Team[]> {
    return this.http.get<iTeam[]>(this.teamUrl).pipe(
      map(this.mapiTeamsToTeams),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getTeam(id: number): Observable<Team | undefined> {
    return this.http.get<iTeam[]>(this.teamUrl).pipe(
      map((myiTeams: iTeam[]) =>
      {
          const teams: any = this.mapiTeamsToTeams(myiTeams);
          const retVal = teams.find((t: Team) => t.TeamsID === id);
          return retVal;
      }));
  }

  private mapiTeamsToTeams(teams: iTeam[]): Team[] {
    const retVal: Team[] = [];
    teams.forEach((team: iTeam) => {
      retVal.push(new Team().init(team));
    });

    return retVal;
  }
  // public addMysqlTeamDatas(_firstname: string, _lastname: string) {
  //   const url = 'http://www.***YOUR_WEBSERVER***/post_users.php';
  //   const headers = new Headers();
  //   headers.append('Content-Type', 'application/x-www-form-urlencoded');
  //   return this._http.post(url, { id: '', firstname: _firstname, lastname: _lastname }, { headers: headers })
  //     .map((res: Response) => res.text())
  //     .subscribe(res => {
  //       console.log(res.toString());
  //     });
  // }

  // public getMysqlTeamDatas() {
  //   return this._http.get('http://www.***YOUR_WEBSERVER***/get_users.php')
  //     /*.do(x => console.log(x))**/
  //     .map(rep => rep.json());
  // }

  // public getLocalTextDatas() {
  //   return this.http.get<Team[]>('./assets/read.txt').pipe(
  //     tap(data => console.log("All: " + JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
