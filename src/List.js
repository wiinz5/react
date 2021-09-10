import React,{Component} from 'react';
import {Table} from 'react-bootstrap';

import {Button,ButtonToolbar} from 'react-bootstrap';

export class List extends Component{

    constructor(props){
        super(props);
        this.state={lis:[]}
    }

    print(){
        window.print();
    }

    refreshList(){
        fetch(process.env.REACT_APP_API+'list')
        .then(response=>response.json())
        .then(data=>{
            this.setState({lis:data});
        });
    }

    componentDidMount(){
        this.refreshList();
    }

    componentDidUpdate(){
        this.refreshList();
    }
    render(){
        const {lis}=this.state;
        return(
            <div >
                <Table className="mt-4" striped bordered hover size="sm">
                    <thead>
                        <tr>
                            <th>Student Name</th>
                            <th>Subjects Name</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {lis.map(li=>
                            <tr key={li.StudentName}>
                                <td>{li.StudentName}</td>
                                <td>{li.SubjectsName}</td>
                                <td>{li.Total}</td>
                            </tr>)}
                    </tbody>
                </Table>
                <ButtonToolbar>
                    <Button variant='primary' onClick={this.print} >Print</Button>
                </ButtonToolbar>
            </div>
        );
    }
}