import { useConfig } from '../hooks/useConfig.js';
import { useApi } from '../hooks/useApi.js';
import { logger } from '../utils/Logger.js';

export async function list() {
  const jira = useApi();
  const config = useConfig();

  try {
    const response = await jira.getUsersIssues(config.jiraAccountId, true);

    logger.log('Issues:');
    response.issues.forEach(
      (issue: { key: string; fields: { status: { name: string }; summary: string } }) => {
        logger.log(`${issue.key}: [${issue.fields.status.name}] ${issue.fields.summary}`);
      },
    );
  } catch (error) {
    logger.error('Error fetching issues:', (error as Error).message);
  }
}
