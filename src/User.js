import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import React,{Component} from 'react';

import { Point } from './Point';
import { List } from './List';
import { NavUser } from './NavUser';


export class User extends Component{
    render(){
        return (
        <BrowserRouter>
        <div className="container">

        <NavUser/>

        <Switch>
        <Route path='/point' component={Point}/>
        <Route path='/list' component={List}/>
        </Switch>
        </div>
        </BrowserRouter>
    );
    }
}

export default User;