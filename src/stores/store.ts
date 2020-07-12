import { observable, action } from "mobx";
import axios from "axios";
import get from "lodash/get";

import { IRecording } from "../types/recording";

const MB_BASE_URL = "http://musicbrainz.org/ws/2";
const LYRICS_BASE_URL = "https://api.lyrics.ovh/v1";

export class ArtistStore {
  @observable search: string = "";
  @observable artistName: string = "";
  @observable recordings: IRecording[] = [];
  @observable lyrics: string = "";
  @observable loading: boolean = false;
  @observable error: string | null = null;

  @action
  onSearchChange = (text: string) => {
    this.search = text;
  };

  @action
  onSubmit = async () => {
    this.recordings = [];
    this.loading = true;
    this.error = null;

    try {
      const {
        data: { artists },
      } = await axios.get(
        `${MB_BASE_URL}/artist?query=${this.search}&fmt=json`
      );

      this.artistName = get(artists, "[0].name");
      const id = get(artists, "[0].id", "");

      const {
        data: { recordings },
      } = await axios.get(
        `${MB_BASE_URL}/recording?artist=${id}&offset=0&limit=100&fmt=json`
      );

      const filteredRecordings = this.removeDuplicates(recordings);

      await this.checkForLyrics(filteredRecordings);

      this.loading = false;
    } catch (error) {
      this.loading = false;
      this.error = "Unable to find artist please try again.";
    }
  };

  @action
  removeDuplicates = (recordings: IRecording[]) => {
    let filteredRecordings: IRecording[] = [];

    const songs = recordings.filter(
      (recording: IRecording) =>
        recording.video === false &&
        recording.disambiguation === "" &&
        !recording.title.includes("karaoke version") &&
        !recording.title.includes("(live)")
    );

    songs.map((recording: IRecording) => {
      if (
        filteredRecordings.find(
          (record) =>
            record.title.toLowerCase() === recording.title.toLowerCase()
        )
      ) {
        return;
      } else {
        filteredRecordings.push(recording);
      }
    });

    return filteredRecordings;
  };

  getLyrics = async (title: string) => {
    try {
      let {
        data: { lyrics },
      } = await axios.get(`${LYRICS_BASE_URL}/"${this.artistName}"/"${title}"`);
      return lyrics;
    } catch (error) {
      console.error(error);
    }
  };

  @action
  checkForLyrics = async (recordings: IRecording[]) => {
    const songsWithLyrics: any[] = [];

    for (const recording of recordings) {
      const lyrics = await this.getLyrics(recording.title);
      if (lyrics) {
        recording.lyrics = lyrics;
        songsWithLyrics.push(recording);
      }
    }

    this.recordings = songsWithLyrics;

    if (!songsWithLyrics.length) {
      this.error = "No songs available with lyrics";
    }
  };

  findLyrics = (title: string) => {
    const recording = this.recordings.find(
      (recording) => recording.title === title
    );

    return recording?.lyrics;
  };
}
