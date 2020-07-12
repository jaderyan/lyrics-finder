import React, { FunctionComponent } from "react";
import styled, { keyframes } from "styled-components";

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
`;

const Spinner = styled.div`
  height: 48px;
  width: 48px;
  color: #86aac1;
  position: relative;
  display: inline-block;
  border: 5px solid;
  border-radius: 50%;
  border-top-color: transparent;
  animation: ${rotate} 1s linear infinite;
`;

const Container = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
`;

const Loading: FunctionComponent = () => (
  <Container>
    <Spinner />
  </Container>
);

export default Loading;
