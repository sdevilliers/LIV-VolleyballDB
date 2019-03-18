import * as express from 'express';
import { nameList } from './name.list';
import { TeamService } from './team.service';

export function init(app: express.Application) {
  nameList(app);
  new TeamService(app);
}
