import React, { FunctionComponent, useContext } from "react";
import { observer } from "mobx-react";
import { StoreContext } from "../App";
import styled from "styled-components";
import { rem } from "polished";

const Form = styled.form`
  text-align: center;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
  margin-bottom: ${rem("16px")};
`;

const Button = styled.button`
  background-color: #86aac1;
  border: none;
  padding: ${rem("8px")} ${rem("16px")};
  margin-left: ${rem("16px")};
  font-size: ${rem("16px")};
  border-radius: 3px;
  font-family: "Open Sans", sans-serif;
  cursor: pointer;

  @media (max-width: 570px) {
    margin-left: ${rem("8px")};
  }
`;

const Input = styled.input`
  padding: ${rem("8px")};
  font-family: "Open Sans", sans-serif;

  @media (min-width: 768px) {
    width: 40%;
  }
`;

const Search: FunctionComponent = () => {
  const store = useContext(StoreContext);

  return (
    <Form>
      <Label htmlFor="search">Search for artist by name.</Label>
      <Input
        type="text"
        id="search"
        name="search"
        placeholder="The Beatles"
        value={store?.search}
        onChange={(e) => store?.onSearchChange(e.target.value)}
      />
      <Button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          store?.onSubmit();
        }}
      >
        Search
      </Button>
    </Form>
  );
};

export default observer(Search);
