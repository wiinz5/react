import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form,Image} from 'react-bootstrap';

export class AddStudentModal extends Component{
    constructor(props){
        super(props);
        this.state={deps:[]};
        this.handleSubmit=this.handleSubmit.bind(this);
        this.handleFileSelected=this.handleFileSelected.bind(this);
    }

    photofilename = "anonymous.png";
    imagesrc = process.env.REACT_APP_PHOTOPATH+this.photofilename;

    componentDidMount(){
        fetch(process.env.REACT_APP_API+'class')
        .then(response=>response.json())
        .then(data=>{
            this.setState({deps:data});
        });
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'student',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                StudentName:event.target.StudentName.value,
                ClassId:event.target.ClassId.value,
                DateOfBirth:event.target.DateOfBirth.value,
                PhotoFileName:this.photofilename

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


    handleFileSelected(event){
        event.preventDefault();
        this.photofilename=event.target.files[0].name;
        const formData = new FormData();
        formData.append(
            "myFile",
            event.target.files[0],
            event.target.files[0].name
        );

        fetch(process.env.REACT_APP_API+'Student/SaveFile',{
            method:'POST',
            body:formData
        })
        .then(res=>res.json())
        .then((result)=>{
            this.imagesrc=process.env.REACT_APP_PHOTOPATH+result;
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
            Add Student
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group controlId="StudentName">
                        <Form.Label>Student Name</Form.Label>
                        <Form.Control type="text" name="StudentName" required 
                        placeholder="Student Name"/>
                    </Form.Group>

                    <Form.Group controlId="ClassId">
                        <Form.Label>Class ID</Form.Label>
                        <Form.Control as="select">
                        {this.state.deps.map(dep=>
                            <option key={dep.ClassId}>{dep.ClassId}</option>)}
                        </Form.Control>
                    </Form.Group>

                    <Form.Group controlId="DateOfBirth">
                        <Form.Label>Date Of Birth</Form.Label>
                        <Form.Control type="date" name="DateOfBirth" required
                        placeholder="Date Of Birth"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit" onClick={this.props.onHide} >
                            Add Student
                        </Button>
                    </Form.Group>
                </Form>
            </Col>

            <Col sm={6}>
                <Image width="200px" height="200px" src={this.imagesrc}/>
                <input onChange={this.handleFileSelected} type="File"/>
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