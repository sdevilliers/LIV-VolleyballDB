import { iTeam } from '../interfaces/iTeam.interface.js';
import * as express from 'express';
import { DbManager } from '../db/dbManager';

/**
 * <div class="text-info bg-info">
 *     This class is a service that represents the server-side api
 *     Uses the dbManager class to make changes to the database
 * </div>
 */
export class TeamService {
  private _dbManager: DbManager;

  constructor(app: express.Application) {
    this._dbManager = new DbManager();

    /**
     * creates a team in the database
     * @param req The http request from the client side
     * @param res The http response containing a copy of the team data that was inserted into the database
     */
    const createTeamHandler = (req: express.Request, res: express.Response) => {
      const myTeam: iTeam = req.body;
      this._dbManager.createTeam(myTeam).then(
        (myTeam: iTeam) => {
          res.send(myTeam);
        },
        (err: Error) => {
          res.status(500).send({message: 'createTeam error: ' + err.message});
        }
      );
    };
    app.post('/api/team', createTeamHandler);

    /**
     * Reads all the teams from the database and sends the data to the client-side
     * @param req The http request from the client side
     * @param res The http response containing all the team data in the database
     */
    const readTeamsHandler = (req: express.Request, res: express.Response) => {
      this._dbManager.readTeams().then(
        (myTeams: iTeam[]) => {
          res.send(myTeams);
        },
        (err: Error) => {
          res.status(500).send({message: 'readTeams error: ' + err.message});
        }
      );
    };
    app.get('/api/team', readTeamsHandler);

    /**
     * Updates a team in the database and sends a copy of the updated team to the client-side
     * @param req The http request from the client side
     * @param res The http response containing the team that was updated in the database
     */
    const updateTeamHandler = (req: express.Request, res: express.Response, next: express.NextFunction) => {
      const myTeam: iTeam = req.body;
      this._dbManager.updateTeam(myTeam).then(
        (myTeam: iTeam) => {
          res.send(myTeam);
        },
        (err: Error) => {
          res.status(500).send({message: 'updateTeam error: ' + err.message});
        }
      );
    };
    app.patch('/api/team', updateTeamHandler);

    //api function to delete a team already in the database
    /**
     * Deletes a team in the database and sends back 'true' on completion
     * @param req The http request from the client side
     * @param res The http response containing the boolean that signals success
     */
    const deleteTeamsHandler = (req: express.Request, res: express.Response, next: any) => {
      const teamID = req.params.teamID;
      this._dbManager.deleteTeam(teamID.toString()).then(
        (x: any) => {
          if (x != null) {
            res.send(true);
          }
        },
        (err: Error) => {
          res.status(500).send({message: 'delete team error: ' + err.message});
        }
      );
    };
    app.delete('/api/team/:teamID', deleteTeamsHandler);
  }
}
