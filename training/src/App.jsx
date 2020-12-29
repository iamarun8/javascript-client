import React, { Component } from 'react';
import { ChildrenDemo } from './pages/ChildrenDemo';
import { ThemeProvider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography';

import theme from './theme'

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={theme}>
        <Typography><ChildrenDemo /></Typography>
      </ThemeProvider>
    );
  }
}

export default App;