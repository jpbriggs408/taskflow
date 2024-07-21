import enquirer from 'enquirer';
const { prompt } = enquirer;

import { useConfig, updateConfig } from '../hooks/useConfig.js';
import { TaskFlowConfig } from '../types/index.js';

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

  const answers = await prompt<TaskFlowConfig>(questions);

  const config = updateConfig(answers);

  // Make a test request to verify the credentials

  console.log('JIRA credentials updated successfully!');
}
