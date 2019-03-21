import { iTeam } from '../interfaces/iTeam.interface.js';
import * as express from 'express';
import { DbManager } from '../db/dbManager';

//server side api
export class TeamService {
  private _dbManager: DbManager;

  constructor(app: express.Application) {
    this._dbManager = new DbManager();

    //api function to create a team in the database
    const createTeamHandler = (req: express.Request, res: express.Response,
                               next: express.NextFunction) => {
      const myTeam: iTeam = req.body;
      this._dbManager.addTeam(myTeam).then(
        (myTeam: iTeam) => { res.send(myTeam); },
        (err: Error) => { res.status(500).send( { message: err.message }); }
      );
    };
    app.post('/api/team', createTeamHandler);

    //api function to get all the teams from the database
    const readTeamsHandler = (req: express.Request, res: express.Response,
                              next: express.NextFunction) => {
      const myTeams: iTeam[] = req.body;
      this._dbManager.getTeams().then(
        (myTeams: iTeam[]) => { res.send(myTeams); },
        (err: Error) => { res.status(500).send({message: err.message}); }
      );
    };
    app.get('/api/team', readTeamsHandler);
  }
}


//   app.post('/api/team-service',
//     (req: express.Request, res: express.Response,
//       next: express.NextFunction) => {})
// //
// //       this._dbManager.addTeam(this, (err: Error, team: iTeam) => {
// //   if (err) {
// //     return cb(err);
// //   } else {
// //   return cb(team);
// // }
// // });
// //
// // this._dbManager.sadd('team-service', request.TeamName,
// //   (err: any, replies: any) => {
// //     console.log(`
// //           Reply: ${replies}.`);
// //
// //     res.json({success: true});
// //   });
// //
// // this._dbManager.quit();
// // });
//
// // Read(cb: any): any {
//   //   // Then read the team
//   //   this._dbManager.readTeam(this, (err: Error, team: iTeam) => {
//   //     if (err) {
//   //       return cb(err);
//   //     } else {
//   //       return cb(team);
//   //     }
//   //   });
//   // }
//   // Update(cb: any): any {
//   //   // Then save the team
//   //   this._dbManager.updateTeam(this, (err: Error, team: iTeam) => {
//   //     if (err) {
//   //       return cb(err);
//   //     } else {
//   //       return cb(team);
//   //     }
//   //   });
//   // }
//   // Delete(cb: any): any {
//   //   // Then save the team
//   //   this._dbManager.deleteTeam(this, (err: Error, team: iTeam) => {
//   //     if (err) {
//   //       return cb(err);
//   //     } else {
//   //       return cb(team);
//   //     }
//   //   });
//   // }
// }
//
