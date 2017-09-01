import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

import { Entity } from "typeorm/decorator/entity/Entity";
@Entity("mid_table")
export class MID {

  @PrimaryGeneratedColumn({name: "id"})
  private _id: number;

  @Column({name: "dba_name", type: "varchar", unique: true})
  private _dba: string;

  constructor() {
    // defaults 
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get dba(): string {
    return this._dba;
  }

  set dba(dba: string) {
    this._dba = dba;
  }

}
