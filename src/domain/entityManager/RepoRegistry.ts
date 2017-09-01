/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */
// DO NOT REMOVE OR MOVE THE ### COMMENTS THEY ARE NEEDED FOR THE AUTO REPO GEN

import { BaseBusiness } from "../business/baseInterface/BaseBusiness";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { UserBusiness } from "../business/UserBusiness";
import { UserRepo } from "../repo/UserRepo";
import { MIDRepo } from "../repo/MIDRepo";
import { MIDBusiness } from "../business/MIDBusiness";
import { TransactionRepo } from "../repo/TransactionRepo";
import { TransactionBusiness } from "../business/TransactionBusiness";
import { NewObjRepo } from "../repo/NewObjRepo";
import { NewObjBusiness } from "../business/NewObjBusiness"; // ###endRegistryImports

// format of registry entries:
// Model: [ RepoClass, BusinessClass]
export const repoRegistry: {} = {
  User: [ UserRepo, UserBusiness ],
  MID: [ MIDRepo, MIDBusiness ],
  Transaction: [ TransactionRepo, TransactionBusiness ],
  NewObj: [ NewObjRepo, NewObjBusiness ] // ###endRepoRegistry
};

export type repoNames =
  "User" |
  "MID" |
  "Transaction" |
  "NewObj"; // ###endRepoNames
