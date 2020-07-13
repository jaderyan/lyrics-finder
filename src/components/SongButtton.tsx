import React, { FunctionComponent } from "react";
import { IRecording } from "../types/recording";
import styled from "styled-components";
import { rem } from "polished";

interface IProps {
  song: IRecording;
  openModal: () => void;
}

const Button = styled.button`
  color: #1b1b1b;
  font-size: ${rem("14px")};
  border: none;
  padding: ${rem("16px")};
  margin: ${rem("8px")};
  font-family: "Open Sans", sans-serif;
  cursor: pointer;

  &:nth-child(1n + 1) {
    background-color: #9b98c3;
  }

  &:nth-child(2n + 1) {
    background-color: #ed7f6e;
  }

  &:nth-child(3n + 1) {
    background-color: #a2c284;
  }
`;

const SongButton: FunctionComponent<IProps> = ({ song, openModal }) => (
  <Button onClick={openModal}>{song.title}</Button>
);

export default SongButton;
