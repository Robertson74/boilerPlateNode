/* tslint:disable */
export type genProp = {
  propertyName: string,
  propertyType: string,
  readOnly: boolean,
  optional: boolean
};

export type genModel = {
  name: string,
  writeDir: string,
  props: genProp[]
};

export type genEntityProp = {
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
  props: genEntityProp[];
  modelDir: string;
  writeDir: string;
}

export type domainPaths ={
  repoDir: string,
  busDir: string,
}
