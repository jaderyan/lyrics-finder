import React, { FunctionComponent, useContext } from "react";
import { StoreContext } from "../App";
import { observer } from "mobx-react";

const Results: FunctionComponent = () => {
  const store = useContext(StoreContext);
  return (
    <main>
      {store?.recordings.map((recording) => (
        <p>
          <a
            href={`https://api.lyrics.ovh/v1/${store.artistName}/${recording.title}`}
            target="_blank"
          >
            {recording.title}
          </a>
        </p>
      ))}
    </main>
  );
};

export default observer(Results);
