import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddStudentModal} from './AddStudentModal';
import {EditStudentModal} from './EditStudentModal';

export class Student extends Component{

    constructor(props){
        super(props);
        this.state={stus:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'student')
        .then(response=>response.json())
        .then(data=>{
            this.setState({stus:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteStu(stuid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'student/'+stuid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {stus, stuid,stuname,classid,photofilename,dob}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Student ID</th>
                            <th>Student Name</th>
                            <th>Class ID</th>
                            <th>DOB</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stus.map(stu=>
                            <tr key={stu.StudentId}>
                                <td>{stu.StudentId}</td>
                                <td>{stu.StudentName}</td>
                                <td>{stu.ClassId}</td>
                                <td>{stu.DateOfBirth}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        stuid:stu.StudentId,stuname:stu.StudentName,classid:stu.ClassId,
        photofilename:stu.PhotoFileName,dob:stu.DateOfBirth})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteStu(stu.StudentId)}>
            Delete
        </Button>

        <EditStudentModal show={this.state.editModalShow}
        onHide={editModalClose}
        stuid={stuid}
        stuname={stuname}
        classid={classid}
        photofilename={photofilename}
        dob={dob}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Student</Button>

                    <AddStudentModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}