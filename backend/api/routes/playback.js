const express = require("express");
require("dotenv").config();

// models import
const { Room } = require("../models/room.js");
const { checkSession } = require("../middlewares/authentication.js");
const { refreshTokens } = require("../helper/fetchApi.js");
const { getCurrentlyPlaying } = require("../helper/playbackApi.js");

const router = express.Router();

/**
 * Ruta para obtener lo que esta sonando
 */
router.get("/playback", checkSession, async (req, res) => {
  try {
    const session = req.session;

    const room = await Room.findOne({ code: req.query.code });

    if (!room) {
      return res.status(400).json({ status: "error", error: "Room not found" });
    }

    await check_tokens(room);

    const currently_playing = await getCurrentlyPlaying(room.tokens.access_token);

    const options = room.options.slice(0, 2);

    const data = {
      currently_playing,
      options
    };

    return res.status(200).json({ status: "success", data, session });
  } catch (error) {
    console.log("Error joining room");
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

/**
 * Ruta para votar
 */
router.put("/playback", checkSession, async (req, res) => {
  try {
    const session = req.session;
    
    const { code, option } = req.body;
    console.log("VOTANDO");
    console.log(code, option);
    const room = await Room.findOne({ code });

    if (!room) {
      return res.status(400).json({ status: "error", error: "Room not found" });
    }

    let newOptions = room.options;

    try {
      newOptions[option].votes += 1;
    } catch (_) {}

    await Room.updateOne({ _id: room._id }, { options: newOptions });

    return res.status(200).json({ status: "success", session });
  } catch (error) {
    console.log("Error joining room");
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

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
async function check_tokens(room) {
  if (room) {
    if (is_token_expired(room.tokens.expires_in)) {
      // si expiro actualizamos los tokens
      const tokens = await refreshTokens(room.tokens.refresh_token);
      await Room.updateOne({ _id: room._id }, { tokens });
    }
  }
}

module.exports = router;
