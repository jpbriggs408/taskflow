import enquirer from 'enquirer';
const { prompt } = enquirer;
import { logger } from '../utils/Logger.js';

type CommitType = 'feat' | 'fix' | 'docs' | 'style' | 'refactor' | 'test' | 'chore';

interface CommitAnswers {
  type: CommitType;
  scope: string;
  message: string;
  body: string;
  breaking: boolean;
  executeCommit: boolean;
}

const commitTypeExplanations = {
  feat: 'A new feature',
  fix: 'A bug fix',
  docs: 'Documentation only changes',
  style: 'Changes that do not affect the meaning of the code (white-space, formatting, etc)',
  refactor: 'A code change that neither fixes a bug nor adds a feature',
  test: 'Adding missing tests or correcting existing tests',
  chore:
    'Changes to the build process or auxiliary tools and libraries such as documentation generation',
};

export async function commit(): Promise<void> {
  logger.log("Welcome to the guided commit process. Let's create a conventional commit!");

  const answers: CommitAnswers = await prompt([
    {
      type: 'select',
      name: 'type',
      message: 'Select the type of commit:',
      choices: Object.entries(commitTypeExplanations).map(([type, explanation]) => ({
        message: `${type}: ${explanation}`,
        name: type,
      })),
    },
    {
      type: 'input',
      name: 'message',
      message: 'Enter the commit message:',
      validate: (input: string) => input.length > 0 || 'Message is required',
    },
    {
      type: 'input',
      name: 'body',
      message: 'Provide a longer description of the change (optional):',
    },
    {
      type: 'input',
      name: 'scope',
      message: 'Enter the scope of this change (optional):',
    },
  ]);

  const scope = answers.scope ? `\n\n(${answers.scope})` : '';
  const body = answers.body ? `\n\n${answers.body}` : '';

  const commitMessage = `${answers.type}: ${answers.message}${body}${scope}`;
  const commitCommand = `git commit -S -m "${commitMessage}"`;
  logger.log("\nHere's your formatted commit:");
  logger.log(`\n${commitCommand}\n`);
}
