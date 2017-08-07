/**
 * @file GetStub.ts - Quickly get a stub that will return passed in values
 * @author Michael Robertson
 * @version 0.0.1
 */

import { instance, when } from "ts-mockito/lib/ts-mockito";

/* tslint:disable:no-any */
/**
 * quickly set up a stub dependency
 *
 * @name getStub
 * @function
 * @author Michael Robertson
 * @date 2017-08-07
 * @param mock ts-mockito mock object to stub
 * @param mockFunction function to stub on dependency
 * @param returnValue return value for stubed function
 * @param calledWith optional parameter the stubbed function should be called with
 */
export const getStub: Function = (mock: any, mockFunction: string, returnValue: any, calledWith: any): any => {
  if (calledWith) {
    when(mock[mockFunction](calledWith)).thenReturn(returnValue);
  } else {
    when(mock[mockFunction]()).thenReturn(returnValue);
  }

  const stub: any = instance(mock);
  return stub;
};
