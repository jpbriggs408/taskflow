import { logger } from '../utils/Logger.js';
import { useApi } from '../hooks/useApi.js';
import { useConfig } from '../hooks/useConfig.js';

export async function assign(issueKey: string) {
  if (!issueKey) {
    logger.error('Issue key is required');
    return;
  }

  const config = useConfig();
  const assignee = config.jiraAccountId;

  logger.log(`Assigning issue ${issueKey} to ${assignee}`);

  try {
    const jira = useApi();
    jira.updateAssigneeWithId(issueKey, assignee);

    logger.log(`Issue ${issueKey} assigned to ${assignee}`);
  } catch (error) {
    logger.error('Error assigning issue:', (error as Error).message);
  }
}
