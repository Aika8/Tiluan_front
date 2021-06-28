import React,{Component} from 'react';
import EService from '../../service';
//import Spinner from '../spinner';
import { Row, Col } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import './profile.css'
import Spinner from '../spinner';
import sitting from './sit1.png'
import {Card, Accordion, Form, Button, Modal} from 'react-bootstrap';
import { EnvelopeOpen, PersonFill, FileEarmarkLockFill,FileEarmarkLock2Fill, FileEarmarkLock2 } from 'react-bootstrap-icons';

export default class Profile extends Component{

    service = new EService();
    
    state = {
        id : '',
        email: '',
        password: '',
        password_old : '',
        password_new : '',
        password_again: '',
        error : '',
        fullName : '',
        success : '',
        image: '', 
        show: false
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});


    componentDidMount(){
        this.service.getUser().then((value) =>{
            console.log(value);
            this.setState({id:value.data.id, email: value.data.email, password:value.data.password, fullName: value.data.fullName, image: value.data.imageUrl});
        });
    }


    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    onChangeName = (e) =>{
        this.setState({
            image :e.target.value
        });
    }


    
    validateUser = (e) => {
        this.props.OnSetName(this.state.fullName);
        const user = {
            id : this.state.id,
            email:this.state.email,
            password: this.state.password,
            fullName:this.state.fullName,
            imageUrl: this.state.image
        }
        this.service.addUser(user);
        e.preventDefault();
    };

    onSubmit = (e) => {
        this.props.OnSetName(this.state.fullName);
        const user = {
            id : this.state.id,
            email:this.state.email,
            password: this.state.password,
            fullName:this.state.fullName,
            imageUrl: this.state.image
        }
        this.service.addUser(user);
        e.preventDefault();
    };

    validatePassword = (e) => {
       if(this.state.password_old){
           this.service.chackPassord(this.state.password_old).then((value)=>{
            console.log("here");
               console.log(value);
               if(value.data === true){
                if(this.state.password_new !== this.state.password_again){
                    this.setState({error: "new password does not match", success: "", password_old: "", password_new: "", password_again:""})
                }else{
                const credentials = {
                    id : this.state.id,
                    email:this.state.email,
                    password: this.state.password_new,
                    fullName:this.state.fullName,
                    imageUrl: this.state.image
                }
                this.service.addUser(credentials).then(()=>{
                    console.log("success updated");
                    this.setState({success: "Password Updated", error: "", password_old: "", password_new: "", password_again:""})
                });
                }
               }else{
                this.setState({error: "wrong old password", success: "", password_old: "", password_new: "", password_again:""})
               }
           });
        }
        e.preventDefault();
    };


    render(){

        if(!this.state.email){
            return <Spinner/>;
        }

        const { error, success} = this.state;
     
        var errorMes;
        if(error){
            errorMes = <Card className="red">
            <Card.Text className="d-flex justify-content-center font-weight-bold">
                 <h6>{error}</h6>
            </Card.Text>
        </Card>
        }else if(success){
            errorMes = <Card className="green">
            <Card.Text className="d-flex justify-content-center font-weight-bold">
                 <h6 className="text-light">{success}</h6>
            </Card.Text>
        </Card>
        }else{
            errorMes = ""
        }


            return (
                <>
                                 <Modal show={this.state.show} onHide={this.handleClose} centered>
                                    <Modal.Header closeButton  className="aqua-gradient">
                                    <Modal.Title>Upload link to the avatar photo</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <form onSubmit={this.onSubmit}>
                                                <div className="form-group">
                                                    <input type="text" 
                                                    className="form-control" 
                                                    placeholder="link to the avatar photo"
                                                    value={this.state.image}
                                                    onChange={this.onChangeName}
                                                    required/>
                                                </div>
                                                <button type="submit" className="btn aqua-gradient" onClick={this.handleClose}>Upload</button>

                                        </form>
                                    </Modal.Body>
                                    <Modal.Footer>
                                    <Button className="deep-orange lighten-1 border-warning"  onClick={this.handleClose}>
                                        Close
                                    </Button>
                                    </Modal.Footer>
                                </Modal>

                 <Row className="ml-0 mr-0 wave">
                    <Col sm={9}>

                    <div class="box">
                    <div id="overlay">
                        <div class="image" style={{backgroundImage: `url(${this.state.image})`, cursor:'pointer'}} onClick={this.handleShow}>
                        <div class="trick">
                        </div>
                        </div>
                        <ul class="text">{this.state.fullName}</ul>
                        <div class="text1">{this.state.email}</div>

                        <div className="accord">
                        <Accordion defaultActiveKey="0">
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="0" className="font-weight-bold" style={{cursor:'pointer'}}>
                                Update Profile Data
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="0">
                            <Card.Body>
                            <div className="row">
                            <div className="col">
                            <form onSubmit={this.validateUser}>
                         
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label className="text-success"> Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" 
                                value={this.state.email}
                                name="email"
                                readOnly/>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword">
                                <Form.Label className="text-success"><PersonFill color = "dark"/> Your Name</Form.Label>
                                <Form.Control type="text" placeholder="full name..." 
                                value={this.state.fullName}
                                name="fullName"
                                onChange={this.credentialChange}
                                required/>
                            </Form.Group>

                            <Button variant="primary" type="submit" className="aqua-gradient right">
                             Update Profile
                            </Button>
                
                            </form>
                            </div>
                            </div>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        <Card>
                            <Accordion.Toggle as={Card.Header} eventKey="1" style={{cursor:'pointer'}} className="font-weight-bold">
                              Update Password
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="1">
                            <Card.Body>
                            <form onSubmit={this.validatePassword}>
                         
                         <Form.Group >
                             <Form.Label className="text-success"><FileEarmarkLockFill color = "dark"/> Old Password</Form.Label>
                             <Form.Control type="password" placeholder="Enter old password" 
                             value={this.state.password_old}
                             name="password_old"
                             onChange={this.credentialChange}
                             required/>
                         </Form.Group>

                         <Form.Group >
                             <Form.Label className="text-success"><FileEarmarkLock2Fill color = "dark"/> New Password</Form.Label>
                             <Form.Control type="password" placeholder="Enter new password" 
                             value={this.state.password_new}
                             name="password_new"
                             onChange={this.credentialChange}
                             required/>
                         </Form.Group>

                         <Form.Group >
                             <Form.Label className="text-success"><FileEarmarkLock2 color = "dark"/> Retype New Password</Form.Label>
                             <Form.Control type="password" placeholder="Enter new password again" 
                            value={this.state.password_again}
                            name="password_again"
                            onChange={this.credentialChange}
                            required/>
                         </Form.Group>

                         {errorMes}

                         <Button variant="primary" type="submit" className="aqua-gradient right mt-2">
                          Update Password
                         </Button>
             
                         </form>
                            </Card.Body>
                            </Accordion.Collapse>
                        </Card>
                        </Accordion>
                        </div>
                    </div>
                    </div>

                    </Col>
                    <div class="col-sm-3 d-flex flex-row-reverse pr-0">
                    <nav id="sidebar" className="img">
                            <div className="p-4">
                            <h1 ><span className="logo">Welcome</span></h1>
                        <ul className="list-unstyled components mb-5">
                        <li >
                        <LinkContainer to="/home"><a href="#"><span className="fa fa-home mr-3"></span> Home</a></LinkContainer>
                        </li>
                        <li className="active">
                        <LinkContainer to="/profile"><a href="#"><span className="fa fa-user mr-3"></span> Profile</a></LinkContainer>
                        </li>
                        </ul>

                        <div className="mb-5">
                        {/* <h3 className="h4 mb-3">Search for board</h3>
                        <form action="#" className="subscribe-form">
                            <div className="form-group d-flex">
                                <div className="icon"><span className="icon-paper-plane"></span></div>
                            <input type="text" className="form-control" placeholder="search for board..." 
                            value={this.state.search} onChange={this.onChangeSearch}/>
                            </div>
                        </form> */}
                        </div>
                    <div className="d-flex justify-content-center" style={{ marginTop: '180px'}}>
                    <img src={sitting} alt=""/>
                    </div>
                    </div>
                    </nav>
                    </div>
                </Row>
                </>
            );
       
    };
};