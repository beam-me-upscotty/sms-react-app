import React, { Component, Fragment } from 'react';
import { withStyles, Card, Typography, Button } from '@material-ui/core';
import CreateExam from './CreateExam';
import AddSubjectComponent from './AddSubjectComponent';
import StudentMarksComponent from './StudentMarksComponent/StudentMarksComponent'

const styles = {
  };

class TeacherComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            known_subjects: [],
            other_subjects: [],
            marks: [],
            component:null
        }
    }
    render(){
        var actionStyle = {
            margin:"20px",
        }
        var cardStyle = {
            textAlign:'center',
            margin:'20px',
            padding:'10px'
        }

        return (
            <Fragment>
                <Card style={cardStyle}>
                    <Typography variant="h4" color="inherit">
                        <p>
                           Here's a list of actions you can start with
                        </p>
                    </Typography>
                    <Button variant="contained" color="secondary" onClick={this.displayExam} style={actionStyle}>CREATE AN EXAM</Button>
                    <Button variant="contained" color="secondary" onClick={this.displayAddSubject} style={actionStyle}>Add new Subject in the list of classes you take  </Button>
                    <Button variant="contained" color="secondary"  onClick={this.displayStudentMarks} style={actionStyle}>Enter Students' Marks for previous exam</Button>
                    {this.state.component}
                </Card>
            </Fragment>
        );
    }
    displayExam = (e) => {
        console.log(e.target)
        this.setState({
            component: <CreateExam getUser={this.getUser()}/>,
        })
    }
    displayAddSubject = (e) => {
        
        this.setState({
            component: <AddSubjectComponent getUser={this.getUser()}/>,
        })
    }
    displayStudentMarks = (e) => {
        this.setState({
            component: <StudentMarksComponent getUser={this.getUser()}/>,            
        })
    }
    getUser(){
        return JSON.parse(localStorage.getItem('user'));
    }
}


export default withStyles(styles)(TeacherComponent);