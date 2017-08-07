/**
 * @file User.ts - User ORM class
 * @author Michael Robertson
 * @version 0.0.1
 */

import { Column, Entity} from "typeorm";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";
import { IUser } from "../../../../shared/models/IUser";

@Entity()
export class User implements IUser {

  @PrimaryGeneratedColumn()
  private _id: number;

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  @Column("text")
  private _name: string;

  get name(): string {
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

}
