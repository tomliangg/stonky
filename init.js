/* eslint-disable unicorn/prefer-module */
const fs = require('fs');
const chalk = require('chalk');

const data = {
	symbols: [],
	apiKey: '',
};

fs.writeFile('./data.json', JSON.stringify(data), error => {
	if (error) {
		throw error;
	}

	console.log(chalk.greenBright('data.json file has been created successfully'));
});
