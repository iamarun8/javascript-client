import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import Trainee from './pages/Trainee/Trainee';
import { Navbar } from './pages/components/Navbar'
import { Login } from './pages/Login'

import theme from './theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Navbar />
      <Trainee />
      <Login />
    </ThemeProvider>
  );
}

export default App;
