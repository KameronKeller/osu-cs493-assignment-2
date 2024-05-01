// const request = require("supertest");
// // const app = require("../server");
// const fs = require("fs");
// const csv = require("@fast-csv/parse");
// const { dropTablesAndCreate } = require("../lib/sequelizeFns");
// const {
//     sequelize,
//     Business,
//     Photo,
//     Review,
//     User,
//   } = require("../lib/sequelizePool");

// // jest.setTimeout(3 * 60 * 1000);
// //   let testTableData;
// //   let isFirstLine = true;
// //   beforeAll(() => {
// //     testTableData = [];
// //     // Sources Cited: ChatGPT helped me write this promise
// //     // I was stuck trying to use async/await but having trouble
// //     return new Promise((resolve, reject) => {
// //       fs.createReadStream("test/testTables.csv")
// //         .pipe(csv.parse({ ignoreEmpty: true }))
// //         .on("data", function (row) {
// //           if (isFirstLine) {
// //             isFirstLine = false;
// //           } else {
// //             testTableData.push(row);
// //           }
// //         })
// //         .on("end", function () {
// //           console.log("Finished");
// //           resolve();
// //         })
// //         .on("error", function (error) {
// //           console.error("Error processing CSV file", error);
// //           reject(error);
// //         });
// //     });
// //   });

// // describe("Characteristic", () => {
// //   it.each(testTableData)("test", async (test) => {
// //     expect(true).toBe(true);
// // });
// // });

// describe("Table Driven API Endpoint Tests", () => {
//   let testTableData;
//   let isFirstLine = true;
//   beforeAll(() => {
//     testTableData = [];
//     // Sources Cited: ChatGPT helped me write this promise
//     // I was stuck trying to use async/await but having trouble
//     return new Promise((resolve, reject) => {
//       fs.createReadStream("test/testTables.csv")
//         .pipe(csv.parse({ ignoreEmpty: true }))
//         .on("data", function (row) {
//           if (isFirstLine) {
//             isFirstLine = false;
//           } else {
//             testTableData.push(row);
//           }
//         })
//         .on("end", function () {
//           console.log("Finished");
//           resolve();
//         })
//         .on("error", function (error) {
//           console.error("Error processing CSV file", error);
//           reject(error);
//         });
//     });
//   });

//   it("runs table driven tests", async () => {
//     for (const testCase of testTableData) {
//       const [
//         testCaseNumber,
//         testDescription,
//         httpVerb,
//         endpoint,
//         pathParams,
//         queryParams,
//         inputData,
//         expectedResponseBody,
//         success,
//         preloadData,
//       ] = testCase;
  
//       console.log(`${testCaseNumber}: ${httpVerb} ${endpoint}: ${testDescription}`);
  
//       // Make sure to await this function if it's asynchronous
//       await sequelize.sync({force:true});
  
//       // Run your test here
//       expect(true).toBe(true);
//     }
//   });
// });
