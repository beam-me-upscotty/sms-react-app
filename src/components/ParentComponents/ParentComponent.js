import React, { Component, Fragment } from 'react';
import { Card, withStyles, CardContent, Button, Table, TableCell, TableRow, Dialog, DialogTitle } from '@material-ui/core';
import {getChildren, loadAttendanceFor, loadMarksFor} from './Api'
import { handleAPIStatus } from '../../Api';

const styles=theme=>({
    card:{
        margin:2*theme.spacing.unit,
        padding:theme.spacing.unit,
        display:'inline-block',
        textAlign:'center'
    },
    container:{
        textAlign:'center',
        padding:theme.spacing.unit,
        background:'white',
        margin: theme.spacing.unit,
        'border-radius':theme.spacing.unit
    },
    attendance:{
        textAlign:'center',
        background:'white',
        'border-radius':theme.spacing.unit,
        display:'inline-block',
        padding:theme.spacing.unit,
        margin: theme.spacing.unit
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
    },
});
  

class ParentComponent extends Component{
    constructor(props){
        super(props)
        this.state = {
            children:null,
            content:null,
            marks:null,
            attendance:null,
            open:false
        }
        this.showDetails = this.showDetails.bind(this)
        this.close = this.close.bind(this)
    }
    componentWillMount(){
        getChildren(JSON.parse(localStorage.getItem('user')).id)
        .then(res=> res.json())
        .then(json=>{
            this.setState({children:json.child})
        })
    }
    render(){
        const {classes, ...other} = this.props;
        var cards = null;
        cards = (this.state.children||[]).map((object,index)=>{
            return  <Card className={classes.card} id={index}>
                    <h1>{object.user.name}</h1>
                        <CardContent>
                        <p>{object.department.name} Department</p>
                        <p>{object.course.name} Course</p>
                        <p>{object.year_of_study} Year</p>
                        <Button variant="contained" color="primary" onClick={(e)=>this.showDetails(e,object)} className={classes.actionControl} >Show Details</Button>
                        </CardContent>
                    </Card>
        })

        var attendanceView, examMarksView;
        if(this.state.attendance){
            attendanceView =    <div className={classes.attendance}>
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

        const dialogStyle = {
            textAlign:'center',
        }
    
        const dialogtextStyle = {
            textAlign:'center',
        }

        var modal = <Dialog onClose={this.close} open={this.state.open} aria-labelledby="simple-dialog-title" {...other}>
                <div style={dialogStyle}>
                    <DialogTitle id="simple-dialog-title" style={dialogtextStyle}>Details</DialogTitle>
                {attendanceView}
                {examMarksView}
                </div>
            </Dialog>
        return (
            <Fragment>
                    <div className={classes.studentScroller}>
                {cards}
                </div>
                {modal}
            </Fragment>
        );
    }

    showDetails(e, object){
        console.log(e)
        console.log(object)
        loadMarksFor(object.id).then(res=>{
            return res.json()
        }).then(json=>{
            console.log(json)
            this.setState({marks:json.results})
            console.log(this.state)
        });
        loadAttendanceFor(object.id).then(res=>{
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
        this.setState({
            open:true
        })
    }

    close(){
        this.setState({
            open:false
        })
    }
}


export default withStyles(styles)(ParentComponent);