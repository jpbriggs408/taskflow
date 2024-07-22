#!/usr/bin/env node
import { program } from 'commander';

import { logger } from './utils/Logger.js';

import { assign } from './commands/assign.js';
import { auth } from './commands/auth.js';
import { branch } from './commands/branch.js';
import { comment } from './commands/comment.js';
import { commit } from './commands/commit.js';
import { create } from './commands/create.js';
import { describe } from './commands/describe.js';
import { list } from './commands/list.js';
import { update } from './commands/update.js';

program
  .version('1.0.0')
  .description('TaskFlow: A CLI tool for managing JIRA issues and Git branches');

program.command('assign <issueKey>').description('Assign an issue to yourself').action(assign);

program.command('auth').description('Configure your JIRA credentials').action(auth);

program
  .command('branch <issueKey>')
  .description('Create a branch from an existing JIRA ticket')
  .action(branch);

program.command('comment <issueKey>').description('Add a comment to an issue').action(comment);

program.command('commit').description('Create a consistently named commit').action(commit);

program
  .command('create [branchName]')
  .description('Create a JIRA ticket and corresponding Git branch - takes an optional branch name')
  .action(create);

program
  .command('describe <issueKey>')
  .description('Show details of a specific issue')
  .action(describe);

program.command('list').description('List your assigned issues').action(list);

program.command('update <issueKey>').description('Update the status of an issue').action(update);

program
  .command('help')
  .description('Display help information')
  .action(() => {
    logger.log(`
TaskFlow - JIRA and Git Management CLI

Usage:
  taskflow [command] [options]

Commands:
  assign <issueKey>             Assign an issue to yourself
  auth                          Configure your JIRA credentials
  comment <issueKey>            Add a comment to an issue
  commit                        Create a consistently named commit message
  create [branchName]           Create a JIRA ticket and corresponding Git branch
  describe <issueKey>           Show details of a specific issue
  list                          List your assigned or recently viewed issues
  update <issueKey>             Update the status of an issue

Options:
  -v, --version                 Output the version number
  -h, --help                    Display help for command

Examples:
  $ taskflow auth
  $ taskflow create
  $ taskflow create "feature/some-new-feature"
  $ taskflow list
  $ taskflow describe ABC-123
  $ taskflow assign ABC-123
  $ taskflow update ABC-123
  $ taskflow comment ABC-123
  $ taskflow commit

For more information, visit: https://github.com/jpbriggs408/taskflow
    `);
  });

program.parse(process.argv);
