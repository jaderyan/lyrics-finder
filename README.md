# Song Lyric Search

A small react app which finds songs from a artist (using the [MusicBrainz api](https://musicbrainz.org/doc/Development/XML_Web_Service/Version_2) and then looks up their lyrics using [lyrics.ovh api](https://lyricsovh.docs.apiary.io/).

## Requirements

You will need Node.js and npm to run this project. Instructions for installation can be found [here](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm).

## Setup

Install dependencies for the project running

```bash
$ npm install
```

Once dependencies are installed you can run the following commands.

```bash
$ npm run start
```

Runs the app in the development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.

You will also see any lint errors in the console.

```bash
$ npm build
```

Builds the app for production to the `build` folder.

This is for deployment.

## Browser support

The app is supported across all modern browsers. It is not supported on IE11 downwards.

## Improvements

Given more time I would have liked to fully test my solution.

I would have also implemented pagination (at the moment search results are limited to the first 100).

Adding routing to the app so lyrics show on a different page rather than a modal.
