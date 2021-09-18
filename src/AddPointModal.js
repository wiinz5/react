import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class AddPointModal extends Component{
    constructor(props){
        super(props);
        this.state={subs:[], stus:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'student')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stus:data});
        });

        fetch(process.env.REACT_APP_API+'subjects')
        .then(response=>response.json())
        .then(data=>{
            this.setState({subs:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'point',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                SubjectsId:event.target.SubjectsId.value,
                StudentId:event.target.StudentId.value,
                Midterm:event.target.Midterm.value,
                Final:event.target.Final.value
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
            Add Point
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="SubjectsId">
                        <Form.Label>Subjects ID</Form.Label>
                        <Form.Control as="select">
                        {this.state.subs.map(sub=>
                            <option key={sub.SubjectsId}>{sub.SubjectsId}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="StudentId">
                        <Form.Label>Student ID</Form.Label>
                        <Form.Control as="select">
                        {this.state.stus.map(stu=>
                            <option key={stu.StudentId}>{stu.StudentId}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="Midterm">
                        <Form.Label>Midterm Point</Form.Label>
                        <Form.Control type="text" name="Midterm" required
                        placeholder="Midterm Point"/>
                    </Form.Group>
                    
                    <Form.Group controlId="Final">
                        <Form.Label>Final Point</Form.Label>
                        <Form.Control type="text" name="Final" required
                        placeholder="Final Point"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide}>
                            Add Point
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