import { getTicket } from './helpers/getTicket.js';
import { logger } from '../utils/Logger.js';

export async function describe(issueKey: string): Promise<void> {
  if (!issueKey) {
    logger.error('Please provide a valid issue key');
    return;
  }

  try {
    const response = await getTicket(issueKey, [
      'summary',
      'status',
      'issuetype',
      'assignee',
      'reporter',
      'description',
    ]);

    logger.log(`Summary: ${response.summary}`);
    logger.log(`Status: ${response.status.name}`);
    logger.log(`Type: ${response.issuetype.name}`);
    logger.log(`Assignee: ${response.assignee ? response.assignee.displayName : 'Unassigned'}`);
    logger.log(`Reporter: ${response.reporter.displayName}`);
    logger.log(`Description: \n\n${response.description ?? 'No description'}\n`);
  } catch (error) {
    logger.error('Error fetching issue details:', (error as Error).message);
  }
}
