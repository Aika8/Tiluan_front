import React,{Component} from 'react';
import './welcome.css'
import head_img from './business-img.png'
import {Link} from 'react-router-dom'
import { Button } from 'react-bootstrap';




export default class Welcome extends Component{


    render(){


            return (
                <>
                  <div className=" hero-area">
                  <div className="overlay" id ="header">
                    <span></span>
                    <span></span>
                </div>
                        <div className="cont">      
                            <div className="row mr-0">
                            <div className="col-lg-5 mt-5">
                            <div className="contents mt-5 mb-5">
                                <h1 className="head-title font-weight-bold text-white">It's more than work<br/>It's productive one</h1>
                                <p className="text-white">TTrello is the visual collaboration platform that gives teams perspective on projects. <br/>Use TTrello to collaborate, communicate and coordinate on all of your projects.</p>
                                <div className="header-button">
                                     <Link to="/register">
                                    <Button className="aqua-gradient">Join Us</Button>
                                    </Link>
                               </div> 

                                </div>
                            </div>
                            <div className="col-lg-6 col-xs-12 p-0">
                                <div className="intro-img">
                                <img src={head_img} alt=""/>
                                </div>            
                            </div>
                            </div> 
                        </div>  
                      </div>  
              </>
            );
       
    };
};