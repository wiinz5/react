import React,{Component} from 'react';
import {Modal,Button, Row, Col, Form} from 'react-bootstrap';

export class EditPointModal extends Component{
    constructor(props){
        super(props);
        this.handleSubmit=this.handleSubmit.bind(this);
    }

    handleSubmit(event){
        event.preventDefault();
        fetch(process.env.REACT_APP_API+'point',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                PointId:event.target.PointId.value,
                Midterm:event.target.Midterm.value,
                Final:event.target.Final.value,

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
            Edit Point
        </Modal.Title>
    </Modal.Header>
    <Modal.Body>

        <Row>
            <Col sm={6}>
                <Form onSubmit={this.handleSubmit}>
                <Form.Group controlId="PointId">
                        <Form.Label>Point ID</Form.Label>
                        <Form.Control type="text" name="PointId" required 
                        placeholder="Point ID"
                        disabled
                        defaultValue={this.props.poiid}/>
                    </Form.Group>

                    <Form.Group controlId="Midterm">
                        <Form.Label>Midterm Point</Form.Label>
                        <Form.Control type="text" name="Midterm" required
                        defaultValue={this.props.poimid}
                        placeholder="Midterm Point"/>
                    </Form.Group>
                    
                    <Form.Group controlId="Final">
                        <Form.Label>Final Point</Form.Label>
                        <Form.Control type="text" name="Final" required
                        defaultValue={this.props.poifinal}
                        placeholder="Final Point"/>
                    </Form.Group>

                    <Form.Group controlId="Total">
                        <Form.Label>Total</Form.Label>
                        <Form.Control type="text" name="Total" required
                        disabled
                        defaultValue={this.props.poitotal}
                        placeholder="Total"/>
                    </Form.Group>

                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Update Point
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