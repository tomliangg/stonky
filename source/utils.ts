const fs = require("fs");
import chalk from "chalk";

export const readDataFile = (callback: Function) => {
  fs.readFile(__dirname + "/../data.json", "utf8", (err: Error, jsonString: string) => {
		if (err) {
			console.log(chalk.bold.red("File read failed:", err));
			return;
		}

    callback(jsonString);
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