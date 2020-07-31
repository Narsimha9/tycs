import React from 'react'
import axios from 'axios'
import { Grid, Card, Select, TextField, FormControlLabel, Checkbox } from '@material-ui/core'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./styles/index.css"
import { setActiveMenu } from '../../../actions/index';
import { withRouter } from 'react-router-dom';

class Practices extends React.Component {

    state = {
        chosenLanguage: 'Java',
        filter: '',
        data: [],
        strings: '',
        arrays: '',
        ds: '',
        solved: '',
        unsolved: '',
        easy: '',
        medium: '',
        hard: '',
        solvedLabel: false,
        unsolvedLabel: false,
        easyLabel: false,
        hardLabel: false,
        stringLabel: false,
        arrayLabel: false
    }


    componentDidMount(){
        axios.get(`http://localhost:4000/Question/questionslist`)
        .then(res => {
            console.log(res.data)
            this.setState({
                data:res.data
                });          
                //console.log(res.data[1].questionid)      
        })
        
    }
    handleSearchChange = event => {
        this.setState({ filter: event.target.value });
    };

    handleChangeLanguage = (e) => {
        this.setState({ chosenLanguage: e.target.value })
    }

    handleChangeCheckbox = async (e, label) => {
        await this.setState({ [e.target.name]: e.target.value })
        if (label === 'strings') {
            this.setState({ stringLabel: !this.state.stringLabel })
        } else if (label === 'arrays') {
            this.setState({ arrayLabel: !this.state.arrayLabel })
        } else if (label === 'ds') {
            this.setState({ dsLabel: !this.state.dsLabel })
        } else if (label === 'solved') {
            this.setState({ solvedLabel: !this.state.solvedLabel })
        } else if (label === 'unsolved') {
            this.setState({ unsolvedLabel: !this.state.unsolvedLabel })
        } else if (label === 'easy') {
            this.setState({ easyLabel: !this.state.easyLabel })
        } else if (label === 'medium') {
            this.setState({ mediumLabel: !this.state.mediumLabel })
        } else if (label === 'hard') {
            this.setState({ hardLabel: !this.state.hardLabel })
        }
        setTimeout(() => {
            if (!this.state.stringLabel && this.state.strings) {
                this.setState({ strings: '' })
            } else if (!this.state.arrayLabel && this.state.arrays) {
                this.setState({ arrays: '' })
            } else if (!this.state.dsLabel && this.state.ds) {
                this.setState({ ds: '' })
            } else if (!this.state.solvedLabel && this.state.solved) {
                this.setState({ solved: '' })
            } else if (!this.state.unsolvedLabel && this.state.unsolved) {
                this.setState({ unsolved: '' })
            } else if (!this.state.easyLabel && this.state.easy) {
                this.setState({ easy: '' })
            } else if (!this.state.mediumLabel && this.state.medium) {
                this.setState({ medium: '' })
            } else if (!this.state.hardLabel && this.state.hard) {
                this.setState({ hard: '' })
            }
            console.log("mmmmmmmmm", this.state.strings, this.state.arrays, this.state.ds, this.state.solved, this.state.unsolved, this.state.easy, this.state.medium, this.state.hard)
        }, 200);
    }
    //const {data}=this.state.data[0].questionid;
    navigateToPage = (questionid) => {
        this.props.history.push({
            pathname: `/app/practices/${questionid}`,
            state: { detail:questionid, chosenLanguage: this.state.chosenLanguage }
        })
        this.props.setActiveMenu("Practice")
    }

