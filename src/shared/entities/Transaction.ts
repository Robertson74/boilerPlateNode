import { Column } from "typeorm/decorator/columns/Column";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

import { Entity } from "typeorm/decorator/entity/Entity";
@Entity("trans_table")
export class Transaction {

  @PrimaryGeneratedColumn({name: "id"})
  private _id: number;

  @Column({name: "amount", type: "double"})
  private _amount: number;

  constructor() {
    // defaults 
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get amount(): number {
    return this._amount;
  }

  set amount(amount: number) {
    this._amount = amount;
  }

}
