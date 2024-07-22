import JiraApi from 'jira-client';
import { useConfig } from './useConfig.js';

export function useApi(): JiraApi {
  const config = useConfig();
  return new JiraApi({
    protocol: 'https',
    host: config.jiraUrl,
    username: config.jiraEmail,
    password: config.jiraApiToken,
    apiVersion: '2',
    strictSSL: true,
  });
}
