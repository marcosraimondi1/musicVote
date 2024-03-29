const appRouter = require("./routes/app.js");
const spotifyRouter = require("./routes/spotify.js");
const roomRouter = require("./routes/room.js");
const playbackRouter = require("./routes/playback.js");
const healthRouter = require("./routes/health.js");

const express = require("express");
const morgan = require("morgan"); // for console logging info of request
const cors = require("cors"); // accept different origin requests
const dotenv = require("dotenv");
dotenv.config();

function express_config() {
  // instances
  const app = express();

  console.log("\n--------------------------------");
  console.log("   Running in " + process.env.NODE_ENV);
  console.log("--------------------------------\n");

  // express config
  app.use(morgan("tiny"));
  app.use(express.json());

  app.use(
    express.urlencoded({
      extended: true
    })
  );

  app.use(cors());

  // express routes
  app.use("/api", healthRouter); // check application health status
  app.use("/api", spotifyRouter);
  app.use("/api", roomRouter);
  app.use("/api", playbackRouter);

  // serve static build
  app.use("/", appRouter);

  // listener
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log("API server listening on port " + port);
  });

  return app;
}

module.exports = express_config;
