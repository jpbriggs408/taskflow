import axios from 'axios';
import { TaskFlowConfig } from 'types/index.js';

async function getTicket(
  issueKey: string,
  config: TaskFlowConfig,
): Promise<{ summary: string; description: string }> {
  try {
    const response = await axios.get(
      `${config.jiraUrl}/rest/api/3/issue/${issueKey}`,
      {
        auth: {
          username: config.jiraEmail,
          password: config.jiraApiToken,
        },
        headers: {
          Accept: 'application/json',
        },
      },
    );

    const summary = response.data.fields.summary;
    const description =
      response.data.fields.description?.content[0]?.content[0]?.text || '';

    return { summary, description };
  } catch (error) {
    console.error(
      'Error fetching JIRA ticket details:',
      (error as Error).message,
    );
    throw error;
  }
}

export { getTicket };
