import React from 'react'
import "./styles/index.css"
import { Grid } from '@material-ui/core';

class AboutUs extends React.Component {

    render() {
        return (
            <div className="aboutus-maindiv" id="aboutus">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="features-title">Who we are?</span>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="aboutus-content">
                       We B.Narsimhulu,J.Siddharth and K Abhinav Reddy belongs to VJIT college and we build a project Test Your Coding Skills which is a platform to help the students to test their coding skills.
                        </span>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default AboutUs;