/* tslint:disable */
export type Prop = {
  propertyName: string,
  propertyType: string,
  readOnly: boolean,
  optional: boolean
};

export type Model = {
  name: string,
  writeDir: string,
  props: Prop[]
};

export type EntityProp = {
  dbType: string;
  type: string;
  dbName: string;
  name: string;
  length: number;
  primary: boolean;
  unique: boolean;
  percision: number;
  isPrivate: boolean;
  noGetter: boolean;
  noSetter: boolean;
}

export type genEntity = {
  name: string;
  dbName: string;
  props: EntityProp[];
}
