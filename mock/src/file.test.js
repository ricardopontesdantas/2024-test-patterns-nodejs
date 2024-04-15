const assert = require("assert");
const File = require("./file");
const error = require("./constants");

(async () => {
  {
    const filePath = "./mocks/invalid-empty-file.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    assert.rejects(result, expected, "it should rejects if the file is empty");
  }
  {
    const filePath = "./mocks/invalid-header.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(error.FILE_FIELDS_ERROR_MESSAGE);
    assert.rejects(
      result,
      expected,
      "it should rejects if the header is invalid"
    );
  }
  {
    const filePath = "./mocks/invalid-five-items.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
    assert.rejects(
      result,
      expected,
      "it should rejects if the header is invalid"
    );
  }
})();
