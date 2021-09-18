import {BrowserRouter, Route, Switch} from 'react-router-dom';
import logo from './logo.svg';

import './App.css';
import {Class} from './Class';
import {Student} from './Student';
import { Subjects } from './Subjects';
import { Point } from './Point';
import React,{Component} from 'react';
import { List } from './List';
import { NavAdmin } from './NavAdmin';
import { Hubmin } from './Hubmin';

export class Admin extends Component{
    render(){
        return (
            <BrowserRouter>
            <div className="container">

            <NavAdmin/>

            <Switch>
            <Route path='/class' component={Class}/>
            <Route path='/student' component={Student}/>
            <Route path='/subjects' component={Subjects}/>
            <Route path='/point' component={Point}/>
            <Route path='/list' component={List}/>
            <Route path='/hubmin' component={Hubmin}/>
            </Switch>
        </div>
        <div className="App">
                <header className="App-header">
                        <img src={logo} className="App-logo" alt="logo" />
                        <a
                        className="App-link"
                        href="https://reactjs.org"
                        target="_blank"
                        rel="noopener noreferrer"
                        >
                        Learn React
                        </a>
                    </header>
                </div>
        </BrowserRouter>
    );
    }
}

export default Admin;
