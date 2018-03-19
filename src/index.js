import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'semantic-ui-css/semantic.min.css'
import { ThemeProvider } from 'styled-components'

const theme = {
  fg: '#004e92',
  bg: '#000428',
  nav: 'white',
}

ReactDOM.render(
  <ThemeProvider theme={ theme }>
    <App />
  </ThemeProvider>, document.getElementById( 'root' ) );
registerServiceWorker();
