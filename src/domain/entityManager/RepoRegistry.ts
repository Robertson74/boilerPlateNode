/**
 * @file RepoRegistry.ts - registry for all repositories
 * @author Michael Robertson
 * @version 0.0.1
 */

import { ProductBusiness } from "../business/ProductBusiness";
import { UserBusiness } from "../business/UserBusiness";
import { Product } from "../DAL/mysql/entities/Product";
import { BaseRepository } from "../repo/baseInterface/baseRepo";
import { ProductRepo } from "../repo/ProductRepo";
import { UserRepo } from "../repo/UserRepo";

// format of registry entries:
// Model: [ RepoClass, BusinessClass]
export const repoRegistry: {} = {
  User: [ UserRepo, UserBusiness ],
  Product: [ ProductRepo, ProductBusiness ]
};
