import { iUser } from '../interfaces/iUser.interface.js';

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
const Scriptify = require('scryptify');
const decryptSync = Scriptify.decryptSync;
const encryptSnyc = Scriptify.encryptSync;

export class DbManager
{
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

  addUser(user: iUser, cb: any) {
    this.userNameExists(user.userName, user.companyId, (err: Error, result: Boolean) => {
      if (err || result === true)
      {
        //TODO do something useful here
        console.log('Unable to add users: ' + user.userName);
      }
      else
      {
        this.models.user.create({
          Id: user.id,
          UserName: user.userName,
          Email: user.emailAddress,
          Password: user.password,
          Salt: user.salt,
          RoleId: user.roleId,
          FirstName: user.firstName,
          LastName: user.lastName}).Then
        (
            (result: any) => { return cb( null, result); },
            (err: Error) => { return cb(err); }
        );
      }
    });
  }

  userNameExists(userName: string, companyId: number, callBack: any)
  {
    this.getUniqueUser(userName, companyId, (err: Error, result: any) =>
    {
      if (err) {
        return callBack(err);
      }
      else
      {
        return (callBack(null, result !== null));
      }
    });
  }

  validateUser(user: iUser, password: string) {
    /** Setup a 256 bytes or 32 characters secret with the randomstring package */
    return decryptSync(user.password, user.salt) === password;
  }

  getUserByUserName(userName: String, callBack: any) {
    this.models.users.findOne({
      where: {userName: userName}
    }).then((user: any) => {
        return callBack(null, user);
      },
      (err: Error) => {
        return callBack(err);
      }
    ).catch((reason: string) => {
      return callBack(new Error(reason));
    });
  }

  getAllUsers(callBack: any)
  {
    //Test code to use without Database
    //var testUsers = [{Id: 1, UserName: 'Test', Status: true, role: {Id: 1, Name: 'Admin'}},{Id: 2, UserName: 'AnotherTest', Status: false, role: {Id: 3, Name: 'Guest'}}];
    //return callBack(null,testUsers);
    //Live Code
    this.models.users.findAll(
      {
        include: [{ model: this.models.roles}]
      })
      .then( function(users: any)
      {
        return callBack(null, users);
      },
      function(err: Error)
      {
        return callBack(err);
      }
    );
  }

  getUniqueUser(userName: String, companyId: number, callBack: any) {
    this.models.users.findOne({
      where: {userName: userName, companyId: companyId},
      include: [{ model: this.models.roles,
         include: {model: this.models.permissions}}]
    }).then( (user: any) =>
      {
        return callBack(null, user);
      },
      (err: Error)  =>
      {
        return callBack(err);
      }
    ).catch((reason: string) => {
      return callBack(new Error(reason));
    });
  }

  //TODO can we use sequelize datatypes.date??
  getUserByToken(userToken: string, tokenExpire: string, callBack: any) {
    this.models.users.findOne({
      where: {resetPasswordToken: userToken, resetPasswordExpires: tokenExpire},
      include: [{ model: this.models.roles,
        include: {model: this.models.permissions}}]
    }).then( (user: any) =>
        {
          return callBack(null, user);
        },
        (err: Error)  =>
        {
          return callBack(err);
        }
    ).catch((reason: string) => {
      return callBack(new Error(reason));
    });
  }

  getUserById(userId: string, callBack: any) {
    this.models.users.findOne({
      where: {id: userId},
      include: [{ model: this.models.roles,
        include: {model: this.models.permissions}}]
    }).then( (user: any) =>
        {
          return callBack(null, user);
        },
        (err: Error)  =>
        {
          return callBack(err);
        }
    ).catch((reason: string) => {
      return callBack(new Error(reason));
    });
  }

  getUserRole(userName: string, callBack: any) {
    this.models.users.findOne(
      {
        where: {UserName: userName},
        include: [{model: this.models.roles}]
      }).then(function (user: any) {
        //TODO not sure if we need to go get role from the roleID on the user or not... this may bomb
        return callBack(null, user.role);
      },
      function (err: Error) {
        return (callBack(err));
      });
  }
  //endregion DB user access

  //region DB Role access

  getAllRoles(callBack: any) {
    //Test code to use without Database
    //var testRoles = [{Id: 1, Name: 'Admin'},{Id: 2, Name: 'Sales'}, {Id: 3, Name: 'Guest'}]
    //return(callBack(null,testRoles));
    //Live Code
    this.models.roles.findAll().then(
      function(roles: any){ return(callBack(null, roles)); },
      function(err: Error) { return callBack(err); }
    );
  }

  getRoleById(id: Number, callBack: any) {
    this.models.roles.findOne({
      where: {Id: id}
    }).then(function(role: any)
    {
      return callBack(null, role);
    },
    function(err: Error)
    {
      return(callBack(err));
    });
  }

  getRoleByName(name: string, callBack: any)
  {
    this.models.roles.findOne({
      where: {Name: name}
    }).then(function(role: any)
    {
      return callBack(null, role);
    },
    function(err: Error)
    {
      return(callBack(err));
    });
  }

