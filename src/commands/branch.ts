import enquirer from 'enquirer';
const { prompt } = enquirer;

import { getTicket } from '../commands/helpers/getTicket.js';
import { createBranch } from '../commands/helpers/createBranch.js';
import { logger } from '../utils/Logger.js';

// Creates a new branch from an existing ticket.
export async function branch(issueKey: string): Promise<void> {
  if (!issueKey) {
    logger.error('Issue key is required');
    return;
  }

  try {
    // Get the ticket details.
    logger.log(`Fetching details for JIRA ticket ${issueKey}...`);
    const { summary } = await getTicket(issueKey);
    logger.log(`Ticket summary: ${summary}`);

    // Confirm branch creation.
    const proceed: { proceed: 'Yes' | 'No' } = await prompt({
      type: 'select',
      name: 'proceed',
      message: `Create branch from '${issueKey}'?`,
      choices: ['Yes', 'No'],
    });

    if (proceed.proceed === 'Yes') {
      await createBranch(issueKey);
      logger.log(`Branch '${issueKey}' created and checked out.`);
    } else {
      logger.log('Branch creation cancelled.');
    }
  } catch (error) {
    logger.error('An error occurred:', (error as Error).message);
  }
}
