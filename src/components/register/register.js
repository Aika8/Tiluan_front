import React,{Component} from 'react';
import EService from '../../service';
import './register.css';
import { Row, Col, Form, Card } from 'react-bootstrap';
import head_img from './tr3.jpg'
import {Link} from 'react-router-dom'

import {Redirect} from 'react-router-dom';


export default class Register extends Component{

    service = new EService();
    
    state = {
        email: '',
        password : '',
        password_again: '',
        error : '',
        fullName : '',
        flag : false
    }

   initialState = {
        email:'', password:'', password_again: '', error:'', fullName : '', flag : false
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    
    validateUser = (e) => {
        if(this.state.password !== this.state.password_again){
            this.setState({error : "password does not match"});

        }else{
           this.service.register(this.state.email, this.state.password, this.state.fullName)
           .then((ans) =>{
               if(ans.data.jwtToken === "error"){
                this.setState({error : "this email is already in use"}) 
               }else{
                this.props.setCookie(ans.data.jwtToken);
                this.service.getUser().then(this.setState({flag: true}));
               
               }
           })
           .catch(()=>{
               this.setState({error : "this email is already in use"})
           }); 
  
        }
        e.preventDefault();
    };

    resetRegisterForm = () => {
        this.setState(() => this.initialState);
    };


    render(){

        if(this.state.flag){
            return <Redirect to ="/home"/>    
        }

        const { error} = this.state;
     
        var errorMes;
        if(error){
            errorMes = <Card className="red">
            <Card.Text className="d-flex justify-content-center font-weight-bold">
                 <h6>{error}</h6>
            </Card.Text>
        </Card>
        }else{
            errorMes = ""
        }
 
            return (
                <>
                <div className="main">
                              <section className="sign-in">
                          <div className="container">
                              <div className="signin-content">
                              <Row className="ml-2">
                                  <Col>
                                  <form onSubmit={this.validateUser}>
                                  <div className="d-flex justify-content-center mt-5">
                                      <h1>Sign Up</h1>
                                  </div>
                                  <Form.Group className="mt-3">
                                      <Form.Label>Your Name</Form.Label>
                                      <input type="text" className="form-control" placeholder="Enter your name" 
                                      name="fullName" onChange={this.credentialChange} value={this.state.fullName}/>
                                  </Form.Group>
                                  <Form.Group className="mt-3">
                                      <Form.Label>Email</Form.Label>
                                      <input type="email" className="form-control" placeholder="Enter email" 
                                      name="email" onChange={this.credentialChange} value={this.state.email}/>
                                  </Form.Group>
                                  <Form.Group className="mt-3">
                                      <Form.Label>Password</Form.Label>
                                      <input type="password" className="form-control" placeholder="Enter password" 
                                      name="password" onChange={this.credentialChange} value={this.state.password}/>
                                  </Form.Group>
                                  <Form.Group className="mt-3">
                                      <Form.Label>Retype Password</Form.Label>
                                      <input type="password" className="form-control mb-5" placeholder="Retype password" 
                                      name="password_again" onChange={this.credentialChange} value={this.state.password_again}/>
                                  </Form.Group>
                                    {errorMes}
                                  <Form.Group className="mt-5">
                                      <button type="submit" className="btn btn-primary btn-block aqua-gradient mt-5">Submit</button>
                                  </Form.Group>
              
                                  </form>
                                  <div className="d-flex justify-content-center mt-5">
                                  <Link to="/login"><h5>I am already a member</h5></Link>
                                  </div>
                                  </Col>
                                  <Col>
                                  <div className="d-flex justify-content-center">
                                  <Link to="/"><h1>TTrello</h1></Link>
                                  </div>
                                  <div className="d-flex justify-content-center">
                                  <img src={head_img} alt=""/>
                                  </div>
                                  </Col>
                              </Row>
                                  
                              </div>
                          </div>
                      </section>
              
                      </div>
                              </>

            );
       
    };
};