const assert = require("assert");
const File = require("./file");

(async () => {
  {
    const filePath = "./mocks/invalid-empty-file.csv";
    const result = File.csvToJson(filePath);
    const expected = new Error("the content length is invalid");
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
})();
