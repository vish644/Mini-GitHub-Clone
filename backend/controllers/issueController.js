const mongoose = require("mongoose");
const Issue = require("../models/issueModel");

// create issue by repository id
async function createIssue(req, res) {
  const { title, description } = req.body;
  const { id } = req.params;

  try {
    const issue = new Issue({
      title,
      description,
      repository: id,
    });

    await issue.save();

    res.status(201).json(issue);
  } catch (error) {
    console.error("Error creating issue:", error);
    res.status(500).json({ error: "Failed to create issue" });
  }
}
// update issue by repository id
async function updateIssueById(req, res) {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const issue = await Issue.findById(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    issue.title = title;
    issue.description = description;
    issue.status = status;

    await issue.save();

    res.status(200).json({ message: "Issue updated successfully!", issue });
  } catch (error) {
    console.error("Error updating issue:", error);
    res.status(500).json({ error: "Failed to update issue" });
  }
}

// delete issue by repository id
async function deleteIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.findByIdAndDelete(id);

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    res.status(200).json({ message: "Issue deleted successfully!", issue });
  } catch (error) {
    console.error("Error deleting issue:", error);
    res.status(500).json({ error: "Failed to delete issue" });
  }
}

// get all issues for a repository
async function getAllIssues(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.find({ repository: id });

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    res.status(200).json({ message: "Issues fetched successfully!", issue });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
}

// get issue by id repository id
async function getIssueById(req, res) {
  const { id } = req.params;

  try {
    const issue = await Issue.find({ repository: id });

    if (!issue) {
      return res.status(404).json({ error: "Issue not found!" });
    }

    res.status(200).json({ message: "Issues fetched successfully!", issue });
  } catch (error) {
    console.error("Error fetching issues:", error);
    res.status(500).json({ error: "Failed to fetch issues" });
  }
}

module.exports = {
  createIssue,
  updateIssueById,
  deleteIssueById,
  getAllIssues,
  getIssueById,
};
