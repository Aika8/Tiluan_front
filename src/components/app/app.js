import React,{Component} from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Nav, Navbar} from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import EService from '../../service';
import { DoorOpenFill, JournalAlbum} from 'react-bootstrap-icons';
import Welcome from '../welcome';
import Login from '../auth';
import Register from '../register';
import Home from '../home';
import Profile from '../profile';
import BoardItem from '../boardItem';
import './app.css';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

export default class App extends Component {
    service = new EService();


    logout = () =>{
        this.service.LogoutUser();
       this.setState({flag : false});
    };


    render(){
   
        const mainLinks = (
            <>
                    <Navbar bg="light" expand="lg" className ="aqua-gradient" id="nav" sticky="top">
                    <LinkContainer to="/">
                    <Navbar.Brand><h2 className="text-white"><JournalAlbum/> Tiluan</h2></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <h4><LinkContainer to="/login">
                        <Nav.Link>Login</Nav.Link>
                        </LinkContainer></h4>
                        <h4><LinkContainer to="/register">
                        <Nav.Link>Sing Up</Nav.Link>
                        </LinkContainer></h4>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </>
        );

        const userLinks = (
            <>

                    <Navbar bg="light" expand="lg" className ="aqua-gradient" id="nav" sticky="top">
                    <LinkContainer to="/home">
                    <Navbar.Brand><h2 className="text-white"><JournalAlbum/> Tiluan</h2></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="ml-auto">
                        <h4><LinkContainer to="/" onClick={this.logout}>
                        <Nav.Link><DoorOpenFill color = "dark"/>Logout</Nav.Link>
                        </LinkContainer></h4>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </>
        );

        const boardLinks = (
            <>

                    <Navbar bg="light" expand="lg" className ="aqua-gradient" id="nav" sticky="top">
                    <LinkContainer to="/home">
                    <Navbar.Brand><h2 className="text-white"><JournalAlbum/> Tiluan</h2></Navbar.Brand>
                    </LinkContainer>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav>
                        <h4><LinkContainer to="/home">
                        <Nav.Link>Boards</Nav.Link>
                        </LinkContainer></h4>
                        <h4><LinkContainer to="/profile">
                        <Nav.Link>Profile</Nav.Link>
                        </LinkContainer></h4>
                        </Nav>
                        <Nav className="ml-auto">
                        <h4><LinkContainer to="/" onClick={this.logout}>
                        <Nav.Link><DoorOpenFill color = "dark"/>Logout</Nav.Link>
                        </LinkContainer></h4>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
            </>
        );

        return(
            <>
             <React.StrictMode>
          <Router>                   
                    <Switch>
                        <Route path="/home" exact>
                            {userLinks}
                            <Home OnSetName={(name) => {
                                this.setState({name : name});

                            }}/>
                        </Route>
                        <Route path="/" exact>
                        <>
                            {mainLinks}
                            </>
                            <Welcome/>
                        </Route>
                         <Route path="/login" exact>
                            <Login setCookie={(cook) => {
                                cookies.set('jwtToken', cook);
                            }}/>
                        </Route>
                        <Route path="/register" exact>
                            <Register setCookie={(cook) => {
                                cookies.set('jwtToken', cook);
                            }}/>
                        </Route>
                        <Route path="/profile" exact>
                            {userLinks}
                            <Profile OnSetName={(name) => {
                                this.setState({name : name});

                            }}/>
                        </Route>
                        <Route path="/boards/:id" render={
                            ({match}) => {
                                const {id} = match.params;
                                return <>
                                 {boardLinks}
                                <BoardItem boardId={id} />
                                </>
                            }
                        }/> 
                    </Switch>
            </Router>
            </React.StrictMode>
           </>
        );
    };
}