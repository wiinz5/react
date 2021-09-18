import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditHubminModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'hubmin',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Username:event.target.Username.value,
                Password:event.target.Password.value,
                Status:event.target.Status.value
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
        },
        (error)=>{
            alert('Failed');
        })
    }

    render(){
        return (
            <div className="container">

<Modal
{...this.props}
size="lg"
aria-labelledby="contained-modal-title-vcenter"
centered
>
    <Modal.Header clooseButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Edit User
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

    <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="Username">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control type="text" name="Username" required disabled
                        defaultValue={this.props.hubuser} 
                        placeholder="User Name"/>
                    </Form.Group>

                    <Form.Group controlId="Password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" name="Password" required 
                        defaultValue={this.props.hubpass}
                        placeholder="Password"/>
                    </Form.Group>

                    <Form.Group controlId="Status">
                        <Form.Label>Authorities</Form.Label>
                        <Form.Control type="text" name="Status" required 
                        defaultValue={this.props.status}
                        placeholder="Authorities"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                            Update User
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Modal.Body>
    
    <Modal.Footer>
        <Button variant="danger" onClick={this.props.onHide}>Close</Button>
    </Modal.Footer>

</Modal>

            </div>
        )
    }

}