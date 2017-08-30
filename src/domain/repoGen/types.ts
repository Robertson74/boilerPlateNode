/* tslint:disable */
export type Prop = {
  propertyName: string,
  propertyType: string,
  readOnly: boolean,
  optional: boolean
};

export type Model = {
  name: string,
  props: Prop[]
};

export type EntityProp = {
  type: string;
  name: string;
  length: number;
  primary: boolean;
  unique: boolean;
  percision: number;
  isPrivate: boolean;
}

export type genEntity = {
  dbName: string;
  props: EntityProp[];
}