  //endregion DB Role access

  //region DB permission access

  getPermissionById(id: Number, callBack: any)
  {
    this.models.permissions.findOne({
      where: {Id: id}
    }).then(function(permission: any)
      {
        return callBack(null, permission);
      },
      function(err: Error)
      {
        return(callBack(err));
      });
  }

  getPermissionByName(name: string, callBack: any)
  {
    this.models.permissions.findOne({
      where: {Name: name}
    }).then(
      function(permission: any){ return (callBack(null, permission)); },
      function(err: Error) { return(callBack(err)); });
  }

  getPermissionsByRoleId(roleId: number, callBack: any)
  {
    this.models.rolePermissions.findAll({
      where: {RoleId: roleId},
      include: [{model: this.models.permissions}]
    }).then(function(permissionsList: any[])
    {
      return(callBack(null, permissionsList));
    },
    function(err: Error)
    {
      return callBack(err);
    });
  }

  getRolesByPermissionId(permissionId: number, callBack: any)
  {
    this.models.rolePermissions.findAll({
      where: {PermissionId: permissionId}
    }).then(function(roleList: any[])
      {
        return(callBack(null, roleList));
      },
      function(err: Error)
      {
        return callBack(err);
      }
    );
  }

  addPermission(name: string, callBack: any)
  {
    this.permissionNameExists(name, (err: Error, result: Boolean) =>
    {
      if (err || result === true)
      {
        return(callBack(err, {message: 'Unable to add permission'}));
      }
      else
      {
        const permission = new this.models.permissions();
        permission.Name = name;
        permission.save().then(function(retVal: any)
          {
            return callBack(null, retVal);
          },
          function(err: Error)
          {
            return callBack(err);
          });
      }
    });
  }

  permissionNameExists(name: string, callBack: any)
  {
    this.getPermissionByName(name, (err: Error, result: any) =>
    {
      if (err)
      {
        return callBack(err);
      }
      else
      {
        return (callBack(null, result !== null));
      }
    });
  }

  addRoleToPermission(roleId: number, permissionId: number, callBack: any)
  {
    const retVal = false;
    this.permissionToRoleExists(roleId, permissionId, (err: Error, result: Boolean) =>
    {
      if (err || result === true)
      {
        callBack(err, retVal);
      }
      else
      {
        this.models.rolePermissions.create({RoleId: roleId, PermissionId: permissionId}).then(
          (response: any) =>
          {
            this.getPermissionForRole(roleId, permissionId, callBack);
          },
          (err: Error) =>
          {
            callBack(err, null);
          }
        );
      }
    });
  }

  deleteRolePermission(roleId: string, permissionId: string, callBack: any)
  {
    this.models.rolePermissions.destroy({
      where: {RoleId: roleId, PermissionId: permissionId}
    }).then(
      (result: any) =>
      {
        callBack(null, true);
      },
      (err: Error) =>
      {
        callBack(err);
      }
    );
  }

  deletePermissionCascadeDeleteRolePermissions(permissionId: string, callBack: any)
  {
    //This will need to cascade delete by deleting all RolePermissions records with this permission as well
    this.models.rolePermissions.destroy({
      where: {PermissionId: permissionId}
    }).then(function()
      {
        this.models.permissions.destroy({
          where: {Id: permissionId}
        }).then(function (result: any) {
            callBack(null, result);
          },
          function (err: Error) {
            callBack(err);
          });
      },
      function(err: Error) {
        callBack(err);
      });
  }

  permissionToRoleExists(roleId: number, permissionId: number, callBack: any)
  {
    this.models.rolePermissions.findOne({
      where: {RoleId: roleId, PermissionId: permissionId}
    }).then(function(result: any)
      {
        callBack(null, result !== null);
      },
      function(err: Error)
      {
        callBack(err);
      });
  }

  getAllPermissionsForAllRoles(callBack: any)
  {
    this.models.permissions.findAll(
      {
        include: [{model: this.models.roles}]
      }
    ).then(function(permissionList: any)
      {
        return(callBack(null, permissionList));
      },
      function(err: Error){
        return(callBack(err));
      });
  }

  getPermissionForRole(roleId: number, permissionId: number, callBack: any)
  {
    this.models.rolePermissions.findOne(
      {
        where: {RoleId: roleId, PermissionId: permissionId},
        include: [{model: this.models.roles}, {model: this.models.permissions}],
      }
    ).then(function(rolePermission: any)
      {
        return(callBack(null, rolePermission));
      },
      function(err: Error)
      {
        return(callBack(err));
      });
  }

  getUserNamesWithPermission(permissionName: string, callBack: any)
  {
    this.models.users.findAll(
      {
        attributes: ['UserName'],
        include: [{
          model: this.models.roles,
          required: true,
          include: {
            model: this.models.permissions,
            where: { Name: permissionName },
            attributes: []
          },
          attributes: []
        }]
      }
    ).then(function(userNameList: any)
    {
      return(callBack(null, userNameList));
    },
    function(err: Error)
    {
      return(callBack(err));
    });
  }

  //endregion DB permission access

}
