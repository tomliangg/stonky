const fs = require("fs");

export const readDataFile = () => {
  return new Promise<string>((resolve, reject) => {
    fs.readFile(__dirname + "/../data.json", "utf8", (err: Error, jsonString: string) => {
      if (err) {
        return reject(err);
      }
  
      return resolve(jsonString);
    });
  });
};

export const writeToDataFile = (jsonString: string, callback: Function) => {
  fs.writeFile(__dirname + "/../data.json", jsonString, (err: Error) => {
    if (err) {
      throw err;
    }
    
    callback();
  });
};
