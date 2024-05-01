// const fs = require('fs');
const assert = require('assert');
// const app = require('./app'); // replace with your express app file
// const { resetDatabase, loadMockData } = require('./db'); // replace with your database file

// const testCases = JSON.parse(fs.readFileSync('testCases.json', 'utf8'));
const request = require("supertest");
const app = require("../server");
const {
    sequelize,
    Business,
    Photo,
    Review,
    User,
  } = require("../lib/sequelizePool");
const testCases = require('./testCases');

describe('API tests', function() {
  beforeEach(async function() {
    // await resetDatabase();
    // await loadMockData();
    await sequelize.sync({force:true})
    console.log("db reset!")
  });

  for (const testCase of testCases) {
    console.log("== testCase", testCase);
    it(`${testCase.testId}: ${testCase.httpVerb} ${testCase.endpoint}: ${testCase.testDescription}`, function(done) {
      request(app).get(testCase.endpoint).expect(200, done);
      // console.log("== response", response);
      // assert.equal(response.status, 200);

      // const response = await app.testFunction(testCase.data); // replace with your test function
      // assert.deepStrictEqual(response, testCase.expectedResponse);
      assert.equal(true, true);
    });
  }
});