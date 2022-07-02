<div id="top"></div>
<!--
*** Thanks for checking out the Best-README-Template. If you have a suggestion
*** that would make this better, please fork the repo and create a pull request
*** or simply open an issue with the tag "enhancement".
*** Don't forget to give the project a star!
*** Thanks again! Now go create something AMAZING! :D
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->

[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]
![Deployment Pipeline](https://github.com/marcosraimondi1/musicVote/actions/workflows/pipeline.yml/badge.svg)

<!-- PROJECT LOGO -->
<br />
<div align="center">
  <a href="http://multiapp.my.to:30/">
    <img src="frontend/assets/favicon.ico" alt="Logo" width="200" height="200">
  </a>

<h3 align="center">Let's DJ</h3>

  <p align="center">
    Let's DJ is a small web application intended to handle music played at parties or meetings with friends. With this application everyone will be happy with the music being played since it allows users to vote for the next song.
    <br />
    <a href="https://github.com/marcosraimondi1/musicVote"><strong>Explore the docs »</strong></a>
    <br />
    <br />
    <a href="http://multiapp.my.to:30/">View Demo</a>
    ·
    <a href="https://github.com/marcosraimondi1/musicVote/issues">Report Bug</a>
    ·
    <a href="https://github.com/marcosraimondi1/musicVote/issues">Request Feature</a>
  </p>
</div>

<!-- TABLE OF CONTENTS -->
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#question-about-the-project">About The Project</a>
      <ul>
        <li><a href="#-built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#checkered_flag-getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites-triangular_flag_on_post">Prerequisites</a></li>
        <li><a href="#installation-wrench">Installation</a></li>
      </ul>
    </li>
    <li><a href="#fire-usage">Usage</a></li>
    <li><a href="#blue_car-roadmap">Roadmap</a></li>
    <li><a href="#two_men_holding_hands-contributing">Contributing</a></li>
    <li><a href="#page_facing_up-license">License</a></li>
    <li><a href="#phone-contact">Contact</a></li>
    <li><a href="#sparkles-acknowledgments">Acknowledgments</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## :question: About The Project

This project was developed as a hobby, it's intended to provide a fun way for people to choose
songs at house parties. It's specially dedicated to those people who always complain about the music.
[![Product Name Screen Shot][product-screenshot]](http://multiapp.my.to:30/)

<p align="right">(<a href="#top">back to top</a>)</p>

### ⚙ Built With

- [React.js](https://reactjs.org/)
- [Node.js](https://nodejs.org)
- [MongoDB](https://www.mongodb.com)
- [SpotifyAPI](https://developer.spotify.com)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- GETTING STARTED -->

## :checkered_flag: Getting Started

To get a local copy up and running follow these simple example steps.

### Prerequisites :triangular_flag_on_post:

- Spotify Premium: not needed to set up the project but to create new rooms when using the app. For joining rooms you don't need a sotify account.

- Spotify Developer Account: register for free and get a client id and client secret

- Mongo DB Atlas account: register for free and get a free online database

- npm

  ```sh
  npm install npm@latest -g
  ```

- vite

### Installation :wrench:

1. Get a free Spotify API Key at [https://developer.spotify.com](https://developer.spotify.com)
2. Start a new database at mongo atlas db [https://cloud.mongodb.com/](https://cloud.mongodb.com/)
3. Clone the repo
   ```sh
   git clone https://github.com/marcosraimondi1/musicVote.git
   ```
4. Install NPM packages
   ```sh
   npm install
   ```
5. Set up .env files in frontend and backend directories:

##### BACKEND

###### A P I

NODE_ENV=
PORT=
BASE_URL=http://localhost:port/

###### spotify

SPOT_CLIENT_ID=
SPOT_CLIENT_SECRET=
SPOT_REDIRECT_URI=http://localhost:port/api/callback # for localhost

###### mongo

MONGO_USER=
MONGO_PASS=
MONGO_DATABASE=

##### FRONTEND

VITE_API_BASE_URL=http://localhost:port/api

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- USAGE EXAMPLES -->

## :fire: Usage

The app is very simple:

- Landing Page: you are presented with 2 options, you can either join a room or create a new one. To join a room you will need the room code.
  [![Product Name Screen Shot][product-screenshot2]](http://multiapp.my.to:30/)
- Creating a Room: to create a new room you are first prompted to sign in to your premium spotify account. After that you have to choose a playlist from which the options are taken. You can also decide how many options can the guests have.
  [![Product Name Screen Shot][product-screenshot3]](http://multiapp.my.to:30/)
- Room Page: You can see what's currently playing on the hosts device and the options to vote for. You can only vote once per song. After the currently playing song has ended the song with most amount of votes will be played next. After creating the room, share the room code with your guests so they can join too!
  [![Product Name Screen Shot][product-screenshot]](http://multiapp.my.to:30/)
  _For more examples, please refer to the [Documentation](https://github.com/marcosraimondi1/musicVote)_

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ROADMAP -->

<!-- ## :blue_car: Roadmap

- [ ] Feature 1
- [ ] Feature 2
- [ ] Feature 3
  - [ ] Nested Feature

See the [open issues](https://github.com/marcosraimondi1/musicVote/issues) for a full list of proposed features (and known issues).

<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- CONTRIBUTING -->

## :two_men_holding_hands: Contributing

Contributions are what make the open source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

If you have a suggestion that would make this better, please fork the repo and create a pull request. You can also simply open an issue with the tag "enhancement".
Don't forget to give the project a star! Thanks again!

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- LICENSE -->

## :page_facing_up: License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## :phone: Contact

Project Link: [https://github.com/marcosraimondi1/musicVote](https://github.com/marcosraimondi1/musicVote)

<p align="right">(<a href="#top">back to top</a>)</p>

<!-- ACKNOWLEDGMENTS -->

<!-- ## :sparkles: Acknowledgments

- []()
- []()
- [Choose an Open Source License](https://choosealicense.com)
- [GitHub Emoji Cheat Sheet](https://www.webpagefx.com/tools/emoji-cheat-sheet)
- [Malven's Flexbox Cheatsheet](https://flexbox.malven.co/)
- [Malven's Grid Cheatsheet](https://grid.malven.co/)
- [Img Shields](https://shields.io)

<p align="right">(<a href="#top">back to top</a>)</p> -->

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[contributors-shield]: https://img.shields.io/github/contributors/marcosraimondi1/musicVote.svg?style=for-the-badge
[contributors-url]: https://github.com/marcosraimondi1/musicVote/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/marcosraimondi1/musicVote.svg?style=for-the-badge
[forks-url]: https://github.com/marcosraimondi1/musicVote/network/members
[stars-shield]: https://img.shields.io/github/stars/marcosraimondi1/musicVote.svg?style=for-the-badge
[stars-url]: https://github.com/marcosraimondi1/musicVote/stargazers
[issues-shield]: https://img.shields.io/github/issues/marcosraimondi1/musicVote.svg?style=for-the-badge
[issues-url]: https://github.com/marcosraimondi1/musicVote/issues
[license-shield]: https://img.shields.io/github/license/marcosraimondi1/musicVote.svg?style=for-the-badge
[license-url]: https://github.com/marcosraimondi1/musicVote/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/marcos-raimondi
[product-screenshot]: images/room.jpg
[product-screenshot2]: images/landing.jpg
[product-screenshot3]: images/config.jpg
