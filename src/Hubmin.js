import React,{Component} from 'react';
import {Table} from 'react-bootstrap';
import {Button,ButtonToolbar} from 'react-bootstrap';
import {EditHubminModal} from './EditHubminModal';
import {AddHubminModal} from './AddHubminModal';

export class Hubmin extends Component{

    constructor(props){
        super(props);
        this.state={hubs:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'hubmin')
        .then(response=>response.json())
        .then(data=>{
            this.setState({hubs:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deleteHub(hubuser){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'hubmin/'+hubuser,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {hubs, hubuser,hubpass,status}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>User Name</th>
                            <th>Authorities</th>
                        </tr>
                    </thead>
                    <tbody>
                        {hubs.map(hub=>
                            <tr key={hub.Username}>
                                <td>{hub.Username}</td>
                                <td>{hub.Status}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        hubuser:hub.Username,hubpass:hub.Password,status:hub.Status})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deleteHub(hub.Username)}>
            Delete
        </Button>

        <EditHubminModal show={this.state.editModalShow}
        onHide={editModalClose}
        hubuser={hubuser}
        hubpass={hubpass}
        status={status}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add User</Button>

                    <AddHubminModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}