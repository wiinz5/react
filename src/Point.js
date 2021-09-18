import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';
import {AddPointModal} from './AddPointModal';
import {EditPointModal} from './EditPointModal';

export class Point extends Component{

    constructor(props){
        super(props);
        this.state={pois:[], addModalShow:false, editModalShow:false}
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'point')
        .then(response=>response.json())
        .then(data=>{
            this.setState({pois:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }

    deletePoi(poiid){
        if(window.confirm('Are you sure?')){
            fetch(process.env.REACT_APP_API+'point/'+poiid,{
                method:'DELETE',
                header:{'Accept':'application/json',
            'Content-Type':'application/json'}
            })
        }
    }
    render(){
        const {pois, poiid,poisub,poistu,poimid,poifinal,poitotal}=this.state;
        let addModalClose=()=>this.setState({addModalShow:false});
        let editModalClose=()=>this.setState({editModalShow:false});
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Point ID</th>
                            <th>Subjects Name</th>
                            <th>Student Name</th>
                            <th>Midterm Point</th>
                            <th>Final Point</th>
                            <th>Total</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pois.map(poi=>
                            <tr key={poi.PointId}>
                                <td>{poi.PointId}</td>
                                <td>{poi.SubjectsName}</td>
                                <td>{poi.StudentName}</td>
                                <td>{poi.Midterm}</td>
                                <td>{poi.Final}</td>
                                <td>{poi.Total}</td>
                                <td>
<ButtonToolbar>
    <Button className="mr-2" variant="info"
    onClick={()=>this.setState({editModalShow:true,
        poiid:poi.PointId,poisub:poi.SubjectsName,poistu:poi.StudentName,
        poimid:poi.Midterm,poifinal:poi.Final,poitotal:poi.Total})}>
            Edit
        </Button>

        <Button className="mr-2" variant="danger"
    onClick={()=>this.deletePoi(poi.PointId)}>
            Delete
        </Button>

        <EditPointModal show={this.state.editModalShow}
        onHide={editModalClose}
        poiid={poiid}
        poisub={poisub}
        poistu={poistu}
        poimid={poimid}
        poifinal={poifinal}
        poitotal={poitotal}
        />
</ButtonToolbar>

                                </td>

                            </tr>)}
                    </tbody>

                </Table>

                <ButtonToolbar>
                    <Button variant='primary'
                    onClick={()=>this.setState({addModalShow:true})}>
                    Add Point</Button>

                    <AddPointModal show={this.state.addModalShow}
                    onHide={addModalClose}/>
                </ButtonToolbar>
            </div>
        )
    }
}