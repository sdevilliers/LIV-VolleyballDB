import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Config } from './config/env.config';

import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { iTeam } from './iTeam.interface';
import { containsElement } from '@angular/animations/browser/src/render/shared';

// This class provides the Team Service with methods to read teams and add teams.
@Injectable({ providedIn: 'root' })
export class TeamService {

  // Creates a new TeamService with the injected HttpClient.
  constructor(private http: HttpClient) {}

  // Returns an Observable for the HTTP GET request for the JSON resource.
  // @return {string[]} The Observable for the HTTP request.
  getTeams(): Observable<iTeam[]> {
    return this.http.get<iTeam[]>(`${Config.API}/api/team`)
      .pipe(
        //                tap((data: string[]) => console.log('server data:', data)), // debug
        catchError(this.handleError)
      );
  }

  addTeam(myTeam: iTeam): Observable<iTeam> {
    return this.http.post<iTeam>(`${Config.API}/api/team`, { TeamsID: '', TeamName: myTeam.TeamName, Seed: myTeam.Seed })
      .pipe(
        //                tap((data: string[]) => console.log('server data:', data)), // debug
        catchError(this.handleError)
      );
  }

  // Handle HTTP error
  private handleError (error: any) {
    // In other app versions, I might use a remote logging infrastructure
    // I might also dig deeper into the error to get a better message
    const errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead

    return of(errMsg);
  }
}



// Spare Code for use in later app versions

// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';
// import { Team } from '../shared/team';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class TeamService {
//
//   private teamUrl = 'assets/teams.json';
//
//   constructor(private http: HttpClient) { }
//
//   public addMysqlTeamDatas(_firstname: string, _lastname: string) {
//     const url = 'http://www.***YOUR_WEBSERVER***!/post_users.php';
//     const headers = new Headers();
//     headers.append('Content-Type', 'application/x-www-form-urlencoded');
//     return this._http.post(url, { TeamsID: '', firstname: _firstname, lastname: _lastname }, { headers: headers })
//       .map((res: Response) => res.text())
//       .subscribe(res => {
//         console.log(res.toString());
//       });
//   }
//
//   public getMysqlTeamDatas() {
//     return this._http.get('http://www.***YOUR_WEBSERVER***!/get_users.php')
//       /!*.do(x => console.log(x))**!/
//       .map(rep => rep.json());
//   }
//
//   getLocalTeamDatas(): Observable<Team[]> {
//     return this.http.get<Team[]>(this.teamUrl).pipe(
//       tap(data => console.log('All: ' + JSON.stringify(data))),
//       catchError(this.handleError)
//     );
//   }
//
//   public getLocalTextDatas() {
//     return this.http.get<TeamService[]>('./assets/read.txt').pipe(
//       tap(data => console.log("All: " + JSON.stringify(data))),
//       catchError(this.handleError)
//     );
//   }
//
//   private handleError(err: HttpErrorResponse) {
//     //in a real world app, we may send the server to some remote logging infrastructure
//     //instead of just logging it to the console
//     let errorMessage = '';
//     if (err.error instanceof ErrorEvent) {
//       // a client-side or network error occured. Handle it accordingly.
//       errorMessage = 'An error occured: ' + err.error.message;
//     } else {
//       // the backend returned an unsucessful response code.
//       // the response body may contain clues as to what went wrong.
//       errorMessage = 'Server returned code: ' + err.status + ', error message is: ' + err.message;
//     }
//     console.error(errorMessage);
//     return throwError(errorMessage);
//   }
//   }

