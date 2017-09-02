/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseBusiness } from "../business/baseInterface/BaseBusiness";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { UserRepo } from "../repo/UserRepo";
import { UserBusiness } from "../business/UserBusiness"; // ###endRegistryImports

// format of registry entries:
// Model: [ RepoClass, BusinessClass]
export const repoRegistry: {} = {
  User: [ UserRepo, UserBusiness ] // ###endRepoRegistry
};

export type repoNames =
  "User"; // ###endRepoNames
