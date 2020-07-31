import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import LogoutIcon from '@material-ui/icons/PowerSettingsNew'
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import DashboardDrawerComponent from './dbDrawerComponents'
import { setActiveMenu } from '../../actions/index'
import "../styles/index.css"
import { withStyles } from '@material-ui/core/styles';
import DashboardRoute from '../../routes/dashboardRoutes';

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
      },
      drawer: {
        [theme.breakpoints.up('sm')]: {
          width: drawerWidth,
          flexShrink: 0,
        },
      },
      appBar: {
        marginLeft: drawerWidth,
        boxShadow: 'none',
        backgroundColor: 'darkslategrey',
        [theme.breakpoints.up('sm')]: {
          width: `calc(100% - ${drawerWidth}px)`,
        },
      },
      menuButton: {
        marginRight: 20,
        [theme.breakpoints.up('sm')]: {
          display: 'none',
        },
      },
      toolbar: theme.mixins.toolbar,
      drawerPaper: {
        width: drawerWidth,
        backgroundColor: 'darkslategrey',
      },
      content: {
        flexGrow: 1,
        padding: 24,
      },
});

class DashboardLayout extends React.Component {
    state = {
        mobileOpen: false,
    };

    handleDrawerToggle = () => {
        this.setState(state => ({ mobileOpen: !state.mobileOpen }));
    };

    handlecloseDrawerToggle = () => {
        this.setState({ mobileOpen: false })
    }

    navigateToPage = (pageName) => {
        if(pageName === "home") {
            window.location.reload()
            this.props.history.push("/")
        } else if(pageName === "signup") {
            this.props.history.push("/signup")
        }
    }

    logout = () => {
        localStorage.clear()
        this.props.history.push('/')
    }

    render() {
        const { classes, theme } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AppBar position="fixed" className={classes.appBar}>
                    <Toolbar>
                        <IconButton
                            color="inherit"
                            aria-label="Open drawer"
                            onClick={this.handleDrawerToggle}
                            className={classes.menuButton}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Hidden smUp implementation="css" className="mobileview-logout">
                            <span className="layout-wv-logo">Logo</span>
                        </Hidden>
                        <Grid container>
                            <Grid item md={12} sm={12} xs={12} className="db-layout-logo-grid-div">
                                <Hidden xsDown implementation="css">
                                    <span className="layout-wv-logout" onClick={() => this.logout()}><LogoutIcon /></span>
                                </Hidden>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <nav className={classes.drawer}>
                    {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                    <Hidden smUp implementation="css">
                        <Drawer
                            container={this.props.container}
                            variant="temporary"
                            anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                            open={this.state.mobileOpen}
                            onClose={this.handleDrawerToggle}
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                        >
                            <DashboardDrawerComponent closeDrawerToggle={() => this.handlecloseDrawerToggle()}/>
                        </Drawer>
                    </Hidden>
                    <Hidden xsDown implementation="css">
                        <Drawer
                            classes={{
                                paper: classes.drawerPaper,
                            }}
                            variant="permanent"
                            open
                        >
                            <DashboardDrawerComponent closeDrawerToggle={() => this.handlecloseDrawerToggle()}/>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <DashboardRoute {...this.props} />
                </main>
            </div>
        );
    }
}

DashboardLayout.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        setActiveMenu,
    },
        dispatch
    )
}

export default withStyles(styles, { withTheme: true })(
    connect(
        null,
        mapDispatchToProps
    )(DashboardLayout)
);
