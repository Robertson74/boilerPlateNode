/**
 * @file baseRepo.ts - Base repository
 * @author Michael Robertson
 * @version 0.0.1
 */
import { IRepository } from "../interfaces/IRepoitory";
import { Repository as TypeScriptRepository } from "typeorm";

export abstract class BaseRepository<T> implements IRepository<T> {

  private _repository: TypeScriptRepository<T>;

  baseInitialize(repository: TypeScriptRepository<T>) {
      this._repository = repository;
    }

  getAll(): Promise<T[]> {
      return this._repository.find();
    }

  getById(id: number): Promise<T | undefined> {
      let entity = this._repository.findOneById(id);
      if (entity) {
            return entity;
          }
      else {
            throw "No element found for supplied id ";
          }
    }

}
