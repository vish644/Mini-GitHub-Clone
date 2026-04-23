const mongoose = require("mongoose");
const { Schema } = mongoose;
// const User = require("../models/userModel");
const Repository = require("../models/repoModel");

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    repositories: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],
    followedUsers: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    starRepos: [
      {
        default: [],
        type: Schema.Types.ObjectId,
        ref: "Repository",
      },
    ],
  },
  { timestamps: true },
);

const User = mongoose.model("User", UserSchema);
module.exports = User;