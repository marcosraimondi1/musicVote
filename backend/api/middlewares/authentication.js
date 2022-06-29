const { generateRandomString } = require("../helper/fetchApi");

const checkSession = (req, res, next) => {
  let session = req.get("session");
  if (!session || !session.id) {
    // create new session
    req.session = {
      id: generateRandomString(16)
    };
  } else {
    // use session
    req.session = session;
  }

  next();
};

module.exports = { checkSession };
