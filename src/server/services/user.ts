import { iUser } from '../interfaces/iUser.interface.js';
import { DbManager } from '../db/dbManager';

export class User implements iUser {
    companyId: number;
    emailAddress: string;
    firstName: string;
    id: number;
    lastName: string;
    markupId: number;
    password: string;
    resetPasswordExpires: string;
    resetPasswordToken: string;
    roleId: number;
    salt: string;
    userName: string;
    tAdmin_Role: any;

    private _dbManager: DbManager;

    constructor(userName: string, companyId: number) {
        this.userName = userName;
        this.companyId = companyId;
        this._dbManager = new DbManager();
    }

    Authenticate(pwd: string): boolean {
        return true;
    }

    ResetPwdToken(): boolean {
        return true;
    }

    ResetPwdExpires(): boolean {
        return true;
    }

    // TODO check up on type alias as an implementation of a delegate type so that we can use
    // strong typing for the passed in function signature.
    //https://stackoverflow.com/questions/20310369/declare-a-delegate-type-in-typescript
    Save(cb: any): any {
        // Then save the user
        this._dbManager.addUser(this, (err: Error, user: iUser) => {
            if (err) {
                return cb(err);
            } else {
                return cb(user);
            }
        });
    }
}
