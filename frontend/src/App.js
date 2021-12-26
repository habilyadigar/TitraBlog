import './App.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import PostsList from './components/PostsList';
import PostDetails from './pages/PostDetailsPage';
import Header from './components/Header';
import Home from './pages/HomePage';
import { Register } from './pages/RegisterPage';
import { Login } from './pages/LoginPage';

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
          <Route exact path="/register" component={Register} />
          <Redirect to="/" />
        </Switch>
      </Router>
    </>
  );
}

export default App;
