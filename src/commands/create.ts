// Packages
import enquirer from 'enquirer';
const { prompt } = enquirer;
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';
const exec = promisify(execCallback);

// Imports
import { createBranch } from '../commands/helpers/createBranch.js';
import { useConfig } from '../hooks/useConfig.js';
import { useApi } from '../hooks/useApi.js';
import { logger } from '../utils/Logger.js';

// Type Definitions
import { JiraTicket } from 'types/index.js';

// Functions
async function getCurrentBranch(): Promise<string> {
  try {
    const { stdout } = await exec('git branch --show-current');
    return stdout.trim();
  } catch (error) {
    logger.error('Error getting current branch:', (error as Error).message);
    throw error;
  }
}

async function createJiraTicket({ summary, description, issueType }: JiraTicket): Promise<string> {
  const config = useConfig();
  const jira = useApi();

  const issue = {
    fields: {
      project: {
        key: config.jiraProjectKey,
      },
      summary,
      description,
      issuetype: {
        name: issueType,
      },
    },
  };

  try {
    const response = await jira.addNewIssue(issue);
    return response.key;
  } catch (e) {
    logger.error('Error creating JIRA ticket:', (e as Error).message);
    throw e;
  }
}

// Creates a ticket and then creates a new branch using that ticket's key.
// Can take in an optional branch name as an argument.
export async function create(branchName?: string) {
  const answers: JiraTicket = await prompt([
    {
      type: 'input',
      name: 'summary',
      message: 'Enter ticket summary:',
      validate: (input: string) => input.trim().length > 0 || 'Summary cannot be empty',
    },
    {
      type: 'input',
      name: 'description',
      message: 'Enter ticket description:',
    },
    {
      type: 'select',
      name: 'issueType',
      message: 'Select issue type:',
      choices: ['Task', 'Bug', 'Story'],
    },
  ]);

  try {
    logger.log('Creating JIRA ticket...');
    const createdIssueKey = await createJiraTicket(answers);
    logger.log(`JIRA ticket created: ${createdIssueKey}`);

    // If current branch is main, create a new branch.
    const currentBranch = await getCurrentBranch();
    if ((await getCurrentBranch()) === 'main') {
      logger.log('Creating Git branch...');
      await createBranch(branchName ?? createdIssueKey);
    } else {
      logger.log(`Using existing branch ${currentBranch} for issue ${createdIssueKey}`);
    }

    logger.log('Done!');
  } catch (e) {
    logger.error('An error occurred:', (e as Error).message);
  }
}
