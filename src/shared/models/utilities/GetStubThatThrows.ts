/**
 * @file GetStubThatThrows.ts - quickly set up a stub that will throw an error
 * @author Michael Robertson
 * @version 0.0.1
 */

import { instance, when } from "ts-mockito/lib/ts-mockito";

/* tslint:disable:no-any */
/**
 * quickly set up a stub dependency that will throw an error for testing
 *
 * @name Function
 * @function
 * @author Michael Robertson
 * @date 2017-08-07
 * @param {mock} ts-mockito mock object to stub
 * @param {mockFunction} function that will be called on the stub
 * @param {error} error to throw when stub method is called
 * @param {calledWith} optional parameter the stub method should be called with
 * @returns {stub} stub that will throw an error
 */
export const getStubThatThrows: Function = (mock: any, mockFunction: string, error: any, calledWith: any) => {
  if (calledWith) {
    when(mock[mockFunction](calledWith)).thenThrow(error);
  } else {
    when(mock[mockFunction]()).thenThrow(error);
  }
  const stub: any = instance(mock);
  return stub;
};
