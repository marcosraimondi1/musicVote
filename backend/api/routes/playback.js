const express = require("express");
require("dotenv").config();

// models import
const { Room } = require("../models/room.js");
const { checkSession } = require("../middlewares/authentication.js");
const { refreshTokens } = require("../helper/fetchApi.js");
const { getCurrentlyPlaying, addToQueue, skipNext } = require("../helper/playbackApi.js");

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

    const options = room.options;

    const data = {
      currently_playing,
      options
    };

    res.status(200).json({ status: "success", data, session });

    // revisar si hay que elegir un ganador (si faltan menos de 5 segundos)
    await checkNext(currently_playing, room, options);

    return;
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

    const room = await Room.findOne({ code });

    if (!room) return res.status(400).json({ status: "error", error: "Room not found" });

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
 * Revisa si hay que elegir la siguiente cancion,
 * en caso afirmativo, agrega la cancion con mas votos a la cola
 * y pasa a la siguiente cancion
 * @param {Object} currently_playing
 * @param {Object} room
 * @param {Array} options
 */
async function checkNext(currently_playing, room, options) {
  // si faltan menos de 5 segundos
  const time_left = currently_playing?.duration_ms - currently_playing?.progress_ms;
  if (!room.selected && time_left < 5000) {
    // add winner to queue, skip song and shuffle options
    const newOptions = shuffle(room.playlist).slice(0, 2);

    await Room.updateOne({ _id: room._id }, { options: newOptions, selected: true });

    const winner = options[0].votes > options[1].votes ? options[0] : options[1];
    const uri = "spotify:track:" + winner.id;

    await addToQueue(room.tokens.access_token, uri);
    await skipNext(room.tokens.access_token);
  
  } else if (room.selected && time_left > 6000) {
    await Room.updateOne({ _id: room._id }, { selected: false });
  }
}

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

function shuffle(array) {
  let currentIndex = array.length,
    randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
  }

  return array;
}

module.exports = router;
