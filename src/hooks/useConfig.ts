import Conf from 'conf';
import { TaskFlowConfig } from '../types/index.js';
import dotenv from 'dotenv';

dotenv.config();

const config = {
  jiraUrl: process.env.JIRA_URL,
  jiraEmail: process.env.JIRA_EMAIL,
  jiraApiToken: process.env.JIRA_API_TOKEN,
  jiraProjectKey: process.env.JIRA_PROJECT_KEY,
  jiraAccountId: process.env.JIRA_ACCOUNT_ID,
};


let cachedConfig: TaskFlowConfig | null = null;

export function useConfig(): TaskFlowConfig {
  if (cachedConfig) {
    return cachedConfig;
  }

  const conf = new Conf({
    projectName: 'taskflow',
  });

  cachedConfig = {
    jiraUrl: (config.jiraUrl ?? conf.get('jiraUrl') as string) || '',
    jiraEmail: (config.jiraEmail ?? conf.get('jiraEmail') as string) || '',
    jiraApiToken: (config.jiraApiToken ?? conf.get('jiraApiToken') as string) || '',
    jiraProjectKey: (config.jiraProjectKey ?? conf.get('jiraProjectKey') as string) || '',
    jiraAccountId: (config.jiraAccountId ?? conf.get('jiraAccountId') as string) || '',
  };

  return cachedConfig;
}

export function updateConfig(newConfig: Partial<TaskFlowConfig>): TaskFlowConfig {
  const conf = new Conf({ projectName: 'taskflow' });
  Object.entries(newConfig).forEach(([key, value]) => {
    conf.set(key, value);
  });
  cachedConfig = null; // Reset cache to force reload on next use
  return useConfig();
}
