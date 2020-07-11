import React, { FunctionComponent } from "react";
import styled from "styled-components";
import { rem } from "polished";

const Container = styled.header`
  text-align: center;
  margin-bottom: ${rem("24px")};
`;

const HeaderText = styled.h1`
  font-family: "Poppins", sans-serif;
  font-weight: bold;
  font-size: ${rem("40px")};

  @media (max-width: 640px) {
    font-size: ${rem("32px")};
  }
`;

const Header: FunctionComponent = () => (
  <Container>
    <HeaderText>Search for an artist</HeaderText>
  </Container>
);

export default Header;
