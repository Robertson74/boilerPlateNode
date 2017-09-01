/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { BaseBusiness } from "../business/baseInterface/BaseBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { UserRepo } from "../repo/UserRepo"
import { MIDRepo } from "../repo/MIDRepo";
import { MIDBusiness } from "../business/MIDBusiness"; // ###endRegistryImports

// format of registry entries:
// Model: [ RepoClass, BusinessClass]
export const repoRegistry: {} = {
  User: [ UserRepo, UserBusiness ],
  MID: [ MIDRepo, MIDBusiness ] // ###endRepoRegistry
};

export type repoNames =
  "User" |
  "MID"; // ###endRepoNames
