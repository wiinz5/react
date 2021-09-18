import React,{Component} from 'react';
import {NavLink} from 'react-router-dom';
import {Navbar,Nav} from 'react-bootstrap';

export class NavAdmin extends Component{

    render(){
        return(
            <Navbar className="bg-primary">
                <Nav>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/class">
                        Class
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/student">
                        Student
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/subjects">
                        Subjects
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/point">
                        Point
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/list">
                        List
                    </NavLink>
                    <NavLink className="d-inline p-2 bg-primary text-white" to="/hubmin">
                        Manager User
                    </NavLink>
                </Nav>
            </Navbar>
        )
    }
}