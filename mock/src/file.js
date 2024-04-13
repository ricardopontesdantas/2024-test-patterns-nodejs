const { readFile } = require("fs/promises");

class File {
  static async csvToJson(filePath) {
    const content = await readFile(filePath, "utf-8");
    const validation = this.isValid(content);
    if (!validation.valid) throw new Error(validation.error);
  }

  static isValid(csvString) {
    const [header, ...fileWithoutHeader] = csvString.split(/\r?\n/);
    if (!fileWithoutHeader.length) {
      return {
        error: "the content length is invalid",
        valid: false,
      };
    }
  }
}

module.exports = File;
