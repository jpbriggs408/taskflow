import enquirer from 'enquirer';
const { prompt } = enquirer;

import { logger } from '../utils/Logger.js';
import { useApi } from '../hooks/useApi.js';

type Transition = {
  id: string;
  name: string;
};

export async function update(issueKey: string): Promise<void> {
  if (!issueKey) {
    logger.error('Please provide an issue key');
    return;
  }

  const jira = useApi();
  const { transitions } = await jira.listTransitions(issueKey);

  // Create a map to store the relationship between name and id
  const transitionMap = new Map(transitions.map((t: Transition) => [t.name, t.id]));

  const { newStatus }: { newStatus: string } = await prompt({
    type: 'select',
    name: 'newStatus',
    message: 'Select a new status',
    choices: transitions.map(({ name }: Transition) => ({ name: name, value: name })),
  });

  const newStatusId = transitionMap.get(newStatus) || '';

  try {
    await jira.updateIssue(issueKey, {
      update: {
        comment: [
          {
            add: {
              body: 'Status updated using TaskFlow',
            },
          },
        ],
      },
      transition: {
        id: newStatusId,
      },
    });

    logger.log(`Issue ${issueKey} status updated to ${newStatus}`);
  } catch (error) {
    logger.error('Error updating issue status:', (error as Error).message);
  }
}
