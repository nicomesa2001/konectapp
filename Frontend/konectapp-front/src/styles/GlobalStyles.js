import { createGlobalStyle } from 'styled-components'

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    color: #333;
    background-color: #f4f4f4;
  }

  a {
    color: #1a73e8;
    text-decoration: none;
  }

  button {
    cursor: pointer;
    background-color: #1a73e8;
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: 4px;
    font-size: 16px;
    transition: background-color 0.3s ease;

    &:hover {
      background-color: #1557b0;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }

  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
  }
`

export default GlobalStyles