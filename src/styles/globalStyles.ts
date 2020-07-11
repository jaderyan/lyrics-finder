import { createGlobalStyle } from "styled-components";
import background from "../assets/memphis-colorful.png";

export const GlobalStyle = createGlobalStyle`
  body {
    background-image: url(${background});
    font-family: 'Open Sans', sans-serif;
  }
`;
