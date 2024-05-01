const photoTestData = {
  samplePhoto: {
    userid: 1,
    businessid: 1,
    caption: "Kale!",
  },
  samplePhotoEdited: {
    userid: 1,
    businessid: 1,
    caption: "LETTUCE!",
  },
  samplePhotoMissingData: {
    userid: 1,
    caption: "Kale!",
  },
  samplePhotoExpectedResponse: {
    id: 1,
  },
  samplePhotoFailedResponse: {
    error: "string",
  },
};
