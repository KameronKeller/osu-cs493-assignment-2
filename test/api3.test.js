// const fs = require('fs');
// const path = require('path');
// // const parse = require('csv-parse/lib/sync');
// const request = require('supertest');
// // const app = require('../app'); // Your Express app
// const { Parser } = require('csv-parse');

// describe('API Tests', () => {
//   // Read and parse the CSV file
//   const csvData = fs.readFileSync(path.resolve(__dirname, 'testTables.csv'));
//   const testCases = Parser.parse(csvData, {
//     columns: true,
//     skip_empty_lines: true,
//   });

//   // Loop through each test case
//   testCases.forEach((testCase) => {
//     it(`should return status ${testCase.testDescription} for test case ${testCase.testCase}`, async () => {
//         expect(true).toBe(true);
//     //   const response = await request(app)
//     //     .post('/users')
//     //     .send({ name: testCase.name, age: testCase.age });

//     //   // Assert the status code
//     //   expect(response.status).toBe(parseInt(testCase.expected_status, 10));

//     //   // Assert the response body
//     //   expect(response.body).toEqual(JSON.parse(testCase.expected_response));
//     });
//   });
// });