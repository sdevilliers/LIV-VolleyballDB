import * as express from 'express';
import { nameList } from './name.list';
import { TeamService } from './team.service';

export function init(app: express.Application) {
  nameList(app);
  /* tslint:disable-next-line:no-unused-expression */
  new TeamService(app);
}
