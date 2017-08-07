/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { UserRepo } from "../repo/UserRepo";

const userRepo: UserRepo = new UserRepo();

export const repoRegistry: {} = {
  users: userRepo
};
