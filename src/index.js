import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./pages/Login/Login";
import NotFound from "./pages/NotFound";
import Home from "./pages/Home/Home";
import Statistics from "./pages/Statistics/Statistics";
import Salas from './pages/Salas/Salas'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/home" component={Salas} />
        <Route exact path="/Sala" component={Home} />
        <Route exact path="/statistics" component={Statistics}/>
        <Route component={NotFound} />
      </Switch>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);
