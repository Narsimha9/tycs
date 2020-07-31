import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
// import ListItemIcon from '@material-ui/core/ListItemIcon';
import "../styles/index.css"
import ListItemText from '@material-ui/core/ListItemText';
// import { Divider } from '@material-ui/core';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { withRouter } from 'react-router-dom';
import { setActiveMenu } from '../../actions/index';

class DashboardDrawerComponent extends React.Component {
    state = {
        buttonName: ""
    };

    componentDidMount() {
        if (this.props.history.location.pathname === "/app/practices") {
            this.props.setActiveMenu("Practice")
        } else if (this.props.history.location.pathname === "/app/challenges") {
            this.props.setActiveMenu("Challenges")
        } else if (this.props.history.location.pathname === `/app/challenges/:id`) {
            this.props.setActiveMenu("Challenges")
        } else if (this.props.history.location.pathname === `/app/practices/:id`) {
            this.props.setActiveMenu("Practice")
        } else if (this.props.history.location.pathname === "/app/leaderboard") {
            this.props.setActiveMenu("Leaderboard")
        }
    }

    navigateToPage = (pageName) => {
        if(pageName === 'practices') {
            this.props.setActiveMenu("Practice")
            this.props.history.push('/app/practices')
        } else if(pageName === 'challenges') {
            this.props.setActiveMenu("Challenges")
            this.props.history.push('/app/challenges')
        } else if(pageName === 'leaderboard') {
            this.props.setActiveMenu("Leaderboard")
            this.props.history.push('/app/leaderboard')
        }
    }

    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        const { button_name } = this.props;

        return (
            <div>
                <span className="db-layout-logo">TYCS</span>
                {/* <span  className="db-layout-divider"><Divider /></span> */}
                <List className="layout-list">
                    <ListItem button
                    onClick={() => this.navigateToPage("practices")} 
                     className={
                        "Practice" === button_name
                            ? "active-sidebar-button"
                            : "inactive-sidebar-button"
                    }
                    >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <span className="db-layout-wv-button"><ListItemText primary="Practice" /></span>
                    </ListItem>
                    <ListItem button 
                    onClick={() => this.navigateToPage("challenges")} 
                     className={
                        "Challenges" === button_name
                            ? "active-sidebar-button"
                            : "inactive-sidebar-button"
                    }
                    >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <span className="db-layout-wv-button"><ListItemText primary="Challenges" /></span>
                    </ListItem>
                    <ListItem button
                    onClick={() => this.navigateToPage("leaderboard")} 
                     className={
                        "Leaderboard" === button_name
                            ? "active-sidebar-button"
                            : "inactive-sidebar-button"
                    }
                    >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <span className="db-layout-wv-button"><ListItemText primary="Leaderboard" /></span>
                    </ListItem>
                    <ListItem button
                    onClick={() => this.logout()} 
                     className="inactive-sidebar-button"
                    >
                        {/* <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon> */}
                        <span className="db-layout-wv-button"><ListItemText primary="Logout" /></span>
                    </ListItem>
                </List>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DashboardDrawerComponent));
