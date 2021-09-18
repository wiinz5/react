import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditSubjectsModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'subjects',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SubjectsId:event.target.SubjectsId.value,
                SubjectsName:event.target.SubjectsName.value,
                TeacherName:event.target.TeacherName.value
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
            Edit Subjects
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="SubjectsId">
                        <Form.Label>Subjects ID</Form.Label>
                        <Form.Control type="text" name="SubjectsId" required disabled
                        defaultValue={this.props.subid} 
                        placeholder="Subjects Name"/>
                    </Form.Group>

                    <Form.Group controlId="SubjectsName">
                        <Form.Label>Subjects Name</Form.Label>
                        <Form.Control type="text" name="SubjectsName" required 
                        defaultValue={this.props.subname}
                        placeholder="Subjects Name"/>
                    </Form.Group>

                    <Form.Group controlId="TeacherName">
                        <Form.Label>Teacher Name</Form.Label>
                        <Form.Control type="text" name="TeacherName" required 
                        defaultValue={this.props.subteacher}
                        placeholder="Teacher Name"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                            Update Subjects
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