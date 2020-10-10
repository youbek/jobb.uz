import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url("https://rsms.me/inter/inter.css");

*,
*::before,
*::after {
  box-sizing: border-box;
}

html {
  font-family: "Inter", sans-serif;
}

@supports (font-variation-settings: normal) {
  html {
    font-family: "Inter var", sans-serif;
  }
}

html {
  font-size: 16px;
  color: #333;
}

body {
  font-family: "Inter", sans-serif;
  margin: 0;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.5;
  color: #212529;
  text-align: left;
  background-color: #fff;
}

#root {
  position: relative;
  min-height: 100vh;
}

button {
  display: inline-block;
  border: none;
  cursor: pointer;
}

button:focus {
  outline: none;
}

a {
  text-decoration: none;
  background-color: transparent;
}

ol,
ul,
dl {
  margin-top: 0;
  margin-bottom: 1rem;
}

`;

export default GlobalStyle;
