const request = require("supertest");
// const app = require("../server");
const fs = require('fs');
const csv = require('@fast-csv/parse');

describe("Table Driven API Endpoint Tests", () => {
    let testTableData;
    let isFirstLine = true;
    beforeAll(() => {
        testTableData = [];
        // Sources Cited: ChatGPT helped me write this promise
        // I was stuck trying to use async/await but having trouble
        return new Promise((resolve, reject) => {
            fs.createReadStream('test/testTables.csv')
            .pipe(csv.parse({ ignoreEmpty: true }))
            .on('data', function(row) {
                if (isFirstLine) {
                    isFirstLine = false;
                } else {
                    testTableData.push(row)
                }
            })
            .on('end', function() {
                console.log("Finished")
                resolve();
            })
            .on('error', function(error) {
                console.error('Error processing CSV file', error);
                reject(error);
            });
        });
    }, 10000);

    it('adds', () => {
        console.log("== testTableData", testTableData);
        expect(true).toBe(true);
      });

//   should print TC#: DESC   VERB ENDPOINT
//   it.each(testTableData)(
//     // "%s: %s\t%s %s",
//     "test",
//     (
//       testCase,
//       testDescription,
//       httpVerb,
//       endpoint,
//       pathParams,
//       queryParams,
//       inputData,
//       expectedResponseBody,
//       success,
//       preloadData
//     ) => {
//         expect(true).toBe(true);
//     }
//   );
it('runs table driven tests', () => {
    testTableData.forEach(testCase => {
        const [
            testCaseNumber,
            testDescription,
            httpVerb,
            endpoint,
            pathParams,
            queryParams,
            inputData,
            expectedResponseBody,
            success,
            preloadData
        ] = testCase;

        // Run your test here
        expect(true).toBe(true);
    });
});
});
