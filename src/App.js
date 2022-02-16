
import { BrowserRouter as Router, Route, Redirect ,Switch } from "react-router-dom"
import Login from "./components/front/auth/Login";
import Regis from "./components/front/auth/Regis";
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle.js";
import Adminprivate from './routes/Adminprivate'
import axios from 'axios'
import Page403 from "./error/Page403";
import Page404 from "./error/Page404";
import './App.css'


import GlobalpublicRoute from "./GlobalpublicRoute";

// axios.defaults.baseURL = "http://localhost:8000/"
axios.defaults.baseURL = "https://backstoraja.herokuapp.com/"
axios.defaults.headers.post['Accept']= 'application/json'
axios.defaults.headers.post['Content-Type']= 'application/json'
axios.defaults.withCredentials = true;

axios.defaults.withCredentials = true;
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('auth_token');
  config.headers.Authorization = token? `Bearer ${token}` : ``;
  return config;
})

function App() { 
  return (
    <div className="App">
      <Router>
        <Switch>
          {/* <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/contact" component={Contact} /> */}

          <Adminprivate path="/admin" name="Admin" />
          <GlobalpublicRoute path="/" name="Home"  />

          <Route path="/403" component={Page403} />
          <Route path="/404" component={Page404} />
          <Route component={Page404} />


          {/* <Route  path="/login" component={Login} />
          <Route  path="/register" component={Regis} /> */}
          <Route  path="/login">
            {localStorage.getItem('auth_token') ? <Redirect to="/"/> : <Login /> }

          </Route>
          <Route  path="/register">
            {localStorage.getItem('auth_token') ? <Redirect to="/"/> : <Regis /> }
          </Route>
          {/* <Route path="/admin" name="Admin" render={(props) => <Masterlayout {...props} />} /> */}
         
         
        </Switch>
      </Router>
    </div>
  );
}

export default App;
