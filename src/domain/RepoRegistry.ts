/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseRepository } from "./repo/base/baseRepo";
import { UserRepo } from "./repo/repositories/UserRepo";

const userRepo: UserRepo = new UserRepo();

export const repoRegistry: {} = {
  users: userRepo
};
