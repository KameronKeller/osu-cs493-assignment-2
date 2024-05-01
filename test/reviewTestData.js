const reviewTestData = {
  sampleReview: {
    userid: 1,
    businessid: 1,
    dollars: 3,
    stars: 5,
    review: "Great produce!",
  },
  sampleReviewEdited: {
    userid: 1,
    businessid: 1,
    dollars: 4,
    stars: 2,
    review: "Poor produce!",
  },
  sampleReviewMissingData: {
    userid: 1,
  },
  sampleReviewExpectedResponse: {
    id: 1,
  },
  sampleReviewFailedResponse: {
    error: "string",
  },
};
