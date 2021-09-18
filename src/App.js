import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom';

import {Home} from './Home';
import {Class} from './Class';
import {Student} from './Student';
import {Navigation} from './Navigation';
import { Subjects } from './Subjects';
import { Point } from './Point';
import { Login } from './Login';
import { User } from './User';
import { List } from './List';
import Admin from './Admin';
import { Hubmin } from './Hubmin';


function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
     Student Management 
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/class' component={Class}/>
       <Route path='/student' component={Student}/>
       <Route path='/subjects' component={Subjects}/>
       <Route path='/point' component={Point}/>
       <Route path='/list' component={List}/>
       <Route path ='/login' component={Login}/>
       <Route path ='/user' component={User}/>
       <Route path ='/admin' component={Admin}/>
       <Route path ='/hubmin' component={Hubmin}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
