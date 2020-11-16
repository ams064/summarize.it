import './App.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';

import { AppProvider } from './context/Provider';
import LoginComponent from './containers/Login';
import SignupComponent from './containers/Signup';
import SummarizeComponent from './containers/Summarize';
import DashboardComponent from './containers/Dashboard';
import ForgotPasswordComponent from './containers/ForgotPassword';

import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

function DecisionRoute ({ component : Component, skipIfAuthorized : skip ,...rest}) {
  if(skip) {
    return (
      <Route
        {...rest}
        render={(props) => localStorage.getItem('isAuth') === 'false' ?
          <Component {...props} />
          : <Redirect to= {{pathname : '/', state : {from : props.location}}} />
        }
        />
    )
  }
  return (
    <Route
      {...rest}
      render={(props) => localStorage.getItem('isAuth') === 'true' ?
        <Component {...props} />
        : <Redirect to= {{pathname : '/login', state : {from : props.location}}} />
      }
      />
  )
}

function App() {
  return (
    <AppProvider>
      <Router>
        <Switch>
          <Route path= '/' exact component = {SummarizeComponent} />
          <DecisionRoute path= '/login' skipIfAuthorized = {true} exact component = {LoginComponent} />
          <DecisionRoute path= '/signup' exact skipIfAuthorized = {true} component = {SignupComponent} />
          <DecisionRoute path= '/forgotpassword' exact skipIfAuthorized = {true} component = {ForgotPasswordComponent} />
          <DecisionRoute path='/dashboard' exact component = {DashboardComponent} />
        </Switch>
      </Router>
    </AppProvider>
  );
}

export default App;
