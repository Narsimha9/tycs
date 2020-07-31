import React from 'react'
import axios from 'axios'
import { Grid, Card,TextField,Button} from '@material-ui/core'
import BackIcon from '@material-ui/icons/KeyboardArrowLeft'
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "../styles/index.css"
import { setActiveMenu } from '../../../../actions/index';
import { withRouter } from 'react-router-dom';



class PracticesCodeEditor extends React.Component {
    state = {
        chosenLanguage: 'Java',
        codeEditerBox: '',
        codeEditerBoxMsg: '',
        code:'',
        TotalMarks:'',
        qtype:'',
        data: [],
        Testcases:[],
        inputs:[],
        outputs:[],
        filter:'',
        question:[],
        questionid:'',
        description:'',
        topic:'',
        title:'',
        inputformat:'',
        outputformat:'',
        sampleinput:'',
        sampleoutput:'',
        Explanation:'',
        Authorization:''
    }

   
    componentDidMount() {
      this.props.setActiveMenu("Practice");
      const qn={
        questionid:this.props.location.state.detail
      }

     axios.post(`http://localhost:4000/Question/questionslist/unique`,qn)
      .then(res => {
          console.log(res.data)
        this.setState
        ({
       topic: res.data[0].topic,
       title:res.data[0].title,
       sampleinput:res.data[0].sampleinput,
       sampleoutput:res.data[0].sampleoutput,
       inputformat:res.data[0].inputformat,
       outputformat:res.data[0].outputformat,
       Explanation:res.data[0].Explanation,
       description:res.data[0].description,
       inputs:res.data[0].inputs,
       outputs:res.data[0].outputs,
       qtype:res.data[0].qtype
    })
  
          })
        
  }
    

    handleChangeLanguage = async (e) => {
        await this.setState({ chosenLanguage: e.target.value })
        console.log("changed lang..", this.state.chosenLanguage)
    }

    handleChange = async (e) => {
        await this.setState({ [e.target.name]: e.target.value, codeEditerBoxMsg: '' })
    }

    navigateToPage = () => {
        this.props.history.push('/app/practices')
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const test={
        code:this.state.codeEditerBox,
        inputs:this.state.inputs,
        outputs:this.state.outputs,
        qtype:this.state.qtype,
        questionid:this.props.location.state.detail,
      //  headers : {Authorization: 'JWT' + localStorage.getItem('accessToken')}
        }
        //const Authorization=localStorage.getItem('accessToken')
        //const tokenref = JSON.parse(this.getAuthToken())
        //console.log(Authorization)
        if (this.state.codeEditerBox=== '') {
            this.setState({ codeEditerBoxMsg: 'Please type the code' })
        } 
        else  
        {
           //console.log(test);
           const tok={
            headers : {Authorization: '' + localStorage.getItem('accessToken')}
           }
          // console.log(tok)
           axios.get('http://localhost:4000/compiler/me',tok)
           .then(response=> {})
           if(this.props.location.state.chosenLanguage==='Java'){
            axios.post(`http://localhost:4000/compiler/javalanguage`,test)
            .then(res => {
                this.setState({
                    data:res
                    })
                 //  console.log(res.data)
                    if(res.data=='1')
                    {
                this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                        
                    }
                    else if (res.data=='2'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                    }
                    else if (res.data=='3'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                    }
                    else if (res.data=='4'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                    }                    
                   else if(res.data=='12')
                   {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                   }
                   else if (res.data=='13'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='14'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                   }
                   else if(res.data=='23')
                   {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='24'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Passed"})
                   }
                   else if (res.data=='34'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                   }                   
                   else if (res.data=='123'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='134'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                }
                else if (res.data=='234'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                }
                else if (res.data=='1234'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                } 
                else if (res.data=='0'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                }                                     
                })

           }
           else if(this.props.location.state.chosenLanguage==='Python'){
            axios.post(`http://localhost:4000/pycom/pythonlanguage`,test)
            .then(res => {
                this.setState({
                    data:res
                    })
                 //  console.log(res.data)
                    if(res.data=='1')
                    {
                this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                        
                    }
                    else if (res.data=='2'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                    }
                    else if (res.data=='3'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                    }
                    else if (res.data=='4'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                    }                    
                   else if(res.data=='12')
                   {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                   }
                   else if (res.data=='13'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='14'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                   }
                   else if(res.data=='23')
                   {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='24'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Passed"})
                   }
                   else if (res.data=='34'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                   }                   
                   else if (res.data=='123'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                   }
                   else if (res.data=='134'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                }
                else if (res.data=='234'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                }
                else if (res.data=='1234'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                } 
                else if (res.data=='0'){
                    this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                }                                     
                })
            }
            else if(this.props.location.state.chosenLanguage==='C'){
                axios.post(`http://localhost:4000/ccom/clanguage`,test)
                .then(res => {
                    this.setState({
                        data:res
                        })
                     //  console.log(res.data)
                        if(res.data=='1')
                        {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                            
                        }
                        else if (res.data=='2'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                        }
                        else if (res.data=='3'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                        }
                        else if (res.data=='4'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                        }                    
                       else if(res.data=='12')
                       {
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                       }
                       else if (res.data=='13'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='14'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                       }
                       else if(res.data=='23')
                       {
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='24'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Passed"})
                       }
                       else if (res.data=='34'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                       }                   
                       else if (res.data=='123'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='134'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                    }
                    else if (res.data=='234'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                    }
                    else if (res.data=='1234'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                    } 
                    else if (res.data=='0'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                    }                                     
                    })
                }
            else if(this.props.location.state.chosenLanguage==='C++'){
                axios.post(`http://localhost:4000/cppcom/cpplanguage`,test)
                .then(res => {
                    this.setState({
                        data:res
                        })
                     //  console.log(res.data)
                        if(res.data=='1')
                        {
                    this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                            
                        }
                        else if (res.data=='2'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                        }
                        else if (res.data=='3'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                        }
                        else if (res.data=='4'){
                            this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                        }                    
                       else if(res.data=='12')
                       {
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Failed Test Case 4: Failed"})
                       }
                       else if (res.data=='13'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='14'){
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Failed Test Case 4: Passed"})
                       }
                       else if(res.data=='23')
                       {
                           console.log("23")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='24'){
                           console.log("24")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Failed Test Case 4: Passed"})
                       }
                       else if (res.data=='34'){
                           console.log("23")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                       }                   
                       else if (res.data=='123'){
                           console.log("123")

                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Failed"})
                       }
                       else if (res.data=='134'){
                           console.log("134")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : Failed Test Case 3: Passed Test Case 4: Passed"})
                    }
                    else if (res.data=='234'){
                        console.log("234")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                    }
                    else if (res.data=='1234'){
                        console.log("1234")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : passed Test case 2 : passed Test Case 3: Passed Test Case 4: Passed"})
                    } 
                    else if (res.data=='0'){
                        console.log("0")
                        this.setState({ codeEditerBoxMsg:"Test case 1 : Failed Test case 2 : Failed Test Case 3: Failed Test Case 4: Failed"})
                    }                                     
                    })
                }


               
        }
        const data=this.state;
        console.log(data)

         //this.setState({ codeEditerBoxMsg:data})
         // this.setState({ codeEditerBoxMsg:this.state.codeE})

         //console.log("code editor...", this.state.codeEditerBox)
    }


