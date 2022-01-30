import React, {useEffect, useState, FC} from 'react';
import axios, {AxiosError} from 'axios';
import {Text} from 'ink';
import Table from 'ink-table';
import {parse} from './utils';
import {sampleResult} from './sample-data';

interface AppType {
	apiKey: string;
	symbols: string[];
}

const App: FC<AppType> = props => {
	const [result, setResult] = useState<typeof sampleResult>([]);
	const [errorMessage, setErrorMessage] = useState('');

	useEffect(() => {
		axios.get('https://yfapi.net/v6/finance/quote', {
			params: {
				symbols: props.symbols.join(','),
			},
			headers: {
				'x-api-key': props.apiKey,
			},
		})
			.then(response => {
				if (response.data.quoteResponse?.result?.length) {
					setResult(response.data.quoteResponse.result as typeof sampleResult);
				} else {
					throw new Error('At least 1 stock symbols are incorrectly entered. Please check your list and delete the invalid stock symbols');
				}
			})
			.catch((error: AxiosError | Error) => {
				if (axios.isAxiosError(error)) {
					if (error.response?.status === 403) {
						setErrorMessage('Please make sure your api key is valid or correctly entered');
					} else {
						setErrorMessage(JSON.stringify(error));
					}
				} else {
					setErrorMessage(error.message);
				}
			});
	}, [props.apiKey, props.symbols]);

	if (errorMessage) {
		return <Text color="redBright">{errorMessage}</Text>;
	}

	return result.length > 0 ? (
		<Table
			data={parse(result)} cell={props => {
				if (props.children?.toString().trim().startsWith('-')) {
					return <Text color="red">{props.children}</Text>;
				}

				if (props.children?.toString().trim().startsWith('+')) {
					return <Text color="green">{props.children}</Text>;
				}

				return <Text>{props.children}</Text>;
			}}/>

	) : <Text color="cyan">Loading...</Text>;
};

export default App;
