import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Statistics from "./pages/Statistics/Statistics";
import Salas from './pages/Salas/Salas'
import CreateUser from './pages/CreateUser/CreateUser';
import 'bootstrap/dist/css/bootstrap.css'
import {initInterceptor} from "./services/Session/Auth"

initInterceptor();

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/createuser" component={CreateUser} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/salas" component={Salas} />
        <Route exact path="/home/:id/:equipo" component={Home} />
        <Route exact path="/statistics" component={Statistics}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
