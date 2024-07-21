#!/usr/bin/env node
import { program } from 'commander';

// import { assign } from './commands/assign';
import { auth } from './commands/auth.js';
import { branch } from './commands/branch.js';
// import { comment } from './commands/comment';
import { commit } from './commands/commit.js';
import { create } from './commands/create.js';
// import { describe } from './commands/describe';
// import { list } from './commands/list';
// import { update } from './commands/update';

program
  .version('1.0.0')
  .description(
    'TaskFlow: A CLI tool for managing JIRA issues and Git branches',
  );

// program
//   .command('assign <issueKey> [assignee]')
//   .description('Assign an issue to yourself or someone else')
//   .action(assign);

program
  .command('auth')
  .description('Configure your JIRA credentials')
  .action(auth);

program
  .command('branch <issueKey>')
  .description('Create a branch from an existing JIRA ticket')
  .action(branch);

// program
//   .command('comment <issueKey>')
//   .description('Add a comment to an issue')
//   .action(comment);

program
  .command('commit')
  .description('Create a consistently named commit')
  .action(commit);

program
  .command('create [branchName]')
  .description(
    'Create a JIRA ticket and corresponding Git branch - takes an optional branch name',
  )
  .action(create);

// program
//   .command('describe <issueKey>')
//   .description('Show details of a specific issue')
//   .action(describe);

// program
//   .command('list')
//   .description('List your assigned or recently viewed issues')
//   .option('-a, --assigned', 'Show only assigned issues')
//   .option('-r, --recent', 'Show recently viewed issues')
//   .option('-l, --limit <number>', 'Limit the number of issues shown', parseInt)
//   .action(list);

// program
//   .command('update <issueKey>')
//   .description('Update the status of an issue')
//   .action(update);

program
  .command('help')
  .description('Display help information')
  .action(() => {
    console.log(`
TaskFlow - JIRA and Git Management CLI

Usage:
  taskflow [command] [options]

Commands:
  assign <issueKey> [assignee]  Assign an issue to yourself or someone else
  auth                          Configure your JIRA credentials
  comment <issueKey>            Add a comment to an issue
  commit                        Create a consistently named commit
  create [issueKey]             Create a JIRA ticket and corresponding Git branch
  describe <issueKey>           Show details of a specific issue
  list [options]                List your assigned or recently viewed issues
  update <issueKey>             Update the status of an issue

Options:
  -v, --version                 Output the version number
  -h, --help                    Display help for command

Examples:
  $ taskflow auth
  $ taskflow create
  $ taskflow list --assigned --limit 5
  $ taskflow describe PROJ-123
  $ taskflow assign PROJ-123
  $ taskflow update PROJ-123
  $ taskflow comment PROJ-123
  $ taskflow commit

For more information, visit: https://github.com/yourusername/taskflow
    `);
  });

program.parse(process.argv);
