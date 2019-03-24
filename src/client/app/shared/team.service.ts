import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

import { Team } from './team';
import { iTeam } from './iTeam.interface';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  jsonFileUrl = 'assets/teams.json'; //TODO refactor the json file in both client and server side
  MysqlUrl = '/api/team';
  // private textUrl =

  constructor(private http: HttpClient) { }

  getJsonTeams(): Observable<Team[]> {
    return this.http.get<iTeam[]>(this.jsonFileUrl).pipe(
      map(this.mapiTeamsToTeams),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getJsonTeam(id: number): Observable<Team | undefined> {
    return this.http.get<iTeam[]>(this.jsonFileUrl).pipe(
      map(this.mapiTeamsToTeams),
      map((teams: Team[]) => { return teams.find(t => t.TeamsID === id); })
    );
  }

  createMysqlTeam(team: iTeam): Observable<iTeam> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.post<iTeam>(this.MysqlUrl, team, options);
  }

  getMysqlTeams(): Observable<Team[]> {
    return this.http.get<iTeam[]>(this.MysqlUrl).pipe(
      map(this.mapiTeamsToTeams),
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getMysqlTeam(id: number): Observable<Team | undefined> {
    return this.http.get<iTeam[]>(this.MysqlUrl).pipe(
      map(this.mapiTeamsToTeams),
      map((teams: Team[]) => { return teams.find(t => t.TeamsID === id); })
    );
  }

  updateMySqlTeam(team: iTeam): Observable<iTeam> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const options = {
      headers: httpHeaders
    };
    return this.http.patch<iTeam>(this.MysqlUrl, team, options);
  }

  deleteMySqlTeam(team: iTeam): Observable<iTeam> {
    const httpHeaders = new HttpHeaders()
      .set('Content-Type', 'application/json');
    const params = new HttpParams().append('teamID', team.TeamsID.toString());
    const options = {
      httpHeaders: httpHeaders,
      params: params
    };
    return this.http.delete<iTeam>(this.MysqlUrl, options);
  }

  private mapiTeamsToTeams(teams: iTeam[]): Team[] {
    const retVal: Team[] = [];
    teams.forEach((team: iTeam) => {
      retVal.push(new Team().init(team));
    });
    teams.forEach((team: iTeam) => {
      retVal[teams.indexOf(team)].players = [team.captian, team.playerTwo, team.playerThree, team.playerFour, team.playerFive, team.playerSix];
    });

    return retVal;
  }

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
