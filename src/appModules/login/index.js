import React from 'react';
import axios from 'axios';
//import swal from "sweetalert2"
import { Grid, Card, TextField, Button } from '@material-ui/core'
import { withRouter } from 'react-router-dom'
import './styles/index.css'
import {setAccessToken,getAccessToken} from '../../utils/index'


class Login extends React.Component {
    componentDidMount() {
        if(getAccessToken()) {
        this.props.history.push('/app/practices')
        }
        }
    state = {
        email: '',
        password: '',
        emailMsg: '',
        passwordMsg: '',
        isValid: false,
    }

    navigateToPage = (pageName,) => {
        if (pageName === "signup") {
            this.props.history.push('/signup')
        } else if (pageName === "home") {
            this.props.history.push("/")
        } else if (pageName === "dashboard") {
            this.props.history.push('/app/practices')
        }
    }

    isEmail = () => {
        const emailregex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;
        return emailregex.test(this.state.email) ? undefined : "Enter valid email";
    };


    validateFields = (cb) => {
        let data = this.state
        this.setState({
            emailMsg: data.email ? this.isEmail() : "Enter your email",
            passwordMsg: data.password ? '' : "Enter your password",
        }, () => {
            this.formValidation(cb)
        })
        if (this.state.email && this.isEmail() === 'Enter valid email') {
            this.setState({ isValid: false })
        }
    }

    formValidation = (cb) => {
        let data = this.state
        if (
            data.email || data.password
        ) {
            if (data.email === '' || data.password === '' || this.isEmail() === 'Enter valid email') {
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
            emailMsg: '',
            passwordMsg: '',
        }, () => {
            if (this.state.email && this.isEmail()) {
                this.setState({ emailMsg: 'Enter valid email' })
            }
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.validateFields(() => {
            if (this.state.isValid) {
                const data = {
                    email: this.state.email,
                    password: this.state.password,
                }
                console.log("login data...",data)
                 axios.post(`http://localhost:4000/users/login`,data)
                 .then((res) => {
                            setAccessToken(res.data)
                            console.log(res)
                           // console.log(res.config.data.password)
                            //console.log(res.config.data['email'])
                            //if(data.email==res.data.email && data.password==res.data.password){
                     setTimeout(() => {
                         if(res.data!="Email or password is wrong")
                         this.navigateToPage("dashboard")
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
                                        name="email"
                                        placeholder="E-mail"
                                        className="login-textfield"
                                        value={this.state.email}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                    />
                                    <span className="errorMsg">{this.state.emailMsg}</span>
                                    <TextField
                                        id="outlined-name"
                                        type="password"
                                        placeholder="Password"
                                        className="login-textfield"
                                        name="password"
                                        value={this.state.password}
                                        onChange={(e) => this.handleChange(e)}
                                        // margin="normal"
                                        variant="outlined"
                                    />
                                    <span className="errorMsg">{this.state.passwordMsg}</span>
                                    <br />
                                    <Button type="submit" className="login-button" onSubmit={(e) => this.handleSubmit(e)}>Login</Button>
                                </form>
                            </div>
                            <div className="donthaveac">
                                <span className="login-card-footer-text">Don't have an account&nbsp;?&nbsp;</span>
                                <span className="login-card-footer-link" onClick={() => this.navigateToPage("signup")}>Signup</span>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default withRouter(Login);