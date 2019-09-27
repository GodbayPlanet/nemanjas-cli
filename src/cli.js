const SelectInput = require('ink-select-input').default;
const open = require('open');

const figlet = require('figlet');
const chalk = require('chalk');

import React, {Component} from 'react';
import {Box, Text, render} from 'ink';

const handleSelect = item => {
	if (item.url) {
		open(item.url);
	}

	if (item.action) {
		item.action();
	}
};

const createItems = items => {
	for (const item of items) {
		item.key = item.url || item.label;
	}

	return items;
};

const items = createItems([
	{
		label: 'GitHub',
		url: 'https://github.com/GodbayPlanet'
	},
	{
		label: 'LinkedIn',
		url: 'https://www.linkedin.com/in/nemanja-vasic-linked'
	},
	{
		label: 'Quit',
		action() {
			process.exit(); // eslint-disable-line unicorn/no-process-exit
		}
	}
]);

const textIntro = "Hi, I’m a full-time software developer working for codecentric. " +
	"This is my CLI. Play with it and tell me what you think.";

class CommandLineUi extends Component {
	render() {
		return (
			<Box flexDirection="column">
				<Box marginBottom={1}>
					{console.log(chalk.red(figlet.textSync('NeMaNJaS CLI', {horizontalLayout: 'full'})))}
				</Box>
				<Box marginBottom={1}>
					<Text>{chalk.bold(textIntro)}</Text>
				</Box>
				<SelectInput items={items} onSelect={handleSelect}/>
			</Box>
		);
	}
}

render(<CommandLineUi/>);