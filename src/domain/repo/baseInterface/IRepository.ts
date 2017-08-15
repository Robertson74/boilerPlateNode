/**
 * @file IRepository.ts - Base repository interface
 * @author Michael Robertson
 * @version 0.0.1
 */
import { Repository as TypeScriptRepository } from "typeorm";
export interface IRepository<T> {
  delete(entities: T[]): Promise<boolean>;
  deleteOne(entity: T): Promise<boolean>;
  findOneWhere(params: {}): Promise<T>;
  findWhere(params: {}): Promise<T[]>;
  getAll(): Promise<T[]>;
  getById(id: number): Promise<T>;
  initialize(repository: TypeScriptRepository<T>): void;
  save(entities: T[] | T ): Promise<boolean>;
  saveAll(entities: T[]): Promise<boolean>;

}
