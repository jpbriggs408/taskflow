import enquirer from 'enquirer';
const { prompt } = enquirer;

import { useApi } from '../hooks/useApi.js';
import { getTicket } from './helpers/getTicket.js';
import { logger } from '../utils/Logger.js';

export async function comment(issueKey: string) {
  if (!issueKey) {
    logger.error('Issue key is required');
    return;
  }

  const jira = useApi();

  const { summary } = await getTicket(issueKey);

  // Confirm the ticket is the correct one, then prompt for a comment to add
  logger.log(`Adding comment to ${issueKey} - ${summary}`);
  const proceed: { proceed: 'Yes' | 'No' } = await prompt({
    type: 'select',
    name: 'proceed',
    message: `Is this the correct ticket?`,
    choices: ['Yes', 'No'],
  });

  if (!proceed || proceed.proceed === 'No') {
    logger.log('Aborted');
    return;
  }

  const { comment }: { comment: string } = await prompt({
    type: 'input',
    name: 'comment',
    message: 'Enter your comment:',
  });

  try {
    await jira.addComment(issueKey, comment);
    logger.log('Comment added successfully');
  } catch (error) {
    logger.error('Error adding comment:', (error as Error).message);
  }
}
