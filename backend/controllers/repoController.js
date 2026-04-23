const mongoose = require("mongoose");
const Repository = require("../models/repoModel");

// create repository
async function createRepository(req, res) {
  const { owner, name, issues, content, description, visibility } = req.body;

  try {
    if (!name) {
      return res.status(400).json({ error: "Repository name is required!" });
    }

    if (!mongoose.Types.ObjectId.isValid(owner)) {
      return res.status(400).json({ error: "Invalid user ID!" });
    }

    const newRepository = new Repository({
      owner,
      name,
      issues,
      content,
      description,
      visibility,
    });

    const result = await newRepository.save();

    res.status(200).json({
      message: "Repository created successfully!",
      repositoryId: result._id,
    });
  } catch (error) {
    console.error("Error creating repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// get all repositories
async function getAllRepositories(req, res) {
  try {
    const repositories = await Repository.find({})
      .populate("owner")
      .populate("issues");

    res.status(200).json(repositories);
  } catch (error) {
    console.error("Error fetching repositories:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

//  fetch by id
async function fetchRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id)
      .populate("owner")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.status(200).json(repository);
  } catch (error) {
    console.error("Error fetching repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// fetch by name
async function fetchRepositoryByName(req, res) {
  const { name } = req.params;

  try {
    const repository = await Repository.find({ name })
      .populate("owner")
      .populate("issues");

    if (!repository) {
      return res.status(404).json({ error: "Repository not found!" });
    }

    res.status(200).json(repository);
  } catch (error) {
    console.error("Error fetching repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// fetch by current user
// async function fetchRepositoriesForCurrentUser(req, res) {
//   const userId = req.user;

//   try {
//     const repositories = await Repository.find({ owner: userId });

//     if (!repositories || repositories.length === 0) {
//       return res
//         .status(404)
//         .json({ error: "No repositories found for this user!" });
//     }

//     res
//       .status(200)
//       .json({ message: "Repositories fetched successfully!", repositories });
//   } catch (error) {
//     console.error("Error during fetching user repository:", error);
//     return res.status(500).json({ error: "Internal server error!" });
//   }
// }

async function fetchRepositoriesForCurrentUser(req, res) {
  const { userId } = req.params;

  try {
    const repositories = await Repository.find({
      owner: new mongoose.Types.ObjectId(userId),
    });

    if (repositories.length === 0) {
      return res.status(200).json([]);
    }

    res.status(200).json(repositories);
  } catch (error) {
    console.error("Error during fetching user repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// update repository by id
async function updateRepositoryById(req, res) {
  const { id } = req.params;
  const { description, content } = req.body;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: " Repository not found!" });
    }

    repository.content.push(content);
    repository.description = description;

    const updatedRepository = await repository.save();

    res.status(200).json({
      message: "Repository updated successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error("Error during updating user repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// toggle repository visibility by id
async function toggleRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findById(id);

    if (!repository) {
      return res.status(404).json({ error: " Repository not found!" });
    }

    repository.visibility = !repository.visibility;

    const updatedRepository = await repository.save();

    res.status(200).json({
      message: "Repository visibility toggled successfully!",
      repository: updatedRepository,
    });
  } catch (error) {
    console.error(
      "Error during toggling visibility of user repository:",
      error,
    );
    return res.status(500).json({ error: "Internal server error!" });
  }
}

// delete repository by id
async function deleteRepositoryById(req, res) {
  const { id } = req.params;

  try {
    const repository = await Repository.findByIdAndDelete(id);

    if (!repository) {
      return res.status(404).json({ error: " Repository not found!" });
    }

    res.status(200).json({ message: "Repository deleted successfully!" });
  } catch (error) {
    console.error("Error during deleting user repository:", error);
    return res.status(500).json({ error: "Internal server error!" });
  }
}

module.exports = {
  createRepository,
  getAllRepositories,
  fetchRepositoryById,
  fetchRepositoryByName,
  fetchRepositoriesForCurrentUser,
  updateRepositoryById,
  toggleRepositoryById,
  deleteRepositoryById,
};
