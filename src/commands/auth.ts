import enquirer from 'enquirer';
const { prompt } = enquirer;

import { useConfig, updateConfig } from '../hooks/useConfig.js';
import { useApi } from '../hooks/useApi.js';
import { TaskFlowConfig } from '../types/index.js';
import { logger } from '../utils/Logger.js';
import JiraApi from 'jira-client';

interface JiraApiResponse {
  self: string;
  accountId: string;
  accountType: string;
  emailAddress: string;
  avatarUrls: object;
  displayName: string;
  active: boolean;
  timeZone: string; // "America/New_York"
  locale: string; // "en_US"
  groups: object;
  applicationRoles: object;
  expand: string;
}

async function verifyJiraCredentials(): Promise<void> {
  // Verify the JIRA credentials
  const jira = useApi();
  const response = await jira.getCurrentUser();

  // Type guard to ensure response matches JiraApiResponse
  const isJiraApiResponse = (res: JiraApi.JsonResponse): res is JiraApiResponse => {
    return res.accountId !== undefined && res.emailAddress !== undefined;
  };

  if (isJiraApiResponse(response)) {
    logger.log(`Authenticated as: ${response.displayName}`);
    logger.log(`Email: ${response.emailAddress}`);
    logger.log(`Account ID: ${response.accountId}`);

    updateConfig({ jiraAccountId: response.accountId });

    logger.log('JIRA credentials updated and verified successfully!');
  } else {
    throw new Error('Unexpected response format from JIRA API');
  }
}

export async function auth(): Promise<void> {
  const currentConfig = useConfig();

  const questions = [
    {
      type: 'input',
      name: 'jiraUrl',
      message: 'Enter your JIRA URL:',
      default: currentConfig.jiraUrl,
    },
    {
      type: 'input',
      name: 'jiraEmail',
      message: 'Enter your JIRA email:',
      default: currentConfig.jiraEmail,
    },
    {
      type: 'password',
      name: 'jiraApiToken',
      message: 'Enter your JIRA API token:',
      default: currentConfig.jiraApiToken,
      mask: '*',
    },
    {
      type: 'input',
      name: 'jiraProjectKey',
      message: 'Enter your JIRA project key:',
      default: currentConfig.jiraProjectKey,
    },
    {
      type: 'input',
      name: 'jiraProjectKey',
      message: 'Enter your JIRA account ID:',
      default: currentConfig.jiraAccountId,
    },
  ];

  // Prompt the user for JIRA credentials and update the base config
  const answers = await prompt<TaskFlowConfig>(questions);
  updateConfig(answers);

  // Test the JIRA credentials (calls base config)
  verifyJiraCredentials();
}
