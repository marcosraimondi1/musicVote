const express = require("express");
const fetch = require("node-fetch");
require("dotenv").config();

const { generateRandomString, fetchAccessToken } = require("../helper/fetchApi.js");

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

    const room = await createRoom(tokens);

    if (!room) return res.status(506).json({ error: "failed to create room" });

    // redirect to web app
    let link = "http://localhost:3000/create?code=" + room.code;

    if (process.env.NODE_ENV === "production") link = base_url + "/create?code=" + room.code;

    return res.redirect(link);
  } catch (error) {
    console.log("ERROR CALLBACK");
    console.log(error);

    let link = "http://localhost:3000/";
    if (process.env.NODE_ENV === "production") link = base_url + "/";
    return res.redirect(link);
  }
});

module.exports = router;

/**
 * Create Room
 * @param {Object} tokens
 * @returns {Object} room
 */
async function createRoom(tokens) {
  const url = base_url + "api/create";
  console.log(url);
  const body = {
    tokens
  };

  const response = await fetch(url, {
    method: "post",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" }
  });

  const data = await response.json();

  console.log(data);

  if (data.status == "success") {
    return data.data;
  }

  return null;
}
