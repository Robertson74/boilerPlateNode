/**
 * @file configManager_spec.ts - test for ConfigManager
 * @author Michael Robertson
 * @version 0.0.1
 */
import { expect } from "chai";
import { mock } from "ts-mockito";
import { BaseConfig } from "../../src/config/baseConfig";
import { ConfigManager } from "../../src/config/configManager";
import { DevConfig } from "../../src/config/devConfig";

/* tslint:disable:no-magic-numbers */
describe("ConfigManager", () => {

  describe("getConfig", () => {

    it("should return dev config if env is 'dev' ", () => {
      /* code in here */
      const manager: ConfigManager = new ConfigManager("dev");

      expect(manager.getConfig()).to.be.instanceof(DevConfig);
    });

    it("should throw an excpetion if 'env' is not recognized", () => {
      const manager: ConfigManager = new ConfigManager("garbage");
      let err: Error = new Error();
      try {
        manager.getConfig();
      } catch (e) {
        err = e;
      }
      expect(err).to.be.a("Error");
      expect(err.message).to.equal("'env' not recognized");
    });

  });

});
