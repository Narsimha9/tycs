import React from 'react'
import "./styles/index.css"
import { Grid } from '@material-ui/core';

class Features extends React.Component {

    render() {
        return (
            <div className="features-maindiv" id="features">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="features-title">What are our Features</span>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="features-content">
                        This platform is built to test your C and Java coding skills as of now and in future we are going to add some more features like Python, Php coding editors..
                        </span>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Features;