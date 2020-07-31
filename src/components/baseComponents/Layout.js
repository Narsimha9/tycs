import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import { Grid } from '@material-ui/core'
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import DrawerComponent from './drawerComponents'
import Features from "../../appModules/home/features"
import AboutUs from "../../appModules/home/aboutus"
import ContactUs from "../../appModules/home/contactus"
import "../styles/index.css"
import { withStyles } from '@material-ui/core/styles';
import {setAccessToken,getAccessToken} from '../../utils/index'

const drawerWidth = 240;

const styles = theme => ({
    root: {
        display: 'flex',
        height: '100vh !important'
    },
    drawer: {
        [theme.breakpoints.up('sm')]: {
            flexShrink: 0,
        },
    },
    appBar: {
        marginLeft: drawerWidth,
        backgroundColor: 'darkslategray',
        boxShadow: 'none',
        [theme.breakpoints.up('sm')]: {
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
        display: 'none',
        '@media only screen and (max-width: 750px)': {
            display: 'block !important',
            backgroundColor: 'darkslategray',
            color: 'white'
        },
    },
    content: {
        flexGrow: 1,
    },
});

class Layout extends React.Component {

    
    componentDidMount() {
        if(getAccessToken()) {
        this.props.history.push('/app/practices')
        }
        }
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
        } else if(pageName === "signin") {
            this.props.history.push("/signin")
        }
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
                        <Hidden smUp implementation="css">
                            <span className="layout-wv-logo">TYCS</span>
                        </Hidden>
                        <Grid container>
                            <Grid item md={4} sm={8} xs={12} className="layout-logo-grid-div">
                                <Hidden xsDown implementation="css">
                                    <span className="layout-wv-logo" onClick={() => this.navigateToPage("home")}>TYCS</span>
                                </Hidden>
                            </Grid>
                            <Grid item md={8} sm={8} xs={12} className="layout-webview-buttons">
                                <Grid item md={2} sm={2} xs={12} className="layout-wv-button-grid">
                                    <Hidden xsDown implementation="css">
                                        <a href="#features" className="layout-wv-button">Features</a>
                                    </Hidden>
                                </Grid>
                                <Grid item md={2} sm={2} xs={12} className="layout-wv-button-grid">
                                    <Hidden xsDown implementation="css">
                                    <a href="#aboutus" className="layout-wv-button">About Us</a>
                                    </Hidden>
                                </Grid>
                                <Grid item md={2} sm={2} xs={12} className="layout-wv-button-grid">
                                    <Hidden xsDown implementation="css">
                                    <a href="#contactus" className="layout-wv-button">Contact Us</a>
                                    </Hidden>
                                </Grid>
                                <Grid item md={2} sm={2} xs={12} className="layout-wv-button-grid">
                                    <Hidden xsDown implementation="css" className="webview-buttons">
                                        <span className="layout-wv-trynowbutton" onClick={() => this.navigateToPage("signin")}>Login</span>&nbsp;&nbsp;&nbsp;&nbsp;
                                        <span className="layout-wv-trynowbutton" onClick={() => this.navigateToPage("signup")}>Sign Up</span>
                                    </Hidden>
                                </Grid>
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
                            <DrawerComponent closeDrawerToggle={() => this.handlecloseDrawerToggle()}/>
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
                            <DrawerComponent closeDrawerToggle={() => this.handlecloseDrawerToggle()}/>
                        </Drawer>
                    </Hidden>
                </nav>
                <main className={classes.content}>
                    <div className={classes.toolbar} />
                    <div className="layout-bgPic"></div>
                    <Features />
                    <AboutUs />
                    <ContactUs />
                </main>
            </div>
        );
    }
}

Layout.propTypes = {
    classes: PropTypes.object.isRequired,
    // Injected by the documentation to work in an iframe.
    // You won't need it on your project.
    container: PropTypes.object,
    theme: PropTypes.object.isRequired,
};

export default withStyles(styles, { withTheme: true })(Layout);