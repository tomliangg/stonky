#!/usr/bin/env node
// import React from 'react';
// import {render} from 'ink';
import meow from 'meow';
import chalk from "chalk";
// import App from './ui';
import { readDataFile, writeToDataFile } from "./utils";

interface DataObj {
	symbols: string[];
	apiKey: string;
}

const cli = meow(`
	Usage
	  $ stock-helper

	Options
		--add  stock symbol to add to your watch list (i.e. APPL)
		--delete stock symbol to delete from your watch list
		--list list out all the stock symbols on your watch list

	Examples
	  $ stock-helper --add=APPL
`, {
	flags: {
		add: {
			type: "string",
			alias: "a"
		},
		delete: {
			type: "string",
			alias: "d",
		},
		list: {
			type: "boolean",
			alias: "l",
		}
	},
	booleanDefault: undefined,
});

const addFlagString = cli.flags.add;
const deleteFlagString = cli.flags.delete;

if (addFlagString) {
	readDataFile((jsonString: string) => {
		const data = JSON.parse(jsonString) as DataObj;
		if (data.symbols.includes(addFlagString)) {
			console.log(chalk.yellowBright(`${addFlagString} is already on your list.\nOperation is invalid. Your list remains unchanged`));
		} else {
			data.symbols.push(addFlagString);
			writeToDataFile(JSON.stringify(data), () => {
				console.log(chalk.greenBright(`${addFlagString} has been added to your list.\nYour current list has: ${data.symbols.join(", ")}`));
			});
		}
	});
}

if (deleteFlagString) {
	readDataFile((jsonString: string) => {
		const data = JSON.parse(jsonString) as DataObj;
		const indexToDelete = data.symbols.indexOf(deleteFlagString);
		if (indexToDelete > -1) {
			data.symbols.splice(indexToDelete, 1);
			writeToDataFile(JSON.stringify(data), () => {
				console.log(chalk.greenBright(`${deleteFlagString} has been deleted from your list.\nYour current list has: ${data.symbols.join(", ")}`));
			});
		} else {
			console.log(chalk.yellowBright(`${deleteFlagString} is not on your list.\nOperation is invalid. Your list remains unchanged`));
		}
	});
}

if (cli.flags.list) {
	readDataFile((jsonString: string) => {
		const data = JSON.parse(jsonString) as DataObj;
		console.log(chalk.blueBright(`Your current list has: ${data.symbols.join(", ")}`));
	});
}

// if (cli.flags.name !== "no") {
// 	render(<App name={cli.flags.name}/>);
// }