    render() {
 
        return (
            
            <div>
                <Grid container>
                    <Grid item md={12} sm={12} xs={12} className="searchbar-grid">
                        <div>
                            <span className="welcome-title" onClick={() => this.navigateToPage()}><BackIcon />&nbsp;Go Back</span>
                        </div>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                       
                        <Card className="practice-card-div">
                            <div className="question-data-div">
                         
                                <span className="question-subtitle">Objective:-</span>
                                <span className="question-data">{this.state.description}</span>
                            <br/>
                               
                                <span className="question-subtitle">Input Format:-</span>
                                 <span className="question-data">{this.state.inputformat}</span>
                                <br />
                                <span className="question-subtitle">Output Format:-</span>
                                <span className="question-data">{this.state.outputformat}</span>
                                <br />
                                <span className="question-subtitle">Sample Input:-</span>
                                <span className="question-data">{this.state.sampleinput}</span>
                                <br />
                                <span className="question-subtitle">Sample Output:-</span>
                                <span className="question-data"><br />{this.state.sampleoutput}</span>
                                <br />
                                <span className="question-subtitle">Explanation:-</span>
                            <span className="question-data">{this.state.Explanation}</span>
                          
                            </div>
                        </Card>
                        <br /><br />
                        <Card className="practice-codeeditor-card-div">
                            <span className="select-language-span-tag">
                                {this.props.location.state.chosenLanguage} Programming
                            </span>
                            <span className="codeeditor-hr" />
                            <br />
                            <TextField
                                name="codeEditerBox"
                                inputProps={{
                                    className: "practice-codeeditor-searchbar"
                                }}
                                multiline={true}
                                rows={22}
                                rowsMax={22}
                                disableUnderline={true}
                                className="practice-codeeditor-text-searchbar"
                                value={this.state.codeEditerBox}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <span className="errorMsg">{this.state.codeEditerBoxMsg}</span>
                            <div className="select-language-span-tag">
                                <Button type="submit" className="run-button" onClick={(e) => this.handleSubmit(e)}>RUN</Button>
                                &nbsp;&nbsp;&nbsp;
                                <Button type="submit" className="run-button" onClick={(e) => this.handleSubmit(e)}>Submit</Button>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PracticesCodeEditor));




/*                                <span className="question-subtitle">Constraints:-</span>
                                <span className="question-data">{}</span>
                                <span className="run-button" onClick={(e) => this.handleSubmit(e)}>Submit</span>
                                <br />
                                 <span className="run-button" onClick={(e) => this.handleSubmit(e)}>Run</span>
                                 <br /><br />*/