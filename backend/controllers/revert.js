const fs = require("fs").promises;
const path = require("path");

async function revert(commitID) {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitPath = path.join(repoPath, "commits");

  try {
    const commitDir = path.join(commitPath, commitID);
    const files = await fs.readdir(commitDir);
    const parentDir = path.resolve(repoPath, "..");

    for (const file of files) {
      await fs.copyFile(path.join(commitDir, file), path.join(parentDir, file));
    }

    console.log(`Reverted to commit ${commitID}`);
  } catch (error) {
    console.error("Unable to revert!", error);
  }
}

module.exports = { revert };