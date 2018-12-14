import React from 'react'
import { Card, CardContent, TextField, Button } from '@material-ui/core';

class LoginForm extends React.Component{
    constructor(props){
        super(props)
        this.checkCreds = this.checkCreds.bind(this)
    }
    render(){
        let cardstyle = {
            'display':'inline-block',
            margin:'50px',
        }
        let pstyle = {
            textAlign:'center',
            height:'100%',
        }
        return (
            <div style={pstyle}>
            <Card style={cardstyle}>
                <h3>Login</h3>
                <CardContent>
                <form onSubmit={this.checkCreds}>
                    <div>
                    <TextField
                        label="User Name"
                        margin="normal"
                        type="text"
                        name="username"
                        />
                    </div>
                    <div>
                    <TextField
                        label="Password"
                        type="password"
                        name="password"
                        margin="normal"
                        />
                        </div>
                    <Button variant="contained" color="secondary" type="submit">Log In</Button>
                </form>
                </CardContent>
            </Card>
            </div>
        );
    }

    checkCreds = async(e) => { 
        e.preventDefault();
        const location = 'localhost:8000'
        const username = e.target.elements.username.value;
        const password = e.target.elements.password.value;
        const settings = {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                password: password
            })
        };
    
        const data = await fetch(`http://${location}/api/auth/login/`, settings)
            .then(response => {
                if(response.ok){
                    return response.json()
                }else{
                    alert("Incorrect auth creds")
                }
            })
            .then(json => {
                if(json){
                    localStorage.setItem('user',JSON.stringify(json.user));
                    localStorage.setItem('token',json.token);
                    this.props.refresh(true);
                    return json;
                }
            })
            .catch(e => {
                alert('Incorrect login password'+e);
                this.props.refresh(false);
                return e
            });
    
        return data;
    }
}

export default LoginForm;