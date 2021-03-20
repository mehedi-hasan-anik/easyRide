import logo from './logo.svg';
import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import Header from './Components/Header/Header';
import Home from './Components/Home/Home';
import Login from './Components/Login/Login';
import NotFound from './Components/NotFound/NotFound';
import Destination from './Components/Destination/Destination';
import PrivateRoute from './Components/PrivateRoute/PrivateRoute';
export const userContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState({});
  const  [user,setUser] = useState({
      isSignedIn:false,
      name:'',
      email:'',
      password:'',
      photo:'',
    })
  return (
    <userContext.Provider value={[loggedInUser,setLoggedInUser,user,setUser]}>
     <Router>
         <Header></Header>
        <Switch>

              <Route path="/home">
                 <Home></Home>
              </Route>
              <Route path="/login">
                 <Login></Login>
              </Route>
              <PrivateRoute path="/destination/:idNumber">
                 <Destination></Destination>
              </PrivateRoute>
              <Route exact path="/">
                  <Home></Home>
               </Route>
               <Route path="*">
                   <NotFound></NotFound>
               </Route>
              
         </Switch>
     </Router>
    </userContext.Provider>
  );
}

export default App;
