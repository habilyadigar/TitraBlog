import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PostsList from './components/PostsList';
import PostDetails from './pages/PostDetails';
import Header from './components/Header';
import Home from './pages/Home';
import { Login } from './pages/Login';

function App() {
  return (
    <>
      <ToastContainer autoClose={3000} />
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/posts" component={PostsList} />
          <Route exact path="/posts/:id" component={PostDetails} />
          <Route exact path="/login" component={Login} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
