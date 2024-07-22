import { simpleGit, SimpleGit } from 'simple-git';
import { logger } from '../../utils/Logger.js';

async function createBranch(branchName: string): Promise<void> {
  const git: SimpleGit = simpleGit();

  try {
    await git.checkoutLocalBranch(branchName);
    logger.log(`Created and switched to branch: ${branchName}`);
  } catch (e) {
    logger.error('Error creating Git branch:', (e as Error).message);
    throw e;
  }
}

export { createBranch };
