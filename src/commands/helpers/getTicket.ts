import { logger } from '../../utils/Logger.js';
import { useApi } from '../../hooks/useApi.js';
import JiraApi from 'jira-client';

async function getTicket(issueKey: string, options?: string[]): Promise<JiraApi.JsonResponse> {
  try {
    const jira = useApi();
    const response = await jira.getIssue(issueKey, options ?? 'summary');

    return response.fields;
  } catch (error) {
    logger.error('Error fetching JIRA ticket details:', (error as Error).message);
    throw error;
  }
}

export { getTicket };
