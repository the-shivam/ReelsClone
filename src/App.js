import './App.css';
import Signup from './component/Signup';
import AuthProvider from './context/AuthProvider';
import Signin from './component/Signin';
import Feed from './component/Feed'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import PrivateRoute from './component/PrivateRoute';

function App() {
  return (
    <Router>
      <AuthProvider>
        <Switch>
          <PrivateRoute exact path='/' component={Feed} />
          <Route path='/login' component={Signin} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </AuthProvider>
    </Router>
  );
}

export default App;
