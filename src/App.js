import React from 'react';
import LoginForm from './components/LoginForm'
import Dashboard from './components/Dashboard';
import './App.css'

class App extends React.Component{

    constructor(props){
        super(props);
        if(localStorage.getItem('token') === null){
            this.state = {
                isLoggedIn:false,
            }
        }
        else{
            this.state = {
                isLoggedIn:true,
            }
        }
        console.log(this.state)
    }

    render(){
        if(this.state.isLoggedIn === false){
            return (<LoginForm refresh={this.refreshApp}/>);
        }
        else{
            return (<Dashboard/>)
        }
    }

    refreshApp = async(response) => {
        if(response){
            if(localStorage.getItem('token') === null){
                this.setState({isLoggedIn : false});
            }
            else{
                this.setState({isLoggedIn : true});
            }
        }

    }
}

export default App;