const express = require("express");

// models import
const { Room } = require("../models/room.js");
const { checkSession } = require("../middlewares/authentication.js");
const { generateRandomString, fetchPlaylistSongs } = require("../helper/fetchApi.js");

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
    const code = req.body.code;

    const room = await Room.findOne({ code });

    if (!room) return res.status(404).json({ status: "error", error: "room not found" });

    if (room.user_session_id == "$") {
      const playlist = await fetchPlaylistSongs(room.tokens.access_token, "37i9dQZEVXbMDoHDwVN2tF");
      await Room.updateOne({ code }, { user_session_id, playlist, options: playlist.slice(0, 2) });
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

module.exports = router;
