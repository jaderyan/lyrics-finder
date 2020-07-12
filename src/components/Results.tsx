import React, {
  FunctionComponent,
  useContext,
  useState,
  Fragment,
} from "react";
import { observer } from "mobx-react";
import Modal from "react-modal";
import { rem } from "polished";
import styled from "styled-components";
import { StoreContext } from "../App";
import SongButton from "./SongButtton";
import Loading from "./Loading";

const Container = styled.main`
  display: flex;
  flex-wrap: wrap;
  margin: ${rem("24px")} 0;
`;

const Lyrics = styled.p`
  white-space: pre-line;
`;

const Title = styled.h2`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: ${rem("32px")};
  margin-bottom: ${rem("16px")};

  @media (max-width: 640px) {
    font-size: ${rem("24px")};
  }
`;

const ButtonContainer = styled.header`
  display: flex;
  justify-content: flex-end;
  margin-bottom: ${rem("16px")};
`;

const CloseButton = styled.button`
  border: none;
  color: #1b1b1b;
  font-size: ${rem("20px")};
  background: none;
`;

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    height: "80%",
    "overflow-y": "auto",
  },
};

const Results: FunctionComponent = () => {
  const store = useContext(StoreContext);
  const [open, modalOpen] = useState(false);
  const [title, setTitle] = useState("");

  return (
    <Container>
      {store?.loading && <Loading />}
      {!!store?.recordings.length &&
        !store.loading &&
        store?.recordings.map((recording) => (
          <SongButton
            song={recording}
            openModal={() => {
              modalOpen(!open);
              setTitle(recording.title);
            }}
          />
        ))}

      {!!store?.error && <p>{store.error}</p>}

      <Modal
        isOpen={open}
        onRequestClose={() => {
          modalOpen(!open);
          setTitle("");
        }}
        contentLabel="Example Modal"
        style={customStyles}
      >
        <Fragment>
          <ButtonContainer
            onClick={() => {
              modalOpen(!open);
              setTitle("");
            }}
          >
            <CloseButton>X</CloseButton>
          </ButtonContainer>
          <main>
            <Title>{title}</Title>
            <Lyrics
              dangerouslySetInnerHTML={{
                __html: store?.findLyrics(title) as string,
              }}
            ></Lyrics>
          </main>
        </Fragment>
      </Modal>
    </Container>
  );
};

export default observer(Results);
