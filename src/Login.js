import React,{Component} from 'react';
import {Button, Row, Col, Form} from 'react-bootstrap';
export class Login extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }
        handleSubmit(event){
            event.preventDefault();
            fetch(process.env.REACT_APP_API+'login',{
                method:'POST',
                headers:{
                    'Accept':'application/json',
                    'Content-Type':'application/json'
                },
                body:JSON.stringify({
                    Username:event.target.Username.value,
                    Password:event.target.Password.value,
                })
            })
            .then(res=>res.json())
            .then((result)=>{
                if(result>0){
                    if(result===2){
                        this.props.history.push('/user')
                    }
                    if(result===1){
                        this.props.history.push('/admin')
                    }
                }
                else{
                    alert("Incorrect account information! Please re-enter ")
                }
            },
            )
        }
        render(){
        return(
            <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Username">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="text" name="ClassId" required
                        placeholder="Username"/>
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="ClassName" required 
                        placeholder="Password"/>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
        )
    }
}