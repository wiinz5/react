import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class NavUser extends Component{

    render(){
        return(
            <Navbar className="bg-primary">
                <Nav>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/point">
                        Point
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/list">
                        List
                    </NavLink>
                </Nav>
            </Navbar>
        )
    }
}