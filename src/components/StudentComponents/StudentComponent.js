import React, { Component, Fragment } from 'react';
import { Card, Table, TableRow, TableCell, withStyles } from '@material-ui/core';
import {  getCurrentStudent } from './Api'
import { handleAPIStatus} from '../../Api'
import { loadAttendanceFor, loadMarksFor } from '../ParentComponents/Api'


const styles=theme=>({
    card:{
        margin:2*theme.spacing.unit,
        padding:theme.spacing.unit,
        display:'inline-block',
        textAlign:'center'
    },
    container:{
        textAlign:'center'
    },
    table:{
        display:'block',
        textAlign:'center',
    },
    actionControl: {
        margin: theme.spacing.unit,
        minHeight:50,
        textAlign: 'center',
        display:'inline-block',
        open:true
    },
    studentScroller:{
        textAlign:'center',
        'overflow-x': 'scroll',
    }
});

class StudentComponent extends Component{
    componentWillMount(){
        // checkUserDetails()
    }
    constructor(props){
        super(props)
        this.state = {
            marks:null,
            attendance:null,
        }
    }
    componentWillMount(){
        getCurrentStudent()
        .then(res=>{
            console.log(res)
             handleAPIStatus(res.status)
            return res.json()
        })
        .then(json=>{
            this.setState({student:json})
            console.log(this.state)
            console.log(json)
            loadMarksFor(this.state.student.id).then(res=>{
                return res.json()
            }).then(json=>{
                console.log(json)
                this.setState({marks:json.results})
                console.log(this.state)
            });
            loadAttendanceFor(this.state.student.id).then(res=>{
                return res.json()
            })
            .then(json=>{
                console.log(json)
                var daysOfPresence = 0;
                json.results.forEach(element => {
                    if(element.status)
                        daysOfPresence++;
                });
                var total = json.results.length
                this.setState({attendance:{
                    presence:daysOfPresence,
                    total:total,
                    precentage:Math.round(100*daysOfPresence/total),
                }})
            });
            })
    }

    render(){
        const {classes, ...other} = this.props;

        var attendanceView, examMarksView;
        if(this.state.attendance){
            attendanceView =    <div className={classes.container}>
                                    <h3>Attendance</h3>
                                    <h4>{this.state.attendance.precentage}%</h4>
                                    <h4>{this.state.attendance.presence}/{this.state.attendance.total} days attended</h4>
                                </div>
        }
        if(this.state.marks){
            examMarksView =
            <div className={classes.container}>
            <Table className={classes.table}>
                <TableRow>
                    <TableCell className={classes.container}>Exam</TableCell>
                    <TableCell className={classes.container}>Marks Scored</TableCell>
                </TableRow>

                {(this.state.marks||[]).map((object, index)=>
                    <TableRow>
                        <TableCell className={classes.container}>({object.exam.subject.name} [{object.exam.department.name} {object.exam.course.name}] [Year {object.exam.year_of_study}])</TableCell>
                        <TableCell className={classes.container}>{object.marks_scored}</TableCell>
                    </TableRow>)
                }
            </Table>
            </div>

        }
        var content = <Card>
                {attendanceView}
                {examMarksView}
                </Card>

        return (
            <Fragment>
                {content}
            </Fragment>
        );
    }
}

export default withStyles(styles)(StudentComponent);