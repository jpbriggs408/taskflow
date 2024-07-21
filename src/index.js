#!/usr/bin/env node
const { program } = require('commander');

program
  .version('1.0.0')
  .description('A CLI tool for managing JIRA issues and Git branches');

program.parse(process.argv);