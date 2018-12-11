import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { getMuiTheme } from 'material-ui/styles';
import { darkBlack } from 'material-ui/styles/colors';
 
const muiTheme = getMuiTheme({
    palette: {
        primary1Color: '#26d826',
        alternateTextColor: 'black',
    }
})
ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
<App />
</MuiThemeProvider>
, document.getElementById('root'));
registerServiceWorker();
