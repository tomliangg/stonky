/* eslint-disable unicorn/prefer-node-protocol */
import * as fs from 'fs';
import * as path from 'path';
/* eslint-enable unicorn/prefer-node-protocol */
import {sampleResult} from './sample-data';

export const readDataFile = async () => new Promise<string>((resolve, reject) => {
	// Disable unicorn/prefer-module so that it allows __dirname
	// eslint-disable-next-line unicorn/prefer-module
	fs.readFile(path.resolve(__dirname, '../data.json'), 'utf8', (error, jsonString: string) => {
		if (error) {
			reject(error);
			return;
		}

		resolve(jsonString);
	});
});

export const writeToDataFile = (jsonString: string, callback: () => void) => {
	// Disable unicorn/prefer-module so that it allows __dirname
	// eslint-disable-next-line unicorn/prefer-module
	fs.writeFile(path.resolve(__dirname, '../data.json'), jsonString, error => {
		if (error) {
			throw error;
		}

		callback();
	});
};

// https://stackoverflow.com/a/11832950
const roundToTwoDecimals = (number_: number) => Math.round((number_ + Number.EPSILON) * 100) / 100;

// https://stackoverflow.com/a/39967296
const truncate = (s: string) => s.replace(/(.{15})..+/, '$1…');

export const parse = (result: typeof sampleResult) => {
	const convertNumber = (number_: number, suffix = '') => {
		if (number_ > 0) {
			return `+${roundToTwoDecimals(number_)}${suffix}`;
		}

		if (number_ < 0) {
			return `${roundToTwoDecimals(number_)}${suffix}`;
		}

		return number_;
	};

	return result.map(r => ({
		Symbol: r.symbol,
		// If Yahoo Finance doesn't track the symbol or users has a typo, the data can be undefined
		// use a fallback value to prevent exception
		Name: truncate(r.shortName || ''),
		Price: `${r.regularMarketPrice || ''} ${r.currency || ''}`,
		Change: convertNumber(r.regularMarketChange),
		Diff: convertNumber(r.regularMarketChangePercent, '%'),
		'Day Range': r.regularMarketDayRange,
	}));
};

// YYYY-MM-DD hh:mm:ss format
export const getCurrentTime = () => {
	const d = new Date();

	const date = ('0' + String(d.getDate())).slice(-2);
	const month = ('0' + String(d.getMonth() + 1)).slice(-2);
	const year = d.getFullYear();
	const hour = d.getHours();
	const minute = d.getMinutes();
	const second = d.getSeconds();

	return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
};
