import React, { FunctionComponent, useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../App";

const Search: FunctionComponent = () => {
  const store = useContext(StoreContext);

  return (
    <form>
      <label htmlFor="search">Artist name:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={store?.search}
        onChange={(e) => store?.onSearchChange(e.target.value)}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          store?.onSubmit();
        }}
      >
        Search
      </button>
    </form>
  );
};

export default observer(Search);
