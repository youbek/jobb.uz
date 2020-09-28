import { globalStyle, createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@import url('https://rsms.me/inter/inter.css');

*,
  *::before,
  *::after {
    box-sizing: border-box;
  }
  
  html {
    font-family: 'Inter', sans-serif;
    line-height: 1.15;
  }

  input {
      margin: 0;
      font-family: inherit;
  }
`;

export default GlobalStyle;
