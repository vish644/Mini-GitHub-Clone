const fs = require("fs").promises;
const path = require("path");
const { S3, S3_BUCKET } = require("../config/aws-config");

async function pull() {
  const repoPath = path.resolve(process.cwd(), ".apnaGit");
  const commitsPath = path.join(repoPath, "commits");

  try {
    await fs.mkdir(commitsPath, { recursive: true });

    const data = await S3.listObjectsV2({
      Bucket: S3_BUCKET,
      Prefix: "commits/",
    }).promises();

    const objects = data.Contents || [];
    for (const object of objects) {
      const key = object.key;
      const commitFile = path.join(
        commitsPath,
        path.dirname(key).split("/").pop(),
      );

      await fs.mkdir(commitFile, { recursive: true });

      const params = {
        Bucket: S3_BUCKET,
        Key: key,
      };

      const fileContent = await S3.getObject(params).promises();
      await fs.writeFile(path.join(repoPath, key), fileContent.Body);

      console.log("All commits pulled from s3.");
    }
  } catch (error) {
    console.error("Unable to pull", error);
  }
}

module.exports = { pull };
