import React, { Component } from 'react';
import { Box, render, Text } from 'ink';
import Divider from 'ink-divider';
import SelectInput from 'ink-select-input';
import chalk from "chalk";
import figlet from 'figlet';
import open from "open";

import jsonCliItems from './json-files/cli-items';
import introText from './json-files/intro-text';

const log = console.log;

const CommandLineUi = () => {

  const createItems = items => {
    for (const item of items) {
      item.key = item.url || item.label;
    }

    return items;
  };

  const handleSelect = cliItem => {
    if (cliItem.url) {
      open(cliItem.url);
    }
    if (cliItem.action === 'exit') {
      process.exit();
    }
  };

  const showBlogs = item => {
    if (item.label === 'Blogs') {
      item.blogs.forEach(blog => process.stdout.write(chalk.green(blog.name, chalk.underline.bgBlue(blog.url))));
    }
  };

  return (
    <Box flexDirection="column" marginBottom={1}>
      <Box marginBottom={1}>
        {log(chalk.red(figlet.textSync('NEMANJAS CLI', { horizontalLayout: 'full' })))}
      </Box>
      <Box marginBottom={1}>
        <Text>{chalk.bold(introText.intro)}</Text>
      </Box>
      <Divider title={'You can find me on'} titleColor={'red'} dividerColor={'blue'} />
      <Box>
        <SelectInput
          items={createItems(jsonCliItems)}
          onSelect={handleSelect}
          onHighlight={item => showBlogs(item)} />
      </Box>
    </Box>
  );
}

render(<CommandLineUi />);