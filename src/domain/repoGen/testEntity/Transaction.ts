import { Column } from "typeorm/decorator/columns/Column";
import { Entity } from "typeorm/decorator/entity/Entity";
import { PrimaryColumn } from "typeorm/decorator/columns/PrimaryColumn";
import { PrimaryGeneratedColumn } from "typeorm/decorator/columns/PrimaryGeneratedColumn";

@Entity("transactions")
export class Transaction {

  @PrimaryGeneratedColumn({name: "id"})
  private _id: number;

  @Column({name: "amount", type: "float"})
  private _amount: number;

  @Column({name: "mid_id", type: "varchar", unique: true})
  private _midId: string;

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

  get midId(): string {
    return this._midId;
  }

  set midId(midId: string) {
    this._midId = midId;
  }

}
