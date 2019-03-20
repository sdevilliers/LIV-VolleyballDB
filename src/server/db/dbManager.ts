//import { iTeam } from '../interfaces/iTeam.interface.js';

const dbUrl = 'localhost';
const urlPort = '3306'; //optional ex. ':1433';
const dbName = 'starQuoter';
const dbUserName = 'zenware';
const dbPassword = 'z3nwar333!';
const dbDialect = 'mysql';
const dbModelPath = './Models';
const SequelizeImporter = require('sequelize-auto-import');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

export class DbManager {
  protected _dbConnection = new Sequelize(
    dbName,
    dbUserName,
    dbPassword,
    {
      host: dbUrl,
      dialect: dbDialect
    }
  );

  protected models = new SequelizeImporter(this._dbConnection, dbModelPath);

  //region DB user access

  addTeam(team: any): Promise<any> {
    return this.TeamExists(team.TeamsID).then((result: Boolean) => {
      if (result === true) {
        Promise.reject('The team already exists');
        //TODO do something useful here
        console.log('Unable to add team: ' + team.TeamName);
      } else {
        return this.models.team.create({
          TeamID: team.TeamsID,
          TeamName: team.TeamName,
          Seed: team.Seed,
          captian: team.captian,
          playerTwo: team.playerTwo,
          playerThree: team.playerThree,
          playerFour: team.playerFour,
          playerFive: team.playerFive,
          playerSix: team.playerSix
        });
      }
    });
  }

  TeamExists(teamID: number): Promise<boolean> {
    return Promise.resolve(false);
  }

  getTeams(): Promise<any[]> {
    return this.models.team.findAll();
  }
}
