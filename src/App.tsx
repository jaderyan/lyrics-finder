import React, { Fragment } from "react";
import Header from "./components/Header";
import Search from "./components/Search";
import { ArtistStore } from "./stores/store";
import Results from "./components/Results";

export const StoreContext = React.createContext<ArtistStore | null>(null);
const store = new ArtistStore();

function App() {
  return (
    <StoreContext.Provider value={store}>
      <Fragment>
        <Header />
        <Search />
        <Results />
      </Fragment>
    </StoreContext.Provider>
  );
}

export default App;
