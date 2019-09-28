import React, {Component} from 'react';
import {Box, render, Text} from 'ink';
import Divider from 'ink-divider';
import SelectInput from 'ink-select-input';
import chalk from "chalk";
import figlet from 'figlet';
import open from "open";

import cliItems from './json-files/cli-items';
import introText from './json-files/intro-text';

const log = console.log;

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
		if (cliItem.action === 'exit') {
			process.exit();
		}
	};

	showBlogs = item => {
		if (item.label === 'Blogs') {
			item.blogs.forEach(blog => log(chalk.green(blog.name, chalk.underline.bgBlue(blog.url))));
		}
	};

	render() {
		return (
			<Box flexDirection="column">
				<Box marginBottom={1}>
					{log(chalk.red(figlet.textSync('NeMaNJaS CLI', {horizontalLayout: 'full'})))}
				</Box>
				<Box marginBottom={1}>
					<Text>{chalk.bold(introText.intro)}</Text>
				</Box>
				<Divider title={'You can find me on'} titleColor={'red'} dividerColor={'blue'}/>
				<Box>
					<SelectInput
						items={this.createItems(this.state.cliItems)}
						onSelect={this.handleSelect}
						onHighlight={item => this.showBlogs(item)}/>
				</Box>
			</Box>
		);
	}
}

render(<CommandLineUi/>);