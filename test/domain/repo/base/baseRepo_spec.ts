/**
 * @file baseRepo_spec.ts - test file for baseRepo
 * @author Michael Robertson
 * @version 0.0.1
 */
import * as chai from "chai";
import { expect } from "chai";
import * as chaiAsPromised from "chai-as-promised";
import { instance, mock, reset, verify, when } from "ts-mockito/lib/ts-mockito";
import { Repository } from "typeorm/repository/Repository";
import { User } from "../../../../src/domain/DAL/mysql/entities/User";
import { MockBaseRepo } from "./baseRepoMock";
import { IMockType } from "./mockType";

before(() => {
  chai.should();
  chai.use(chaiAsPromised);
});

describe("BaseRepository", () => {
  // dependancy
  const mockRepo: Repository<IMockType> = mock(Repository);
  // object under test
  const mockBaseRepo: MockBaseRepo = new MockBaseRepo();
  // test initialize()
  describe("initialize", () => {
    // mock setup
    const stubRepo: Repository<IMockType> = instance(mockRepo);
    // object under test

    it("should return nothing", () => {
      const nothingResults: void = mockBaseRepo.initialize(stubRepo);
      expect(nothingResults).to.be.a("undefined");
    });

  });

  // Test getAll()
  describe("getAll()", async () => {
    // setup
    when(mockRepo.find()).thenReturn(Promise.resolve([<IMockType> {id: 1}]));
    const stubRepo: Repository<IMockType> = instance(mockRepo);
    // Object under test
    mockBaseRepo.initialize(stubRepo);

    it("should call find() on it's dependant repo", () => {
      mockBaseRepo.getAll();
      verify(mockRepo.find()).called();
    });

  });

  describe("getById()", () => {
    // setup
    const testIdOne: number = 1;
    const testIdTwo: number = 2;
    when(mockRepo.findOneById(testIdOne)).thenReturn(Promise.resolve(<IMockType> {id: 1}));
    when(mockRepo.findOneById(testIdTwo)).thenThrow(new Error("can't connect to the database"));
    const stubRepo: Repository<IMockType> = instance(mockRepo);
    // Object under test
    const nothingResults: void = mockBaseRepo.initialize(stubRepo);
    it("should return an object on successful dependency call", async () => {
      const findOneResults: IMockType = await mockBaseRepo.getById(1);
      verify(mockRepo.findOneById(1)).called();
      expect(findOneResults).to.be.a("object");
    });

    it("should throw an error on failed dependency call", async () => {
      await expect(mockBaseRepo.getById(testIdTwo)).to.eventually.be.rejectedWith("ERROR");
    });
  });

  describe("save() (single entity)", () => {
    it("should call save() on dependant repo when passed a single entities", async () => {
      // user object for test
      const testObj: IMockType = { id: 1 };
      // dependency
      when(mockRepo.save(testObj)).thenReturn(Promise.resolve(testObj));
      const stubRepo: Repository<IMockType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      expect(await mockBaseRepo.save(testObj)).to.eql(true);
      verify(mockRepo.save(testObj)).called();
    });

    it("should reject and error when it's dependency's errors", async () => {
      // user object for test
      const testObj: IMockType = { id: 1 };
      // dependency
      when(mockRepo.save(testObj)).thenThrow(new Error("TEST ERROR"));
      const stubRepo: Repository<IMockType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      await expect(mockBaseRepo.save(testObj)).to.eventually.be.rejectedWith("ERROR");
    });
  });

  describe("saveAll() (array of entities)", () => {
    it("should call it's dependency's save() and return a boolean", async () => {
      // user object for test
      const testObj: IMockType = { id: 1 };
      const testObj2: IMockType = { id: 2 };
      const testArr: IMockType[] = [ testObj, testObj2 ];
      // dependency
      when(mockRepo.save(testArr)).thenReturn(Promise.resolve(testArr));
      const stubRepo: Repository<IMockType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      expect(await mockBaseRepo.saveAll(testArr)).to.eql(true);

      verify(mockRepo.save(testArr)).called();
    });

    it("should reject and throw when it's dependancy errors", async () => {
      const testObj: IMockType = { id: 1 };
      const testObj2: IMockType = { id: 2 };
      const testArr: IMockType[] = [ testObj, testObj2 ];
      // dependency
      when(mockRepo.save(testArr)).thenThrow(new Error("can not save"));
      const stubRepo: Repository<IMockType> = instance(mockRepo);
      // object under test
      mockBaseRepo.initialize(stubRepo);
      // test
      await expect(mockBaseRepo.saveAll(testArr)).to.eventually.be.rejectedWith("ERROR");
    });
  });

});
