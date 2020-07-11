import React, { Fragment } from "react";

import Header from "./components/Header";
import Search from "./components/Search";
import { ArtistStore } from "./stores/store";
import Results from "./components/Results";
import { GlobalStyle } from "./styles/globalStyles";
import styled from "styled-components";
import { rem } from "polished";

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 100vh;
`;

const InnerContainer = styled.div`
  background-color: white;
  margin-top: ${rem("48px")};
  width: 40%;
  box-shadow: 0px 0px 1px 0px #000000;
  padding: ${rem("20px")};

  @media (max-width: 640px) {
    margin-top: ${rem("24px")};
    width: 80%;
  }
`;

export const StoreContext = React.createContext<ArtistStore | null>(null);
const store = new ArtistStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Container>
        <InnerContainer>
          <Header />
          <Search />
          <Results />
        </InnerContainer>
        <GlobalStyle />
      </Container>
    </StoreContext.Provider>
  );
}

export default App;
