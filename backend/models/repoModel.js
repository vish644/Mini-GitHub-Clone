const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = require("../models/userModel");
const Issue = require("../models/issueModel");

const RepositortSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
    },
    content: [
      {
        type: String,
      },
    ],
    visibility: {
      type: Boolean,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    issues: [
      {
        type: Schema.Types.ObjectId,
        ref: "Issue",
      },
    ],
  },
  { timestamps: true },
);

const Repository = mongoose.model("Repository", RepositortSchema);
module.exports = Repository;