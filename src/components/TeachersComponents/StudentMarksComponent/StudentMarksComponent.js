import React, { Component, Fragment } from 'react';
import { Button, FormControl, TextField, Select, InputLabel, OutlinedInput, MenuItem, withStyles} from '@material-ui/core';
import {getAllExams, getAllStudents, enterMarksForStudent} from './Api'
import {handleAPIStatus, handleAPIError} from '../../../Api'

const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
      display: 'flex'
    },
    actionControl: {
        margin: theme.spacing.unit,
        minHeight:50,
        textAlign: 'center'
    },
    selectEmpty: {
      marginTop: theme.spacing.unit * 2,
    },
    textField:{
        display: 'flex',
        margin: theme.spacing.unit,
    }
  });

class StudentMarksComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            exams:null,
            students: null,
            appearedStudents: null,
            exam:null,
            student:null,
            marks:null,
            error:null
        }
        this.setExam = this.setExam.bind(this)
        this.setStudent = this.setStudent.bind(this)
        this.setMarks = this.setMarks.bind(this)
        this.enterMarks = this.enterMarks.bind(this)
    }

    componentDidMount(){
        getAllExams()
        .then(res=>{
            return res.json()
            
        })
        .then(json=>{
            console.log("All exams received")
            console.log(json)
            this.setState({ exams: json.results })
        })

        getAllStudents()
        .then(res=>{
            return res.json()
        })
        .then(json=>{
            console.log("All students received")
            console.log(json)
            this.setState({ students: json.results })
        })
    }

    render(){
        const { classes } = this.props;
        var response = null
        if(this.state.error){
            console.log("hello")
            response = this.state.error
        }
        return(
        <Fragment>
            <form onSubmit={this.enterMarks}>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                    this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                >
                    Exam
                </InputLabel>
                <Select
                    value={this.state.exam}
                    onChange={this.setExam}
                    input={
                    <OutlinedInput
                        labelWidth={50}
                        name="subject"
                        id="outlined-age-simple"
                    />
                    }
                >
                {(this.state.exams || []).map((object, index)=> <MenuItem value={object}>{object.subject.name} [{object.department.name} {object.course.name}] [Year {object.year_of_study}]</MenuItem>)}
                </Select>
            </FormControl>        
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel
                    ref={ref => {
                    this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                >
                    Student
                </InputLabel>
                <Select
                    value={this.state.student}
                    onChange={this.setStudent}
                    input={
                    <OutlinedInput
                        labelWidth={50}
                        name="student"
                        id="outlined-age-simple"
                    />
                    }
                >
                {(this.state.appearedStudents || []).map((object, index)=> <MenuItem value={object}>(ID={object.user.name}){object.user.name} </MenuItem>)}
                </Select>
            </FormControl>
            <TextField
                    id="marks"
                    label="Marks Scored"
                    className={classes.textField}
                    value={this.state.marks}
                    onChange={this.setMarks}
                    type="number"
                    margin="normal"
                />
            <Button variant="contained" color="primary" type="submit" className={classes.actionControl} >Submit Marks</Button>
            </form>
            <p>{response}</p>
        </Fragment>);
    }

    enterMarks(e){
        this.setState({error:null})
        e.preventDefault()
        enterMarksForStudent(this.state.exam,this.state.student,this.state.marks)
        .then(res=>res.json())
        .then(json=>{
            if(json.non_field_errors){
                this.setState({error:"Marks for this student and exam already entered"})
            }
            console.log(json)
        })
    }
    setExam(e){
        this.setState({exam : null})
        console.log(e.target.value)
        this.setState({exam : e.target.value });
        if(this.state.students){
            var students = []
            this.state.students.forEach(student => {
                if(this.checkEligibility(student, e.target.value)){
                    students.push(student)
                }else{
                    console.log("rejecting")
                    console.log(student)
                }
            });
            console.log(students)
            this.setState({
                appearedStudents: students
            })
        }
    }

    setMarks(e){
        this.setState({marks:e.target.value})
    }
    setStudent(e){
        console.log(e.target.value)
        this.setState( { student : e.target.value } );
    }
    checkEligibility(student, exam){
        if(student.course.id === exam.course.id 
            && student.year_of_study === exam.year_of_study
            && student.department.id === exam.department.id){
            return true
        }
        return false
    }
}

export default withStyles(styles)(StudentMarksComponent);