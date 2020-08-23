import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  body, html {
    margin: 0;
    padding: 0;
    background-color: white;
  }

  * {
    font-family: 'Roboto', sans-serif;
    box-sizing: border-box;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Roboto Slab', serif;
    font-weight: 600;
  }
`;
