import { iTeam } from '../interfaces/iTeam.interface.js';

const dbUrl = 'localhost';
const urlPort = '3306'; //optional ex. ':1433';
const dbName = 'livvolleyball_database';
const dbUserName = 'sdevilliers';
const dbPassword = 'Fr!dg3s1';
const dbDialect = 'mysql';
const dbModelPath = './Models';
const SequelizeImporter = require('sequelize-auto-import');
const Sequelize = require('sequelize');
const op = Sequelize.Op;

/**
 * <div class="text-info bg-info">
 *      This class provides the link between the server api and the Mysql database.
 *      It connects to the Mysql database host using Express and Sequelize
 * </div>
 */
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

  createTeam(team: iTeam): Promise<iTeam> {
    return this.teamNameAlreadyExists(team).then((result: Boolean) => {
      if (result === true) {
        //TODO do something useful here
        console.log('Unable to add team: ' + team.TeamName);
        return Promise.reject('The team already exists');
      } else {
        return this.models.teams.create({
          TeamsID: undefined,
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

  readTeams(): Promise<iTeam[]> {
    return this.models.teams.findAll();
  }

  updateTeam(team: iTeam): Promise<iTeam> {
    return this.models.teams.update(
      {
        TeamID: team.TeamsID,
        TeamName: team.TeamName,
        Seed: team.Seed,
        captian: team.captian,
        playerTwo: team.playerTwo,
        playerThree: team.playerThree,
        playerFour: team.playerFour,
        playerFive: team.playerFive,
        playerSix: team.playerSix
      },
      {
        where: {TeamsID: team.TeamsID}
      }
    );
  }

  teamNameAlreadyExists(team: iTeam): Promise<boolean> {
    // const myPrimaryPhone: iUserPhone = phoneNumbers.find((phone: iUserPhone) => {
    //   return phone.IsPrimary === true;
    // });

    return this.models.teams.findOne(
      {
        where: {teamName: team.TeamName}
      }
    ).then((retVal: any) => {
      return retVal !== null;
    });
  }

  deleteTeam(teamID: string): Promise<any> {
    return this.models.teams.destroy({
      where: {TeamsID: teamID}
    });
  }
}
