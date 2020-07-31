import React from 'react';
import axios from 'axios';
//import swal from "sweetalert2"
import { Grid, Card, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import './styles/index.css'
import {setAccessToken,getAccessToken} from '../../utils/index'

class Signup extends React.Component {

    componentDidMount() {
        if(getAccessToken()) {
        this.props.history.push('/app/practices')
        }
        }
    state = {
        username: '',
        rollno: '',
        email: '',
        password: '',
        cpassword: '',
        usernameMsg: '',
        rollnoMsg: '',
        emailMsg: '',
        passwordMsg: '',
        cpasswordMsg: '',
        isValid: false,
    }

    navigateToPage = (pageName) => {
        if (pageName === "signin") {
            this.props.history.push('/signin')
        } else if (pageName === "home") {
            this.props.history.push("/")
        }
    }

    isEmail = () => {
        const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return emailregex.test(this.state.email) ? undefined : "Enter valid email";
    };


    validateFields = (cb) => {
        let data = this.state
        this.setState({
            usernameMsg: data.username ? '' : "Enter your username",
            rollnoMsg: data.rollno ? '' : "Enter your rollno",
            emailMsg: data.email ? this.isEmail() : "Enter your email",
            passwordMsg: data.password ? '' : "Enter your password",
            cpasswordMsg: data.cpassword ? '' : "Enter your confirm password"
        }, () => {
            this.formValidation(cb)
        })
        if (this.state.password && this.state.cpassword && this.state.password !== this.state.cpassword) {
            this.setState({ cpasswordMsg: 'Password mismatch', isValid: false })
        } else if (this.state.email && this.isEmail() === 'Enter valid email') {
            this.setState({ isValid: false })
        }
    }

    formValidation = (cb) => {
        let data = this.state
        if (
            data.username || data.rollno || data.email || data.password || data.cpassword
        ) {
            if (data.username === '' || data.rollno === '' || data.email === '' || data.password === '' || data.cpassword === '' || this.isEmail() === 'Enter valid email' || data.cpasswordMsg === 'Password mismatch') {
                this.setState({ isValid: false })
            } else {
                this.setState({ isValid: true })
            }
        } else {
            this.setState({ isValid: false })
        }
        setTimeout(() => {
            cb();
        }, 100);
    }

    handleChange = async (e) => {
        await this.setState({
            [e.target.name]: e.target.value,
            usernameMsg: '',
            rollnoMsg: '',
            emailMsg: '',
            passwordMsg: '',
            cpasswordMsg: '',
        }, () => {
            if (this.state.email && this.isEmail()) {
                this.setState({ emailMsg: 'Enter valid email' })
            } else if (this.state.password && this.state.cpassword && this.state.password !== this.state.cpassword) {
                this.setState({ cpasswordMsg: 'Password mismatch' })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFields(() => {
            if (this.state.isValid) {
                const data = {
                    username: this.state.username,
                    rollno: this.state.rollno,
                    email: this.state.email,
                    password: this.state.password
                }
                console.log("signup data...", data)
                axios.post('http://localhost:4000/users/register', data)
                .then((res) => {
                     /*if (response && response.data)
                     /& response.data.message === 'User successfully Registered') 
                     {
                        swal({
                             title: "Success",
                             text: "You have successfully registered",
                             icon: "success",
                             timer: 2000
                     });*/
                     console.log(res);
                     console.log(res.data);
                     //console.log(data);
                     setTimeout(() => {
                        this.navigateToPage("signin")
                     }, 3000);
                 }) 
            }
        })
    }

    render() {
        return (
            <div className="login-mainDiv">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12} className="login-grid">
                        <Card className="loginCard">
                            <span className="login-logo-title" onClick={() => this.navigateToPage("home")}>TYCS</span>
                            <div className="login-textfields-div">
                                <form method="post" onSubmit={(e) => this.handleSubmit(e)} className="login-textfields-form-div">
                                    <TextField
                                        id="outlined-name"
                                        type="text"
                                        name="username"
                                        placeholder="Username"
                                        className="login-textfield"
                                        value={this.state.username}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <span className="errorMsg">{this.state.usernameMsg}</span>
                                    <TextField
                                        id="outlined-name"
                                        type="text"
                                        name="rollno"
                                        placeholder="University Roll no"
                                        className="login-textfield"
                                        value={this.state.rollno}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <span className="errorMsg">{this.state.rollnoMsg}</span>
                                    <TextField
                                        id="outlined-name"
                                        type="text"
                                        name="email"
                                        placeholder="E-mail"
                                        className="login-textfield"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <span className="errorMsg">{this.state.emailMsg}</span>
                                    <TextField
                                        id="outlined-name"
                                        type="password"
                                        name="password"
                                        placeholder="Password"
                                        className="login-textfield"
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <span className="errorMsg">{this.state.passwordMsg}</span>
                                    <TextField
                                        id="outlined-name"
                                        type="password"
                                        name="cpassword"
                                        placeholder="Confirm Password"
                                        className="login-textfield"
                                        value={this.state.cpassword}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                        autoComplete="off"
                                    />
                                    <span className="errorMsg">{this.state.cpasswordMsg}</span>
                                    <br />
                                    <Button type="submit" className="login-button" onClick={(e) => this.handleSubmit(e)}>Signup</Button>
                                </form>
                            </div>
                            <div className="donthaveac">
                                <span className="login-card-footer-text">Already have an account&nbsp;?&nbsp;</span>
                                <span className="login-card-footer-link" onClick={() => this.navigateToPage("signin")}>Login</span>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Signup);