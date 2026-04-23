const fs = require("fs").promises;
const path = require("path");
const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { S3, S3_BUCKET } = require("../config/aws-config.js");

async function push() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    const commitFiles = await fs.readdir(commitsPath);
    for (const commitFile of commitFiles) {
      const commitPath = path.join(commitsPath, commitFile);
      const files = await fs.readdir(commitPath);

      for (const file of files) {
        const filePath = path.join(commitPath, file);
        const fileContent = await fs.readFile(filePath);
        const params = {
          Bucket: S3_BUCKET,
          Key: `commits/${commitFile}/${file}`,
          Body: fileContent,
        };
        await S3.send(new PutObjectCommand(params));
        console.log(`Pushed ${file} to S3`);
      }
    }
  } catch (error) {
    console.error("Error pushing to S3:", error);
  }
}

module.exports = { push };