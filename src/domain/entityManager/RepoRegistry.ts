/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { UserBusiness } from "../business/UserBusiness";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { UserRepo } from "../repo/UserRepo";

export const repoRegistry: {} = {
  users: [ UserRepo, UserBusiness ]
};
