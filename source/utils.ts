const fs = require("fs");
import { sampleResult } from "./sampleData";

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

export const parse = (result: typeof sampleResult) => {
  const convertNum = (num: number, suffix="") => {
    if (num > 0) {
      return `+${num}${suffix}`;
    }

    if (num < 0) {
      return `${num}${suffix}`;
    }

    return num;
  };

  return result.map(r => ({
    Symbol: r.symbol,
    Name: r.displayName,
    Price: r.regularMarketPrice,
    Change: convertNum(r.regularMarketChange),
    Diff: convertNum(r.regularMarketChangePercent, "%"),
    Currency: r.currency,
  }));
}