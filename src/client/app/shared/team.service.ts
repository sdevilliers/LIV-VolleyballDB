import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import { Team } from './team';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  private teamUrl = 'assets/teams.json';

  constructor(private http: HttpClient) { }

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

  getLocalTeamDatas(): Observable<Team[]> {
    return this.http.get<Team[]>(this.teamUrl).pipe(
      tap(data => console.log('All: ' + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  // public getLocalTextDatas() {
  //   return this.http.get<Team[]>('./assets/read.txt').pipe(
  //     tap(data => console.log("All: " + JSON.stringify(data))),
  //     catchError(this.handleError)
  //   );
  // }

  private handleError(err: HttpErrorResponse) {
    //in a real worls app, we may send the server to some remote logging infastructure
    //instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // a client-side or network error occured. Handle it accordingly.
      errorMessage = 'An error occured: ' + err.error.message;
    } else {
      // the backend returned an unsucessful response code.
      // the response body may contain clues as to what went wrong.
      errorMessage = 'Server returned code: ' + err.status + ', error message is: ' + err.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
