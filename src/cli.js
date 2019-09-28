import React, {Component} from 'react';
import {Box, Text, render} from 'ink';
import SelectInput from 'ink-select-input';
import chalk from "chalk";
import figlet from 'figlet';
import open from "open";
import cliItems from './cli-items';

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

	constructor() {
		super();
		this.state = {cliItems: cliItems}
	}

	createItems = items => {
		for (const item of items) {
			item.key = item.url || item.label;
		}

		return items;
	};

	handleSelect = cliItem => {
		if (cliItem.url) {
			open(cliItem.url);
		}
		if (cliItem.action) {
			process.exit();
		}
	};

	render() {
		return (
			<Box flexDirection="column">
				<Box marginBottom={1}>
					{console.log(chalk.red(figlet.textSync('NeMaNJaS CLI', {horizontalLayout: 'full'})))}
				</Box>
				<Box marginBottom={1}>
					<Text>{chalk.bold(textIntro)}</Text>
				</Box>
				<SelectInput items={this.createItems(this.state.cliItems)} onSelect={this.handleSelect}/>
			</Box>
		);
	}
}

render(<CommandLineUi/>);