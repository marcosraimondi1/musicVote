const express = require("express");
require("dotenv").config();

// models import
const { User } = require("../models/user.js");
const { Room } = require("../models/room.js");

const { generateRandomString, fetchAccessToken, fetchProfile } = require("../helper/fetchApi.js");

const client_id = process.env.SPOT_CLIENT_ID;
const redirect_uri = process.env.SPOT_REDIRECT_URI;
const base_url = process.env.BASE_URL;
const router = express.Router();

/**
 * 	Logs in to spotify - returns auth0 url which redirect to callback route
 */
router.get("/login-spotify", async (req, res) => {
  try {
    const state = generateRandomString(16);

    // data a la que quiero tener acceso
    const scope =
      "user-read-private user-read-email " +
      "playlist-read-collaborative playlist-read-private " +
      "user-read-playback-state user-modify-playback-state user-read-currently-playing";

    // parametros necesarios de la url (ver api docs)
    const params = new URLSearchParams({
      response_type: "code",
      client_id,
      scope,
      redirect_uri,
      state
    }).toString();

    const url = "https://accounts.spotify.com/authorize?" + params;

    const toSend = {
      status: "success",
      url
    };

    return res.json(toSend);
  } catch (error) {
    console.log(error);
    return res.json({ status: "error", error });
  }
});

/**
 * 	Afet logging in, callback route is hit to fetch tokens and profile
 */
router.get("/callback", async (req, res) => {
  try {
    // parametros que vienen del redireccionamiento (ver api docs)
    const { state, code, error } = req.query;

    if (!state) return res.status(404).json({ error: "not found" });

    if (error) return res.status(400).json({ status: "error", error });

    // fetch for access token
    const tokens = await fetchAccessToken(code);

    if (!tokens) return res.status(405).json({ error: "failed to get tokens" });

    // retrieve users profile
    const profile = await fetchProfile(tokens.access_token);

    const username = profile?.name;
    const email = profile?.id;
    const { access_token, refresh_token } = tokens;

    const room = await createUserRoom(email, access_token, refresh_token, username);

    if (username) {
      // redirect to web app
      let link = "http://localhost:3000/room?roomId=" + room.id;

      if (process.env.NODE_ENV === "production") link = base_url + "/room?roomId=" + room.id;

      return res.redirect(link);
    }
  } catch (error) {
    console.log("ERROR CALLBACK");
    console.log(error);
  }

  let link = "http://localhost:3000/";

  if (process.env.NODE_ENV === "production") link = base_url + "/";

  return res.redirect(link);
});

module.exports = router;

/**
 * F U N C T I O N S
 */

async function createUserRoom(email, access_token, refresh_token, username) {
  let user = await User.findOne({ email });

  if (user) {
    // if user exists update token and refresh token
    await User.update({ email }, { access_token, refresh_token });
  } else {
    // create new user
    user = {
      name: username,
      email: email,
      access_token,
      refresh_token
    };
    await User.create(user);
    user = await User.findOne({ email });
  }

  // create new room
  const room = {
    created: Date.now(),
    userId: user._id,
    id: generateRandomString(6)
  };
  await Room.create(room);

  // update user with new room
  await User.update({ email }, { roomId: room.id });
  return room;
}
