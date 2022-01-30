import React from 'react';
import chalk from 'chalk';
import test from 'ava';
import {render} from 'ink-testing-library';
import App from './ui';

test('should render correctly', t => {
	const {lastFrame} = render(<App apiKey="123jix" symbols={['FB', 'GOOG']}/>);
	t.is(lastFrame(), chalk`{cyan Loading...}`);
});
