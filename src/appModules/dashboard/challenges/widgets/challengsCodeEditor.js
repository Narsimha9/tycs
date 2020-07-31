import React from 'react'
import { Grid, Card, TextField, Select } from '@material-ui/core'
import BackIcon from '@material-ui/icons/KeyboardArrowLeft'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../styles/index.css"
import { setActiveMenu } from '../../../../actions/index';
import { withRouter } from 'react-router-dom';

class ChallengesCodeEditor extends React.Component {
    state = {
        chosenLanguage: 'C',
        codeEditerBox: '',
        codeEditerBoxMsg: '',
    }

    componentDidMount() {
        this.props.setActiveMenu("Challenges")
    }

    handleChangeLanguage = async (e) => {
        await this.setState({ chosenLanguage: e.target.value })
        console.log("changed lang..", this.state.chosenLanguage)
    }

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value, codeEditerBoxMsg: '' })
    }

    navigateToPage = () => {
        this.props.history.push('/app/challenges')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.codeEditerBox === '') {
            this.setState({ codeEditerBoxMsg: 'Please type the code' })
        } else {
            console.log("code editor...", this.state.codeEditerBox)
        }
    }

    render() {
        return (
            <div>
                <Grid container>
                    <Grid item md={12} sm={12} xs={12} className="searchbar-grid">
                        <div>
                            <span className="welcome-title" onClick={() => this.navigateToPage()}><BackIcon />&nbsp;Go Back</span>
                        </div>
                        {/* <TextField
                            id="outlined-name"
                            type="text"
                            placeholder="Search for Questions"
                            inputProps={{
                                className: "practice-searchbar-textfield"
                            }}
                            className="practice-searchbar"
                            // value={this.state.filter}
                            // onChange={(e) => this.handleSearchChange(e)}
                            variant="outlined"
                        /> */}
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <br /><br />
                        <Card className="practice-card-div">
                            <div className="question-data-div">
                                <span className="question-subtitle">Objective:-</span>
                                <span className="question-data">{this.props.location.state.detail}</span>
                                <br />
                                <span className="question-subtitle">Input Format:-</span>
                                <span className="question-data">Something text</span>
                                <br />
                                <span className="question-subtitle">Output Format:-</span>
                                <span className="question-data">Print The Substrings</span>
                                <br />
                                <span className="question-subtitle">Constraints:-</span>
                                <span className="question-data">{`T<=0.35sec`}</span>
                                <br />
                                <span className="question-subtitle">Sample Input:-</span>
                                <span className="question-data">axyz</span>
                                <br />
                                <span className="question-subtitle">Sample Output:-</span>
                                <span className="question-data">a<br />xyz</span>
                                <br />
                                <span className="question-subtitle">Explanation:-</span>
                                <span className="question-data">a + xyz</span>
                            </div>
                        </Card>
                        <br /><br />
                        <Card className="practice-codeeditor-card-div">
                            <span className="select-language-span-tag">
                                <Select
                                    native
                                    className="select-language"
                                    value={this.state.chosenLanguage}
                                    onChange={(e) => this.handleChangeLanguage(e)}
                                    inputProps={{
                                        name: "language"
                                    }}
                                    disableUnderline
                                >
                                    <option value="C">C</option>
                                    <option value="Python">C++</option>
                                    <option value="C">Java</option>
                                    <option value="Python">Python</option>
                                </Select>
                            </span>
                            <span className="codeeditor-hr" />
                            <br />
                            <TextField
                                name="codeEditerBox"
                                inputProps={{
                                    className: "practice-codeeditor-searchbar"
                                }}
                                multiline={true}
                                rows={18}
                                rowsMax={18}
                                disableUnderline={true}
                                className="practice-codeeditor-text-searchbar"
                                value={this.state.codeEditerBox}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <span className="errorMsg">{this.state.codeEditerBoxMsg}</span>
                            <div className="select-language-span-tag">
                                <span className="run-button" onClick={(e) => this.handleSubmit(e)}>Run</span>
                                &nbsp;&nbsp;&nbsp;
                                <span className="run-button" onClick={(e) => this.handleSubmit(e)}>Submit</span>
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

function mapStateToProps({ userReducer }) {
    return ({
        button_name: userReducer.pathlocation
    })
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveMenu,
    },
        dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChallengesCodeEditor));