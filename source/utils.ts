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

// https://stackoverflow.com/a/11832950
const roundToTwoDecimals = (num: number) => Math.round((num + Number.EPSILON) * 100) / 100

// https://stackoverflow.com/a/39967296
const truncate = (s: string) => s.replace(/(.{15})..+/, "$1…");

export const parse = (result: typeof sampleResult) => {
  const convertNum = (num: number, suffix="") => {
    if (num > 0) {
      return `+${roundToTwoDecimals(num)}${suffix}`;
    }

    if (num < 0) {
      return `${roundToTwoDecimals(num)}${suffix}`;
    }

    return num;
  };

  return result.map(r => ({
    Symbol: r.symbol,
    Name: truncate(r.shortName),
    Price: `${r.regularMarketPrice} ${r.currency}`,
    Change: convertNum(r.regularMarketChange),
    Diff: convertNum(r.regularMarketChangePercent, "%"),
    "Day Range": r.regularMarketDayRange,
  }));
}