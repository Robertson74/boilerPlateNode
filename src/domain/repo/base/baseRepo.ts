/**
 * @file baseRepo.ts - Base repository
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Repository as TypeScriptRepository } from "typeorm";
import { IRepository } from "../interface/IRepository";

export abstract class BaseRepository<T> implements IRepository<T> {

  private _repository: TypeScriptRepository<T>;

  public initialize(repository: TypeScriptRepository<T>): void {
    this._repository = repository;
  }

  public async getAll(): Promise<T[]> {
    return await this._repository.find();
  }

  public async getById(id: number): Promise<T | undefined> {
    try {
      return await this._repository.findOneById(id);
    } catch (e) {
      return Promise.reject("ERROR");
    }
  }

  public async save(entities: T | T[]): Promise<boolean> {
    // this._repository.save(entities);
    return Promise.resolve(true);
  }

}
