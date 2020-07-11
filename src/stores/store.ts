import { observable, action } from "mobx";
import axios from "axios";
import get from "lodash/get";
import { IRecording } from "../types/recording";

const BASE_URL = "http://musicbrainz.org/ws/2";

export class ArtistStore {
  @observable search: string = "";
  @observable artistName: string = "";
  @observable recordings: IRecording[] = [];

  @action
  onSearchChange = (text: string) => {
    this.search = text;
  };

  @action
  onSubmit = async () => {
    const {
      data: { artists },
    } = await axios.get(`${BASE_URL}/artist?query=${this.search}&fmt=json`);

    this.artistName = get(artists, "[0].name");
    const id = get(artists, "[0].id", "");

    const {
      data: { recordings },
    } = await axios.get(
      `${BASE_URL}/recording?artist=${id}&offset=0&limit=100&fmt=json`
    );

    this.removeDuplicates(recordings);
  };

  @action
  removeDuplicates = (recordings: IRecording[]) => {
    const songs = recordings.filter(
      (recording: IRecording) =>
        recording.video === false &&
        recording.disambiguation === "" &&
        !recording.title.includes("karaoke version") &&
        !recording.title.includes("(live)")
    );

    songs.map((recording: IRecording) => {
      if (
        this.recordings.find(
          (record) =>
            record.title.toLowerCase() === recording.title.toLowerCase()
        )
      ) {
        return;
      } else {
        this.recordings.push(recording);
      }
    });
  };
}
