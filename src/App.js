import logo from './assets/images/logo.svg';
import './App.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import routes from './routes';
import 'semantic-ui-css/semantic.min.css';
import { AppProvider } from './context/Provider';

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          { routes.map((route, routeIndex) => (
            <Route
              key={ routeIndex }
              path = { route.pathname } 
              exact
              render={(props) => <route.component {...props} />}
            ></Route>
          ))}
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
