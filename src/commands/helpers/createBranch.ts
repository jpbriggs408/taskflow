import { branch } from 'commands/branch.js';
import { simpleGit, SimpleGit } from 'simple-git';

async function createBranch(branchName: string): Promise<void> {
  const git: SimpleGit = simpleGit();

  try {
    await git.checkoutLocalBranch(branchName);
    console.log(`Created and switched to branch: ${branchName}`);
  } catch (e) {
    console.error('Error creating Git branch:', (e as Error).message);
    throw e;
  }
}

export { createBranch };
