import React, { Component } from 'react'
import { Switch, Route } from 'react-router-dom';
import './App.css'
import Home from "./components/Home";
import Enter from "./components/Enter";
import Navigation from './components/Navigation';
import Search from './components/search/search';
import Login from './components/Login';

export default class componentName extends Component {
  render() {
    return (
    <React.Fragment >
     <Navigation/>
     
     <Switch>
                  
                  <Route path="/login" component={Login}/>
                  <Route path="/enter" component={Enter}/>
                  <Route path="/request" component={Home}/>
                  <Route path="/" component={Search}/>
      </Switch>
    
     
    </React.Fragment>
    )
  }
}
