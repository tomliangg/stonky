const fs = require("fs");
const chalk = require("chalk");

const data = {
  symbols: [],
  apiKey: ""
};

fs.writeFile("./data.json", JSON.stringify(data), (err) => {
  if (err) {
    throw err;
  }
  console.log(chalk.greenBright("data.json file has been created successfully"));
});