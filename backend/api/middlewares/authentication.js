const { generateRandomString } = require("../helper/fetchApi.js");

const checkSession = (req, res, next) => {
  let session = req.get("session");

  if (session) {
    try {
      req.session = JSON.parse(session);
      if (session.id) {
        next();
        return;
      }
    } catch (error) {
      // continue
    }
  }

  // create new session
  req.session = {
    id: generateRandomString(20)
  };

  next();
};

module.exports = { checkSession };
