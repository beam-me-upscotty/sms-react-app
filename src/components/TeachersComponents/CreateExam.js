import React, { Component } from 'react'
import {Card, Button, FormControl, Select, InputLabel, OutlinedInput, MenuItem, withStyles, TextField} from '@material-ui/core';
import {getSubjects, putExam, handleAPIStatus} from '../../Api';
const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 120,
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
        margin: theme.spacing.unit,
    }
  });
  
class CreateExam extends Component{
    
    constructor(props){
        super(props);
        this.state = {
            known_subjects : [],
            subject : null,
            course : null,
            department : null,
            exam_name : '',
            marks : 100,
            yearOfStudy: null,
        }

        this.setSubject = this.setSubject.bind(this)
        this.setCourse = this.setCourse.bind(this)
        this.setDepartment = this.setDepartment.bind(this)
        this.setMarks = this.setMarks.bind(this)
        this.setYearOfStudy = this.setYearOfStudy.bind(this)
        this.createExamAPICall = this.createExamAPICall.bind(this)
    }

    componentDidMount(){
        getSubjects()
        .then(res=>{
            handleAPIStatus(res.status)
            return res.json()
        })
        .then(json=>{
            console.log(json)
            this.setState({ known_subjects: json.results })
            console.log(this.state)
        })
    }
    render() {
        const { classes } = this.props;

 
        return(
            <Card>
            <form onSubmit={this.createExamAPICall}>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                        this.InputLabelRef = ref;   
                        }}
                        htmlFor="outlined-age-simple"
                    >
                        Subject
                    </InputLabel>
                    <Select
                        value={this.state.subject}
                        onChange={this.setSubject}
                        input={
                        <OutlinedInput
                            labelWidth={50}
                            name="subject"
                            id="outlined-age-simple"
                        />
                        }
                    >
                    {this.state.known_subjects.map((object, index)=> <MenuItem value={object.subject} >{object.subject.name}</MenuItem>)}
                    </Select>

                </FormControl>                
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                        this.InputLabelRef = ref;
                        }}
                        htmlFor="outlined-age-simple"
                    >
                        Course
                    </InputLabel>
                    <Select
                        value={this.state.course}
                        onChange={this.setCourse}
                        input={
                        <OutlinedInput
                            name="course"
                            labelWidth={50}
                            id="outlined-age-simple"
                        />
                        }
                    >
                    {((this.state.subject && this.state.subject.course) || []).map((object, index)=> <MenuItem value={object} >{object.name}</MenuItem>)}
                    </Select>

                </FormControl>
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                            }
                        }
                        htmlFor="outlined-age-simple"
                    >
                        Department
                    </InputLabel>
                    <Select
                        value={this.state.department}
                        onChange={this.setDepartment}
                        input={
                        <OutlinedInput
                        labelWidth={50}
                        name="department"
                            id="outlined-age-simple"
                        />
                        }
                    >
                    {((this.state.course && this.state.course.department) || []).map((object, index)=> <MenuItem value={object} >{object.name}</MenuItem>)}
                    </Select>

                </FormControl>
                <TextField
                    id="marks"
                    label="Marks"
                    className={classes.textField}
                    value={this.state.marks}
                    onChange={this.setMarks}
                    type="number"
                    margin="normal"
                />
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel
                        ref={ref => {
                            this.InputLabelRef = ref;
                            }
                        }
                        htmlFor="outlined-age-simple"
                    >
                    Year Of Study
                    </InputLabel>
                    <Select
                        value={this.state.yearOfStudy}
                        onChange={this.setYearOfStudy}
                        input={
                        <OutlinedInput
                        labelWidth={50}
                        name="department"
                            id="outlined-age-simple"
                        />
                        }
                    >
                    <MenuItem value={1}>First Year</MenuItem>
                    <MenuItem value={2}>Second Year</MenuItem>
                    <MenuItem value={3}>Third Year</MenuItem>
                    <MenuItem value={4}>Fourth Year</MenuItem>
                    </Select>

                </FormControl>
                <Button variant="contained" color="primary" type="submit" className={classes.actionControl} >CREATE AN EXAM</Button>
            </form>
            </Card>
        );
    }
    setDepartment(e){
        console.log(e.target)
        this.setState( { department : e.target.value });
    }

    setCourse(e){
        console.log(e.target)
        this.setState( { course : e.target.value });
    }
    setSubject(e){
        console.log("selection")
        console.log(e.target)
        this.setState( { subject : e.target.value });
    }
    setYearOfStudy(e){
        console.log("selection")
        console.log(e.target)
        this.setState ({ yearOfStudy : e.target.value });
    }
    setMarks(e){
        console.log(e.target)
        this.setState( { marks : e.target.value });
    }
    createExamAPICall(e){
        e.preventDefault()
        e.target.reset()
        putExam(this.state.subject.id, 
            this.state.course.id,
            this.state.department.id, 
            parseInt(this.state.marks), 
            parseInt(this.state.yearOfStudy))
            .then(res=>{
                handleAPIStatus(res.status)
                return res.json()
            }).then(json => {
                console.log(json)
                if(json.response){
                    alert("Exam creation successful")
                }else{
                    alert("Exam creation failed. Please check input")
                }
            })
    }
}
export default withStyles(styles)(CreateExam);