import React,{Component} from 'react';
import EService from '../../service';
import './auth.css';
import { Row, Col, Form, Card } from 'react-bootstrap';
import head_img from './tr2.jpg'
import {Link} from 'react-router-dom'


import {Redirect} from 'react-router-dom';


export default class Login extends Component{

    service = new EService();
    
    state = {
        email: '',
        password : '',
        error : '',
        flag : false
    }

   initialState = {
        email:'', password:'', error:'', flag: false
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };


    
    validateUser = (e) => {
        var isLogged = this.service.authenticateUser(this.state.email, this.state.password);
        console.log(isLogged);
        if(isLogged) {
            isLogged.then((value)=>{
                this.props.setCookie(value.data.jwtToken);
                this.service.getUser().then(this.setState({flag: true}));
            })
            .catch(()=>{
                this.resetLoginForm();
                this.setState({error:"Invalid email or password"});
            });    
        } else {
            this.resetLoginForm();
            this.setState({error:"Invalid email or password"});
        }
        e.preventDefault();
    };

    resetLoginForm = () => {
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
                <Row>
                    <Col>
                    <div className="d-flex justify-content-center">
                    <Link to="/"><h1>TTrello</h1></Link>
                    </div>
                    <div className="d-flex justify-content-center">
                    <img src={head_img} alt=""/>
                    </div>
                    </Col>
                    <Col>
                    <form onSubmit={this.validateUser}>
                    <div className="d-flex justify-content-center mt-5">
                        <h1>Sign In</h1>
                    </div>
                    <Form.Group className="mt-5">
                        <Form.Label>Email</Form.Label>
                        <input type="email" className="form-control" placeholder="Enter email" 
                        name="email" onChange={this.credentialChange} value={this.state.email}/>
                    </Form.Group>

                    <Form.Group className="mt-5 mb-5">
                        <Form.Label>Password</Form.Label>
                        <input type="password" className="form-control mb-5" placeholder="Enter password" 
                        name="password" onChange={this.credentialChange} value={this.state.password}/>
                    </Form.Group>
                    {errorMes}
                    <Form.Group className="mt-5">
                        <button type="submit" className="btn btn-primary btn-block aqua-gradient mt-5">Submit</button>
                    </Form.Group>

                    </form>
                    <div className="d-flex justify-content-center mt-5">
                    <Link to="/register"><h5>Create an Account</h5></Link>
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