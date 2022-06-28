/**
 * ------ REQUIRES -----
 */

const express_config = require("./express_config.js");
const mongo_config = require("./mongo_config.js");

/**
 * ------- CONFIG -------
 */

// MONGO
mongo_config();

// EXPRESS
const app = express_config();

module.exports = app;
