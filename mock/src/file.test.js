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
  {
    const filePath = "./mocks/valid-file.csv";
    const result = await File.csvToJson(filePath);
    const expected = [
      { id: 1, name: "john", profession: "developer", age: 30 },
      { id: 2, name: "helen", profession: "qa", age: 28 },
      { id: 3, name: "bill", profession: "manager", age: 35 },
    ];
    assert.deepEqual(
      result,
      expected,
      "it should return csv converted to json"
    );
  }
})();
