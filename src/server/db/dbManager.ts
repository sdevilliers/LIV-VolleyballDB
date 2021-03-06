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

  // updateTeam(team: iTeam): Promise<iTeam> {
  //   return this.TeamExists(team.TeamsID).then((result: Boolean) => {
  //     if (result === false) {
  //       Promise.reject('The team does not exist');
  //       //TODO do something useful here
  //       console.log('Unable to update ' + team.TeamName + ' because the team does not exist in the database');
  //     } else {
  //       return this.models.teams.patch({
  //         TeamID: team.TeamsID,
  //         TeamName: team.TeamName,
  //         Seed: team.Seed,
  //         captian: team.captian,
  //         playerTwo: team.playerTwo,
  //         playerThree: team.playerThree,
  //         playerFour: team.playerFour,
  //         playerFive: team.playerFive,
  //         playerSix: team.playerSix
  //       });
  //     }
  //   });
  // }

}

//   validateUser(user: iTeam, password: string) {
//     /** Setup a 256 bytes or 32 characters secret with the randomstring package */
//     return decryptSync(user.playerTwo, user.playerSix) === password;
//   }
//
//   getUserByUserName(userName: String, callBack: any) {
//     this.models.users.findOne({
//       where: {userName: userName}
//     }).then((user: any) => {
//         return callBack(null, user);
//       },
//       (err: Error) => {
//         return callBack(err);
//       }
//     ).catch((reason: string) => {
//       return callBack(new Error(reason));
//     });
//   }
//
//   getAllUsers(callBack: any)
//   {
//     //Test code to use without Database
//     //var testUsers = [{TeamID: 1, captian: 'Test', Status: true, role: {TeamID: 1, Name: 'Admin'}},{TeamID: 2, captian: 'AnotherTest', Status: false, role: {TeamID: 3, Name: 'Guest'}}];
//     //return callBack(null,testUsers);
//     //Live Code
//     this.models.users.findAll(
//       {
//         include: [{ model: this.models.roles}]
//       })
//       .then( function(users: any)
//       {
//         return callBack(null, users);
//       },
//       function(err: Error)
//       {
//         return callBack(err);
//       }
//     );
//   }
//
//   getUniqueTeam(teamID: number, teamName: string, callBack: any) {
//     this.models.teams.findOne({
//       where: {userName: teamID, companyId: teamName},
//       include: [{ model: this.models.roles,
//          include: {model: this.models.permissions}}]
//     }).then( (user: any) =>
//       {
//         return callBack(null, user);
//       },
//       (err: Error)  =>
//       {
//         return callBack(err);
//       }
//     ).catch((reason: string) => {
//       return callBack(new Error(reason));
//     });
//   }
//
//   //TODO can we use sequelize datatypes.date??
//   getUserByToken(userToken: string, tokenExpire: string, callBack: any) {
//     this.models.users.findOne({
//       where: {resetPasswordToken: userToken, resetPasswordExpires: tokenExpire},
//       include: [{ model: this.models.roles,
//         include: {model: this.models.permissions}}]
//     }).then( (user: any) =>
//         {
//           return callBack(null, user);
//         },
//         (err: Error)  =>
//         {
//           return callBack(err);
//         }
//     ).catch((reason: string) => {
//       return callBack(new Error(reason));
//     });
//   }
//
//   getUserById(userId: string, callBack: any) {
//     this.models.users.findOne({
//       where: {id: userId},
//       include: [{ model: this.models.roles,
//         include: {model: this.models.permissions}}]
//     }).then( (user: any) =>
//         {
//           return callBack(null, user);
//         },
//         (err: Error)  =>
//         {
//           return callBack(err);
//         }
//     ).catch((reason: string) => {
//       return callBack(new Error(reason));
//     });
//   }
//
//   getUserRole(userName: string, callBack: any) {
//     this.models.users.findOne(
//       {
//         where: {captian: userName},
//         include: [{model: this.models.roles}]
//       }).then(function (user: any) {
//         //TODO not sure if we need to go get role from the roleID on the user or not... this may bomb
//         return callBack(null, user.role);
//       },
//       function (err: Error) {
//         return (callBack(err));
//       });
//   }
//   //endregion DB user access
//
//   //region DB Role access
//
//   getAllRoles(callBack: any) {
//     //Test code to use without Database
//     //var testRoles = [{TeamID: 1, Name: 'Admin'},{TeamID: 2, Name: 'Sales'}, {TeamID: 3, Name: 'Guest'}]
//     //return(callBack(null,testRoles));
//     //Live Code
//     this.models.roles.findAll().then(
//       function(roles: any){ return(callBack(null, roles)); },
//       function(err: Error) { return callBack(err); }
//     );
//   }
//
//   getRoleById(id: Number, callBack: any) {
//     this.models.roles.findOne({
//       where: {TeamID: id}
//     }).then(function(role: any)
//     {
//       return callBack(null, role);
//     },
//     function(err: Error)
//     {
//       return(callBack(err));
//       return callBack(null, retVal);
//     },
//       function(err: Error)
//       {
//         return callBack(err);
//       });
//   }
// });
// }
//
// permissionNameExists(TeamName: string, callBack: any)
// {
//   this.getPermissionByName(TeamName, (err: Error, result: any) =>
//   {
//     if (err)
//     {
//       return callBack(err);
//     }
//     else
//     {
//       return (callBack(null, result !== null));
//     }
//   });
// }
//
// addRoleToPermission(roleId: number, permissionId: number, callBack: any)
// {
//   const retVal = false;
//   this.permissionToRoleExists(roleId, permissionId, (err: Error, result: Boolean) =>
//   {
//     if (err || result === true)
//     {
//       callBack(err, retVal);
//     }
//     else
//     {
//       this.models.rolePermissions.create({RoleId: roleId, PermissionId: permissionId}).then(
//         (response: any) =>
//         {
//           this.getPermissionForRole(roleId, permissionId, callBack);
//         },
//         (err: Error) =>
//         {
//           callBack(err, null);
//         }
//       );
//     }
//   });
// }
//
// deleteRolePermission(roleId: string, permissionId: string, callBack: any)
// {
//   this.models.rolePermissions.destroy({
//     where: {RoleId: roleId, PermissionId: permissionId}
//   }).then(
//     (result: any) =>
//     {
//       callBack(null, true);
//     },
//     (err: Error) =>
//     {
//       callBack(err);
//     }
//   );
// }
//
// deletePermissionCascadeDeleteRolePermissions(permissionId: string, callBack: any)
// {
//   //This will need to cascade delete by deleting all RolePermissions records with this permission as well
//   this.models.rolePermissions.destroy({
//     where: {PermissionId: permissionId}
//   }).then(function()
//     {
//       this.models.permissions.destroy({
//         where: {TeamID: permissionId}
//       }).then(function (result: any) {
//           callBack(null, result);
//         },
//         function (err: Error) {
//           callBack(err);
//         });
//     },
//     function(err: Error) {
//       callBack(err);
//     });
// }
//
// permissionToRoleExists(roleId: number, permissionId: number, callBack: any)
// {
//   this.models.rolePermissions.findOne({
//     where: {RoleId: roleId, PermissionId: permissionId}
//   }).then(function(result: any)
//     {
//       callBack(null, result !== null);
//     },
//     function(err: Error)
//     {
//       callBack(err);
//     });
// }
//
// getAllPermissionsForAllRoles(callBack: any)
// {
//   this.models.permissions.findAll(
//     {
//       include: [{model: this.models.roles}]
//     }
//   ).then(function(permissionList: any)
//     {
//       return(callBack(null, permissionList));
//     },
//     function(err: Error){
//       return(callBack(err));
//     });
// }
//
// getPermissionForRole(roleId: number, permissionId: number, callBack: any)
// {
//   this.models.rolePermissions.findOne(
//     {
//       where: {RoleId: roleId, PermissionId: permissionId},
//       include: [{model: this.models.roles}, {model: this.models.permissions}],
//     }
//   ).then(function(rolePermission: any)
//     {
//       return(callBack(null, rolePermission));
//     },
//     function(err: Error)
//     {
//       return(callBack(err));
//     });
// }
//
// getUserNamesWithPermission(permissionName: string, callBack: any)
// {
//   this.models.users.findAll(
//     {
//       attributes: ['captian'],
//       include: [{
//         model: this.models.roles,
//         required: true,
//         include: {
//           model: this.models.permissions,
//           where: { Name: permissionName },
//           attributes: []
//         },
//         attributes: []
//       }]
//     }
//   ).then(function(userNameList: any)
//     {
//       return(callBack(null, userNameList));
//     },
//     function(err: Error)
//     {
//       return(callBack(err));
//     });
// }
//
// //endregion DB permission access
// });
// }
//
// getRoleByName(TeamName: string, callBack: any)
// {
// this.models.roles.findOne({
// where: {Name: TeamName}
// }).then(function(role: any)
// {
// return callBack(null, role);
// },
// function(err: Error)
// {
// return(callBack(err));
// });
// }
//
// //endregion DB Role access
//
// //region DB permission access
//
// getPermissionById(id: Number, callBack: any)
// {
// this.models.permissions.findOne({
// where: {TeamID: id}
// }).then(function(permission: any)
// {
// return callBack(null, permission);
// },
// function(err: Error)
// {
// return(callBack(err));
// });
// }
//
// getPermissionByName(TeamName: string, callBack: any)
// {
// this.models.permissions.findOne({
// where: {Name: TeamName}
// }).then(
// function(permission: any){ return (callBack(null, permission)); },
// function(err: Error) { return(callBack(err)); });
// }
//
// getPermissionsByRoleId(roleId: number, callBack: any)
// {
// this.models.rolePermissions.findAll({
// where: {RoleId: roleId},
// include: [{model: this.models.permissions}]
// }).then(function(permissionsList: any[])
// {
// return(callBack(null, permissionsList));
// },
// function(err: Error)
// {
// return callBack(err);
// });
// }
//
// getRolesByPermissionId(permissionId: number, callBack: any)
// {
// this.models.rolePermissions.findAll({
// where: {PermissionId: permissionId}
// }).then(function(roleList: any[])
// {
// return(callBack(null, roleList));
// },
// function(err: Error)
// {
// return callBack(err);
// }
// );
// }
//
// addPermission(TeamName: string, callBack: any)
// {
// this.permissionNameExists(TeamName, (err: Error, result: Boolean) =>
// {
// if (err || result === true)
// {
// return(callBack(err, {message: 'Unable to add permission'}));
// }
// else
// {
// const permission = new this.models.permissions();
// permission.Name = TeamName;
// permission.save().then(function(retVal: any)
// {
//
// }
