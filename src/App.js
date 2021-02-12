import React from 'react'
import "./App.css";
import {Auth} from "./Components/Auth/index";
import {BrowserRouter, Switch, Route } from "react-router-dom";
import {Sign} from "./Components/Sign/index";
import {Main} from './Components/Main/index'


function App() {

  return (

    <BrowserRouter>

    <div className="container pt-5 d-flex justify-content-center">
      <Switch>
      <Route path="/" exact component={Auth}/>
      <Route path="/sign" component={Sign}/>
      <Route path="/main" component={Main}/>

      </Switch>
    </div>
    </BrowserRouter>

  );
}

export default App;
