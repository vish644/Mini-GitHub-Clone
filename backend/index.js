const dotenv = require("dotenv");
dotenv.config();

const yargs = require("yargs");
const { hideBin } = require("yargs/helpers");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { initRepo } = require("./controllers/init");
const { add } = require("./controllers/add");
const { commit } = require("./controllers/commit");
const { push } = require("./controllers/push");
const { pull } = require("./controllers/pull");
const { revert } = require("./controllers/revert");
const bodyParser = require("body-parser");
const mainRouter = require("./routes/main.router");

yargs(hideBin(process.argv))
  .command("start", "Starts a new server", {}, startServer)
  .command("init", "Initialise a new repository", {}, initRepo)
  .command(
    "add <file>",
    "Add a file to the repository",
    (yargs) => {
      yargs.positional("file", {
        describe: "File added to the staging area",
        type: "string",
      });
    },
    (argv) => {
      add(argv.file);
    },
  )
  .command(
    "commit <message>",
    "Commit the staged files",
    (yargs) => {
      yargs.positional("message", {
        describe: "Commit message",
        type: "string",
      });
    },
    (argv) => {
      commit(argv.message);
    },
  )
  .command("push", "Push commits to S3", {}, push) 
  .command("pull", "Pull commits from S3", {}, pull)
  .command(
    "revert <commitID>",
    "Revert to a specific commit",
    (yargs) => {
      yargs.positional("commitID", {
        describe: "Comit ID to revert to",
        type: "string",
      });
    },
    (argv) => {
      revert(argv.commitID);
    },
  )
  .demandCommand(1, "You need at least one command")
  .help().argv;

function startServer() {
  const app = express();
  const port = process.env.PORT || 3000;

  app.use(bodyParser.json()); //To parse JSON data
  app.use(cors({ origin: "*" })); //To allow requests from any origin
  app.use("/", mainRouter); //Use the main router for all routes

  const mongoURL = process.env.MONGODB_URI;
  mongoose
    .connect(mongoURL)
    .then(() => {
      console.log("MongoDB connected successfully!");
    })
    .catch((error) => {
      console.log("Error connecting to MongoDB:", error);
    });

  const user = "test";
  const httpServer = http.createServer(app); //Create an HTTP server using the Express app
  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    socket.on("message", (userId) => {
      user = userId;
      console.log("====");
      console.log(user);
      console.log("====");
      socket.join(userId); //Join the user to a room with their userId as the room name
    });
  });

  const db = mongoose.connection;

  db.once("open", () => {
    console.log("CRUD operations called!");
  });

  httpServer.listen(port, () => {
    console.log(`Server is running on the port ${port}!`);
  });
}