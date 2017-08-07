/**
 * @file repoContainer.ts -  description 
 * @author Michael Robertson
 * @version 0.0.1
 */
import { MysqlConnectionCreator } from "../DAL/mysql/connection";
import { BaseRepository } from "../repo/baseInterface/baseRepo";

export class EntityManager {

}

// private _repoStack: { [name: string]: typeof BaseRepository } = {};
// private _mysqlConnection: Connection;

// public async initialize(): Promise <void> {
//   const config: DevConfig = new DevConfig();
//   const connectionCreator: MysqlConnectionCreator = new MysqlConnectionCreator();
//   const options = mysqlDriverOptions;
//   this._mysqlConnection = await connectionCreator.createConnection(options);
//   return;
// }

// public getRepo(name: string): any {
// if (!this._repoRegistry[name]) {
// throw new ReferenceError;
// }
// if (this._repoStack[name]) {
// 	return this._repoStack[name];
// } else {
// 	let repoType = this._repoRegistry[name][0];
// 	let repo = new repoType();
// 	repo.initialize(this._mysqlConnection);

// 		let businessType = this._repoRegistry[name][1];
// 		let business = new businessType(repo);

// 		this._repoStack[name] = business;

// 		return business;
// 	}

// }

// readonly _repoRegistry: any = {
//   "store": [  StoreRepository, StoreBusiness ]
// 		// END REGISTRY#
// };
// }
