const express = require("express");

// models import
const { Room } = require("../models/room.js");
const { checkSession } = require("../middlewares/authentication.js");
const {
  generateRandomString,
  fetchPlaylistSongs,
  fetchPlaylists
} = require("../helper/fetchApi.js");

const router = express.Router();

/**
 * Ruta para unirse a una sala
 */
router.get("/room", checkSession, async (req, res) => {
  try {
    const session = req.session;

    const room = await Room.findOne({ code: req.query.code });

    if (!room) {
      return res.status(400).json({ status: "error", error: "Room not found" });
    }

    return res.status(200).json({ status: "success", session });
  } catch (error) {
    console.log("Error joining room");
    console.log(error);
    return res.status(500).json({ status: "error", error: "Server error" });
  }
});

/**
 * Ruta para actualizar el host de la sala
 */
router.put("/room", checkSession, async (req, res) => {
  try {
    const user_session_id = req.session.id;
    const { code, playlistId, n_options } = req.body;

    if (n_options < 2 || n_options > 5)
      return res.status(400).json({ status: "error", error: "wrong number of options" });

    const room = await Room.findOne({ code });

    if (!room) return res.status(404).json({ status: "error", error: "room not found" });

    if (room.user_session_id == "$") {
      const playlist = await fetchPlaylistSongs(room.tokens.access_token, playlistId);
      await Room.updateOne(
        { code },
        { user_session_id, playlist, n_options, options: playlist.slice(0, n_options) }
      );
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
router.post("/room", async (req, res) => {
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

/**
 * 	For getting users playlists
 */

router.get("/getPlaylists", async (req, res) => {
  try {
    const room = await Room.findOne({ code: req.query.code });

    if (!room) {
      return res.status(400).json({ status: "error", error: "Room not found" });
    }

    const playlists = await fetchPlaylists(room.tokens.access_token);

    if (playlists) {
      return res.json({ status: "success", data: playlists.filter((e) => e.total > 5) });
    }
  } catch (error) {
    console.log("ERROR GETTING PLAYLISTS");
    console.log(error);
  }
  return res.json({ status: "error", error: "request failed" });
});

module.exports = router;
