import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import { BrowserRouter as Router, Route } from 'react-router-dom';

const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary1Color: '#353a5d',
    primary2Color: '#3194c2',
    textColor: '#48475c',
    alternateTextColor: 'rgba(255, 255, 255, 0.87)',
    canvasColor: '#fbfdff',
  },
});

const someComponent = () => (<div>COMPONENT</div>);

const jsx = (
  <MuiThemeProvider theme={muiTheme}>
    <Router>
      <Route path="/" component={ someComponent } />
    </Router>
  </MuiThemeProvider>
);
let hasRendered = false;
const renderApp = () => {
  if (!hasRendered) {
    ReactDOM.render(jsx, document.getElementById('app'));
    hasRendered = true;
  }
};

ReactDOM.render(<div>LOADIN</div>, document.getElementById('app'));
renderApp();
