const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { MongoClient, ReturnDocument } = require("mongodb");
const dotenv = require("dotenv");
var ObjectId = require("mongodb").ObjectId;

dotenv.config();
const uri = process.env.MONGODB_URI;
let client;

async function connectClient() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
  }
}

// get all users
async function getAllUsers(req, res) {
  try {
    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    const users = await userCollection.find({}).toArray();
    res.json(users);
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// Signup
async function signup(req, res) {
  const { username, password, email } = req.body;

  try {
    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    const existingUser = await userCollection.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hasshedPassword = await bcrypt.hash(password, salt);

    const newUser = {
      username,
      email,
      password: hasshedPassword,
      repositories: [],
      followedUsers: [],
      starRepos: [],
    };

    const result = await userCollection.insertOne(newUser);

    const token = jwt.sign(
      { id: result.insertedId },
      process.env.JWT_SECRET_KEY,
      {
        expiresIn: "1h",
      },
    );

    res.json({ token, userId: result.insertedId });
  } catch (error) {
    console.error("Error during signup:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// login
async function login(req, res) {
  const { email, password } = req.body;

  try {
    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ token, userId: user._id });
  } catch (error) {
    console.error("Error during login:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// get user by profile id
async function getUserProfile(req, res) {
  const currentId = req.params.id;

  try {
    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    const user = await userCollection.findOne({ _id: new ObjectId(currentId) });
    console.log("Fetched user:", user);
    if (!user) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({ message: "User profile fetched successfully!" });
  } catch (error) {
    console.error("Error during fetching:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// update user profile by id
async function updateUserProfile(req, res) {
  const currentId = req.params.id;
  const { email, password } = req.body;

  try {
    if (!email && !password) {
      return res.status(400).json({ message: "Nothing to update" });
    }

    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    let updateFields = {};

    if (email) {
      updateFields.email = email;
    }

    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      updateFields.password = hashedPassword;
    }

    const result = await userCollection.findOneAndUpdate(
      { _id: new ObjectId(currentId) },
      { $set: updateFields },
      { returnDocument: "after" },
    );

    if (!result.value) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.status(200).json({
      message: "User profile updated successfully!",
      user: result.value,
    });
  } catch (error) {
    console.error("Error during updating:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

// delete user profile by id
async function deleteUserProfile(req, res) {
  const currentId = req.params.id;

  try {
    await connectClient();
    const db = client.db("ApnaGitHubClone");
    const userCollection = db.collection("users");

    const result = await userCollection.deleteOne({
      _id: new ObjectId(currentId),
    });

    if (result.deleteCount === 0) {
      return res.status(404).json({ message: "User not found!" });
    }

    res.json({ message: "User profile deleted successfully!" });
  } catch (error) {
    console.error("Error during deleting:", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  getAllUsers,
  signup,
  login,
  getUserProfile,
  updateUserProfile,
  deleteUserProfile,
};