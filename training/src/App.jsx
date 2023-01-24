import React from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect,} from 'react-router-dom';
import { SnackBarProvider } from './contexts';
import {Login, InputDemo, ChildrenDemo, Trainee, TextFieldDemo,NoMatch,} from './pages';
import { AuthRoute, PrivateRoute } from './routes/index';
import Apolloclient from './lib/apollo-client';
import { ApolloProvider } from '@apollo/react-components';

class App extends React.Component {
  render() {
    return (
      <div>
      <SnackBarProvider>
      <ApolloProvider client={Apolloclient}>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Redirect to="/trainee" />
          </Route>
          <AuthRoute path="/login" component={Login} />
          <PrivateRoute path="/text-field" component={TextFieldDemo} />
          <PrivateRoute path="/childrenDemo" component={ChildrenDemo} />
          <PrivateRoute path="/inputDemo" component={InputDemo} />
          <PrivateRoute path="/trainee" component={Trainee} />
          <PrivateRoute component={NoMatch} />
        </Switch>
      </Router>
      </ApolloProvider>
      </SnackBarProvider>
      </div>
    );
  }
}

export default App;