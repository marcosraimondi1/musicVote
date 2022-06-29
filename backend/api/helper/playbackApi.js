/**
 * 	Get Playback State
 * 	@param {string} access_token - spotify access token
 * 	@returns {Promise<object>} - playback state
 */
async function getPlaybackState(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/player", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (response.status === 200) {
      const playbackState = await response.json();
      return playbackState;
    }
    console.log("STATUS: ", response.status);
    return null;
  } catch (error) {
    console.log("---------------- Error getting playback state ---------------");
    console.log(error);
    return null;
  }
}

/**
 * 	Get Currently Playing
 * 	@param {string} access_token - spotify access token
 * 	@returns {Promise<object>} - currently playing
 */
async function getCurrentlyPlaying(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/player/currently-playing", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (response.status === 200) {
      const currentlyPlaying = await response.json();
      return currentlyPlaying;
    }
    console.log("STATUS: ", response.status);
    return null;
  } catch (error) {
    console.log("---------------- Error getting currently playing ---------------");
    console.log(error);
    return null;
  }
}

/**
 * 	Get Recently Played
 * 	@param {string} access_token - spotify access token
 * 	@returns {Promise<object>} - recently played
 */
async function getRecentlyPlayed(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/player/recently-played", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (response.status === 200) {
      const RecentlyPlayed = await response.json();
      return RecentlyPlayed;
    }
    console.log("STATUS: ", response.status);
    return null;
  } catch (error) {
    console.log("---------------- Error getting recently played ---------------");
    console.log(error);
    return null;
  }
}

/**
 * 	Skips next song
 * 	@param {string} access_token - spotify access token
 */
async function skipNext(access_token) {
  const response = await fetch("https://api.spotify.com/v1/me/player/next", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (response.status === 204) {
      return;
    }
    console.log("STATUS: ", response.status);
    return;
  } catch (error) {
    console.log("---------------- Error skipping next ---------------");
    console.log(error);
    return;
  }
}

/**
 * 	Add to track to queue
 * 	@param {string} access_token - spotify access token
 *  @param {string} uri - The uri of the item to add to the queue. Must be a track or an episode uri.
 */
async function addToQueue(access_token, uri) {
  const response = await fetch("https://api.spotify.com/v1/me/player/queue?uri=" + uri, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + access_token
    }
  });
  try {
    if (response.status === 204) {
      return;
    }
    console.log("STATUS: ", response.status);
    return;
  } catch (error) {
    console.log("---------------- Error adding to queue ---------------");
    console.log(error);
    return;
  }
}

module.exports = {
  addToQueue,
  skipNext,
  getCurrentlyPlaying,
  getPlaybackState,
  getRecentlyPlayed
};
