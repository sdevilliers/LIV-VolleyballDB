
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
