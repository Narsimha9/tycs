import React from 'react'
import "./styles/index.css"
import { Grid } from '@material-ui/core';

class ContactUs extends React.Component {

    render() {
        return (
            <div className="features-maindiv" id="contactus">
                <Grid container>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="features-title">Want to contact us?</span>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <span className="features-content">
                        If you have any queries or if you want to build a website we are always ready to help you out.
                        Contact Person Details:

                        B Narsimhulu
                        8499008525
                        narsimhulu.464@gmail.com 


                        J Siddharth
                        8499008525
                        sidduj@gmail.com

                        M Abhinav ready
                        8499008525
                        abhinav@gmail.com                      
                        </span>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default ContactUs;