    render() {
       // const { this.state.data, data } = this.state;
        /*const lowercasedFilter = filter.toString().toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(lowercasedFilter)
            );
        })*/
        return (
            <div>
                <Grid container>
                    <Grid item md={12} sm={12} xs={12} className="searchbar-grid">
                        <span className="welcome-title">Welcome to Prarctice Page</span>
                        <TextField
                            id="outlined-name"
                            type="text"
                            placeholder="Search for Questions"
                            className="practice-searchbar"
                            inputProps={{
                                className: "practice-searchbar-textfield"
                            }}
                            value={this.state.filter}
                            onChange={(e) => this.handleSearchChange(e)}
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12} className="practice-select-grid">
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
                            <option value="C++">C++</option>
                            <option value="Java">Java</option>
                            <option value="Python">Python</option>
                        </Select>
                        <span className="practice-progressbar-text">Progress bar</span>
                    </Grid>
                    <span className="chosenProgrammingText">{this.state.chosenLanguage} Programming</span>
                    <Grid item md={3} sm={3} xs={12}>
                        <Card className="practice-card-div">
                            <div className="practice-card-child-div">
                                <span className="practice-filter-title">STATUS</span>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.solvedLabel}
                                            name="solved"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'solved')}
                                            value="Solved"
                                            color="primary"
                                        />
                                    }
                                    label="Solved"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.unsolvedLabel}
                                            name="unsolved"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'unsolved')}
                                            value="Unsolved"
                                            color="primary"
                                        />
                                    }
                                    label="Unsolved"
                                />
                            </div>
                            <br />
                            <div className="practice-card-child-div">
                                <span className="practice-filter-title">DIFFICULTY</span>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.easyLabel}
                                            name="easy"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'easy')}
                                            value="Easy"
                                            color="primary"
                                        />
                                    }
                                    label="Easy"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.mediumLabel}
                                            name="medium"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'medium')}
                                            value="Medium"
                                            color="primary"
                                        />
                                    }
                                    label="Medium"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.hardLabel}
                                            name="hard"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'hard')}
                                            value="Hard"
                                            color="primary"
                                        />
                                    }
                                    label="Hard"
                                />
                            </div>
                            <br />
                            <div className="practice-card-child-div">
                                <span className="practice-filter-title">Subtopics</span>
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.stringLabel}
                                            name="strings"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'strings')}
                                            value="Strings"
                                            color="primary"
                                        />
                                    }
                                    label="Strings"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.arrayLabel}
                                            name="arrays"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'arrays')}
                                            value="Arrays"
                                            color="primary"
                                        />
                                    }
                                    label="Arrays"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            className="checkbox-tag"
                                            checked={this.state.dsLabel}
                                            name="ds"
                                            onChange={(e) => this.handleChangeCheckbox(e, 'ds')}
                                            value="Data Structures"
                                            color="primary"
                                        />
                                    }
                                    label="Data Structures"
                                />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item md={9} sm={9} xs={12} className="practice-second-card">
                        <Card className="practice-card-div">
                            <div>
                                {this.state.data.map((item, index) => (
                                  
                                   <div className="practice-card-text-div" onClick={() => this.navigateToPage(item.questionid,item.questionid)} key={index}>
                                        <span className="pro-question">{item.title}</span>
                                        <div className="solvequestiondiv">
                                            <div className="solvequetion-child-div">
                                                <span className="question-level">{item.topic},</span>
                                                <span>&nbsp;Max.Score:</span>
                                                <span className="score-count">&nbsp;{item.MaxMarks}</span>
                                            </div>
                                            <span className="solve-question-button">Solve Question</span>
                                        </div>
                                    </div>
                                ))}
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Practices));











            /*
            {this.state.data.map((item, index) => (
            
            { question: "What is C programming language?", level: "Hard", count: "30" },
            { question: "What is Java programming language?", level: "Easy", count: "20" },
            { question: "Implement palindrome using C programming language?", level: "Medium", count: "40" },
            { question: "Implement palindrome using Java programming language?", level: "Hard", count: "10" },
            { question: "What is Python programming language?", level: "Medium", count: "30" },
            { question: "What is R programming language?", level: "Hard", count: "15" },
            { question: "Implement palindrome using Python programming language?", level: "Easy", count: "20" },
            { question: "Implement palindrome using R programming language?", level: "Medium", count: "30" },
            { question: "Implement palindrome using Go programming language?", level: "Hard", count: "50" },
            { question: "What is Go programming language?", level: "Hard", count: "10" },
             // <div className="practice-card-text-div" onClick={() => this.navigateToPage(index + `zdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ${index}sckdb`, item.questionid)} key={index}>*/