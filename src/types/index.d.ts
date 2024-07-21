export interface TaskFlowConfig {
  jiraUrl: string;
  jiraEmail: string;
  jiraApiToken: string;
  jiraProjectKey: string;
  jiraAccountId: string;
}

export enum ChangeType {
  FEAT = 'feat',
  FIX = 'fix',
  DOCS = 'docs',
  STYLE = 'style',
  REFACTOR = 'refactor',
  PERF = 'perf',
  TEST = 'test',
  CHORE = 'chore',
}

export interface JiraTicket {
  key: string;
  summary: string;
  description: string;
  issueType: string;
}
