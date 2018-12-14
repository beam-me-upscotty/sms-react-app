import React, { Fragment } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import ParentComponent from './ParentComponents/ParentComponent'
import TeacherComponent from './TeachersComponents/TeacherComponent'
import StudentComponent from './StudentComponents/StudentComponent'
import { Button } from '@material-ui/core';

class Dashboard extends React.Component{

    constructor(props){
        super(props);
        this.state = JSON.parse(localStorage.getItem("user"));
    }
    render(){

        const appBarTextStyle = {
            flexGrow:1
        }
        return (
            <Fragment>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" style={ appBarTextStyle } color="inherit">
                           Welcome {this.state.name}
                        </Typography>
                        <Button onClick={this.logout} color='inherit'>Logout</Button>
                    </Toolbar>
                </AppBar>
                <Operations user_type={this.state.user_type}/>
            </Fragment>
        );
    }
    logout(){
        localStorage.clear()
        window.location.reload()
    }
}

function Operations(props) {
    if(props.user_type === 1){
        return <StudentComponent/>;
    }else if(props.user_type === 2){
        return <TeacherComponent />;
    }else if(props.user_type === 3){
        return <ParentComponent />;
    }else 
        return <p>Something is wrong with your account. Contact Administrator.</p>;

}


export default Dashboard;