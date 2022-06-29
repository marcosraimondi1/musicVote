const express = require("express");
require("dotenv").config();

// models import
const { Room } = require("../models/room.js");
const { checkSession } = require("../middlewares/authentication.js");
const { refreshTokens, generateRandomString } = require("../helper/fetchApi.js");

const router = express.Router();

/**
 * Ruta para unirse a una sala
 */
router.get("/join", checkSession, async (req, res) => {
  try {
    const session = req.session;

    const room = await Room.findOne({ id: req.query.roomId });

    if (!room) {
      return res.status(400).json({ status: "error", error: "Room not found" });
    }

    return res.status(200).json({ status: "success", data: room, session });
  } catch (error) {
    console.log("Error joining room");
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

/**
 * Ruta para actualizar el host de la sala
 */
router.put("/hostid", checkSession, async (req, res) => {
  try {
    const user_session_id = req.session.id;
    const code = req.body.code;
    const room = await Room.findOne({ code });

    if (room.user_session_id == "$") {
      await Room.updateOne({ code }, { user_session_id });
    }

    return res.status(200).json({ status: "success", session: req.session });
  } catch (error) {
    console.log("Error updating room host id");
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

/**
 * Ruta para crear una sala
 */
router.post("/create", async (req, res) => {
  try {
    const tokens = req.body.tokens;

    const room = {
      created: Date.now(),
      user_session_id: "$",
      code: generateRandomString(6),
      options: [],
      tokens
    };

    await Room.create(room);

    return res.status(200).json({ status: "success", data: room });
  } catch (error) {
    console.log("error creating room");
    console.log(error);
    return res.status(500).json({ status: "error" });
  }
});

module.exports = router;

/**
 * F U N C T I O N S
 */

/**
 * Revisa si expiro el token
 * @param {number} expires_in
 * @returns bool
 */
function is_token_expired(expires_in) {
  if (expires_in <= Date.now()) {
    // expiro el token
    return true;
  }
  return false;
}

/**
 * Revisa la validez de los tokens, y los actualiza
 * @param {string} userId
 */
async function check_tokens(userId) {
  const user = await User.findOne({ _id: userId });
  if (user) {
    if (is_token_expired(user.expires_in)) {
      // si expiro actualizamos los tokens
      const tokens = await refreshTokens(user.refresh_token);
      const { access_token, refresh_token } = tokens;
      const expires_in = Date.now() + tokens.expires_in * 1000;
      await User.update({ _id: userId }, { access_token, refresh_token, expires_in });
    }
  }
}
