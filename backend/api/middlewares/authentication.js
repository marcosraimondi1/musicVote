const { generateRandomString } = require("../helper/fetchApi.js");

const checkSession = (req, res, next) => {
  let session = req.get("session");
  if (!session || !session.id) {
    // create new session
    req.session = {
      id: generateRandomString(20)
    };
  } else {
    // use session
    req.session = session;
  }

  next();
};

module.exports = { checkSession };
