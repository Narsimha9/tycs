import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import "../styles/index.css"
import ListItemText from '@material-ui/core/ListItemText';
import { Divider } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

class DrawerComponent extends React.Component {

    navigateToPage = (pageName) => {
        if(pageName === 'signup') {
            this.props.history.push('/signup')
        } else if(pageName === 'signin') {
            this.props.history.push('/signin')
        }
    }

    render() {
        return (
            <div>
                <span className="layout-logo">TYCS</span>
                <span  className="layout-divider"><Divider /></span>
                <List className="layout-list">
                    <ListItem button >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <a href="#features" className="layout-wv-button" onClick={this.props.closeDrawerToggle}><ListItemText primary="Features" /></a>
                    </ListItem>
                    <ListItem button >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <a href="#aboutus" className="layout-wv-button" onClick={this.props.closeDrawerToggle}><ListItemText primary="About Us" /></a>
                    </ListItem>
                    <ListItem button >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <a href="#contactus" className="layout-wv-button" onClick={this.props.closeDrawerToggle}><ListItemText primary="Contact Us" /></a>
                    </ListItem>
                    <ListItem button >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary="Try Now" onClick={() => this.navigateToPage('signup')}/>
                    </ListItem>
                    <ListItem button >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <ListItemText primary="Login" onClick={() => this.navigateToPage('signin')}/>
                    </ListItem>
                </List>
            </div>
        )
    }
}

export default withRouter(DrawerComponent);
