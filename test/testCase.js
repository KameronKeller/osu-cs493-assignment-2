class TestCase {
    constructor(
        testCase,
        testDescription,
        httpVerb,
        endpoint,
        pathParams,
        queryParams,
        inputData,
        expectedResponseBody,
        expectedSuccess
    ) {
        this.testCase = testCase;
        this.testDescription = testDescription;
        this.httpVerb = httpVerb;
        this.endpoint = endpoint;
        this.pathParams = pathParams;
        this.queryParams = queryParams;
        this.inputData = inputData;
        this.expectedResponseBody = expectedResponseBody;
        this.expectedSuccess = expectedSuccess;
    }
}