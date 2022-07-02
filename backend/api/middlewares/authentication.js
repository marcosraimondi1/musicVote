const { generateRandomString } = require("../helper/fetchApi.js");

const checkSession = (req, res, next) => {
  let session = req.get("session");
  if (!session) {
    session = { id: generateRandomString(20) };
  } else {
    try {
      session = JSON.parse(session);
      if (!session.id) {
        session = { id: generateRandomString(20) };
      }
    } catch (error) {
      // continue
      session = { id: generateRandomString(20) };
    }
  }

  req.session = session;
  next();
};

module.exports = { checkSession };
