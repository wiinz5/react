import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddSubjectsModal} from './AddSubjectsModal';
import {EditSubjectsModal} from './EditSubjectsModal';

export class Subjects extends Component{

    constructor(props){
        super(props);
        this.state={subs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'subjects')
        .then(response=>response.json())
        .then(data=>{
            this.setState({subs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteSub(subid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'subjects/'+subid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {subs, subid,subname,subteacher}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Subjects ID</th>
                            <th>Subjects Name</th>
                            <th>Teacher Name</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {subs.map(sub=>
                            <tr key={sub.SubjectsId}>
                                <td>{sub.SubjectsId}</td>
                                <td>{sub.SubjectsName}</td>
                                <td>{sub.TeacherName}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        subid:sub.SubjectsId,subname:sub.SubjectsName,subteacher:sub.TeacherName})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteSub(sub.SubjectsId)}>
            Delete
        </Button>

        <EditSubjectsModal show={this.state.editModalShow}
        onHide={editModalClose}
        subid={subid}
        subname={subname}
        subteacher={subteacher}/>
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Subjects</Button>

                    <AddSubjectsModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}