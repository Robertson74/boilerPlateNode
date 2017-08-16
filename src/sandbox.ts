/**
 * @file sandbox.ts - Test out concepts here
 * @author Michael Robertson
 * @version 0.0.1
 */

/* tslint:disable */
import * as fs from 'fs';
import { ReadLine } from "readline";

(async () => {
  const testVar = 100;
  const interfaceString: string = `export interface IProduct {
  id: number;
  desc: string;
  price: number;
  ${testVar}
  }`;

  await fs.writeFile("./testFile.ts", interfaceString, (err) => console.log(err));
  // const rl = ReadLine.createInterface({
  //   input: process.stdin,
  //   output: process.stdout
  // });
})(); 
console.log("Sandbox: done");
