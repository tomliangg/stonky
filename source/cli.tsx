#!/usr/bin/env node
import React from 'react';
import {render} from 'ink';
import meow from 'meow';
import chalk from 'chalk';
import App from './ui';
import {readDataFile, writeToDataFile} from './utils';

interface DataObject {
	symbols: string[];
	apiKey: string;
}

const cli = meow(`
	Usage
	  $ stock-helper

	Options
		--add  stock symbol to add to your watch list (i.e. AAPL)
		--delete stock symbol to delete from your watch list
		--list list out all the stock symbols on your watch list
		--key update your Yahoo Finance API Key

	Examples
	  $ stock-helper --add=AAPL
`, {
	flags: {
		add: {
			type: 'string',
			alias: 'a',
		},
		delete: {
			type: 'string',
			alias: 'd',
		},
		list: {
			type: 'boolean',
			alias: 'l',
		},
		key: {
			type: 'string',
			alias: 'k',
		},
	},
	booleanDefault: undefined,
});

const addFlagString = cli.flags.add;
const deleteFlagString = cli.flags.delete;

readDataFile()
	.then(jsonString => {
		const data = JSON.parse(jsonString) as DataObject;
		const {symbols, apiKey} = data;

		if (addFlagString) {
			if (symbols.includes(addFlagString)) {
				console.log(chalk.yellowBright(`${addFlagString} is already on your list.\nOperation is invalid. Your list remains unchanged`));
			} else {
				symbols.push(addFlagString);
				writeToDataFile(JSON.stringify(data), () => {
					console.log(chalk.greenBright(`${addFlagString} has been added to your list.\nYour current list has: ${symbols.join(', ')}`));
				});
			}
		}

		if (deleteFlagString) {
			const indexToDelete = symbols.indexOf(deleteFlagString);
			if (indexToDelete > -1) {
				symbols.splice(indexToDelete, 1);
				writeToDataFile(JSON.stringify(data), () => {
					console.log(chalk.greenBright(`${deleteFlagString} has been deleted from your list.\nYour current list has: ${symbols.join(', ')}`));
				});
			} else {
				console.log(chalk.yellowBright(`${deleteFlagString} is not on your list.\nOperation is invalid. Your list remains unchanged`));
			}
		}

		if (cli.flags.list) {
			console.log(chalk.blueBright(`Your current list has: ${symbols.join(', ')}`));
		}

		if (Object.keys(cli.flags).length === 0) {
			if (apiKey.length === 0) {
				console.log(chalk.redBright('Please add an apiKey first. Follow the instructuions on https://www.yahoofinanceapi.com/tutorial to obtain a free apiKey and then use --key flag to update apiKey'));
				return;
			}

			if (symbols.length === 0) {
				console.log(chalk.redBright('You don\'t have anything on your watch list. Make sure to have at least 1 stock symbol on your list. See --help to learn how to add a stock symbol.'));
				return;
			}

			render(<App apiKey={apiKey} symbols={symbols}/>);
		}
	})
	.catch(error => {
		console.log(chalk.bold.red('File read failed:', error));
	});
