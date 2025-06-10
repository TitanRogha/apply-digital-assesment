import * as fs from 'fs';
import * as path from 'path';

export class TestDataHelper {
  private static testData: any;

  static loadTestData() {
    if (!this.testData) {
      const dataPath = path.join(__dirname, '../data/testData.json');
      const rawData = fs.readFileSync(dataPath, 'utf8');
      this.testData = JSON.parse(rawData);
    }
    return this.testData;
  }

  static getUser(userKey: string = 'testuser') {
    const data = this.loadTestData();
    return data.users[userKey];
  }

  static getProduct(productKey: string = 'monitor') {
    const data = this.loadTestData();
    return data.products[productKey];
  }

  static getEnvironment(envKey: string = 'prod') {
    const data = this.loadTestData();
    return data.environments[envKey];
  }

  static getUserFromEnv() {
    return {
      username: process.env.TEST_USERNAME || this.getUser('backup').username,
      password: process.env.TEST_PASSWORD || this.getUser('backup').password
    };
  }
}
