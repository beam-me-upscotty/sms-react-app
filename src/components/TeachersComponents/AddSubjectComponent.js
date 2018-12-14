import React, { Component, Fragment } from 'react';
import { Button, FormControl, Select, InputLabel, OutlinedInput, MenuItem, withStyles} from '@material-ui/core';
import {getAllSubjects, addSubjectToTeacher, handleAPIStatus} from '../../Api'

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

class AddSubjectComponent extends Component{

    constructor(props){
        super(props)
        this.state = {
            subject:null,
            subjects:null,
            error:null
        }
        this.setSubject = this.setSubject.bind(this)
        this.addSubjectToList = this.addSubjectToList.bind(this)
    }

    componentDidMount(){
        getAllSubjects()
        .then(res =>{
            return res.json()
        })
        .then(json=>{
            console.log(json)
            this.setState({ subjects: json})
            console.log(this.state)
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
            <form onSubmit={this.addSubjectToList}>
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
                    {(this.state.subjects||[]).map((object, index)=> <MenuItem value={object.id} >{object.name}</MenuItem>)}
                    </Select>
    
                </FormControl>                
                <Button variant="contained" color="primary" type="submit" className={classes.actionControl} >Add the subject</Button>
            </form>
            <p>{response}</p>
        </Fragment>);
    }

    setSubject(e){
        console.log(e.target)
        this.setState({ subject : e.target.value });
    }

    addSubjectToList(e){
        e.preventDefault()
        addSubjectToTeacher(this.state.subject,JSON.parse(localStorage.getItem('user')).id)
            .then(res=>{
                return res.json()
            })
            .then(json => {
                console.log('shit')
                console.log(json)
                if(json.non_field_errors){
                    this.setState({error:"This subject is already on your list"})
                }    
                if(json.response){
                    alert("subject added to your list");
                }
            })
        
    }

}

export default withStyles(styles)(AddSubjectComponent);