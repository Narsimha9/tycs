import React from 'react'
import axios from 'axios'
import { Grid, Card, TextField } from '@material-ui/core';
import './styles/index.css'
class Leaderboard extends React.Component {

    state = {
        filter: '',
        data:[]
    }
   
componentDidMount(){
        axios.get(`http://localhost:4000/users/sortlist`)
          .then(res => {
              console.log(res.data)
            this.setState({
                data:res.data
                });                

})
}


    handleSearchChange = event => {
        this.setState({ filter: event.target.value });
    };



    render() {
        const { filter, data } = this.state;
        const lowercasedFilter = filter.toString().toLowerCase();
        const filteredData = data.filter(item => {
            return Object.keys(item).some(key =>
                item[key].toLowerCase().includes(lowercasedFilter)
            );
        })
        return (
            <div>
                <Grid container>
                    <Grid item md={12} sm={12} xs={12} className="searchbar-grid">
                        <span className="welcome-title">Welcome to Leaderboard Page</span>
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
                    <Grid item md={12} sm={12} xs={12}>
                        <br /><br />
                        <Card className="practice-card-div leaderboard-table-titles">
                            <div className="practicebar-card-text-div">
                                <Grid container>
                                    <Grid item md={3} sm={3} xs={3} className="leaderboard-table-titles-font-grid">
                                        <span className="leaderboard-table-titles-font">Rank</span>
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={3} className="leaderboard-table-titles-font-grid">
                                        <span className="leaderboard-table-titles-font">Name</span>
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={3} className="leaderboard-table-titles-font-grid">
                                        <span className="leaderboard-table-titles-font">Roll No</span>
                                    </Grid>
                                    <Grid item md={3} sm={3} xs={3} className="leaderboard-table-titles-font-grid">
                                        <span className="leaderboard-table-titles-font">Score</span>
                                    </Grid>
                                </Grid>
                                {filteredData.map((item,ranks) => (
                                    <Grid container className="leaderboard-table-titles-data">
                                        <Grid item md={3} sm={3} xs={3}>
                                            <span className="leaderboard-table-titles-data">{ranks+1}</span>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <span className="leaderboard-table-titles-data">{item.username}</span>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <span className="leaderboard-table-titles-data">{item.rollno}</span>
                                        </Grid>
                                        <Grid item md={3} sm={3} xs={3}>
                                            <span className="leaderboard-table-titles-data">{item.TotalMarks}</span>
                                        </Grid>
                                    </Grid>
                                ))}
                            </div>
                        </Card>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Leaderboard;
