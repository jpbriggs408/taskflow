// Packages
import enquirer from 'enquirer';
const { prompt } = enquirer;

// With ES6
import JiraApi from 'jira-client';

import axios from "axios";
import { exec as execCallback } from 'child_process';
import { promisify } from 'util';

const exec = promisify(execCallback);

// Imports
import { createBranch } from "../commands/helpers/createBranch.js";
import { useConfig } from "../hooks/useConfig.js";

// Type Definitions
import { JiraTicket } from "types/index.js";

// Functions
async function getCurrentBranch(): Promise<string> {
  try {
    const { stdout } = await exec('git branch --show-current');
    return stdout.trim();
  } catch (error) {
    console.error('Error getting current branch:', (error as Error).message);
    throw error;
  }
}

async function createJiraTicket({ summary, description, issueType }: JiraTicket): Promise<string> {
  const config = useConfig();
  console.log(config);
  const jira = new JiraApi({
    protocol: 'https',
    host: config.jiraUrl,
    username: config.jiraEmail,
    password: config.jiraApiToken,
    apiVersion: '2',
    strictSSL: true
  });

  const issue = {
    fields: {
      project: {
        key: config.jiraProjectKey
      },
      summary,
      description,
      issuetype: {
        name: issueType
      }
    }
  };

  try {
    const response = await jira.addNewIssue(issue);
    console.log(response);
    return response.key;
  } catch (e) {
    console.error('Error creating JIRA ticket:', (e as Error).message);
    throw e;
  }
}

// Creates a ticket and then creates a new branch using that ticket's key.
// Can take in an optional branch name as an argument.
export async function create(branchName?: string) {
  const answers: JiraTicket = await prompt([
    {
      type: "input",
      name: "summary",
      message: "Enter ticket summary:"
    },
    {
      type: "input",
      name: "description",
      message: "Enter ticket description:" 
    },
    {
      type: "select",
      name: "issueType",
      message: "Select issue type:",
      choices: ["Task", "Bug", "Story"],
    },
  ]);

  try {
    console.log("Creating JIRA ticket...");
    const createdIssueKey = await createJiraTicket(
      answers
    );
    console.log(`JIRA ticket created: ${createdIssueKey}`);

    // If current branch is main, create a new branch.
    if (await getCurrentBranch() === "main") {
      console.log("Creating Git branch...");
      await createBranch(branchName ?? createdIssueKey);
    } else {
      console.log(`Using existing branch for issue ${createdIssueKey}`);
    }

    console.log("Done!");
  } catch (e) {
    console.error("An error occurred:", (e as Error).message);
  }
}
