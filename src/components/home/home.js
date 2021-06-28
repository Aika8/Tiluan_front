import React, {PureComponent} from 'react';
 import EService from '../../service';
 import Spinner from '../spinner';
import './home.css';
import {withRouter} from 'react-router-dom'
import { Row, Col } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap'
import {Card, CardGroup, Modal, Button} from 'react-bootstrap';
import card from './home_card.png'
import sitting from './sit1.png'
import Board from '../board';
import add from './addIcon3.jpg'

import Cookies from 'universal-cookie';
import {Redirect} from 'react-router-dom';
const cookies = new Cookies();


class Home extends PureComponent{

    service = new EService();
    state = {
        boards: null,
         name :"",
         addedDate: "",
         search : "",
         welcomeName:"",
         show : false
    }

    handleClose = () => this.setState({show: false});
    handleShow = () => this.setState({show: true});
   

    addCardFunc = () =>{

        var board;
        this.service.getUser().then((user) =>{
            console.log(user.data)
            board ={
                name: this.state.name,
                addedDate: this.state.addedDate,
                user: user.data
            }
            this.service.addBoard(board)
            .then(() =>{
                this.LoadData() 
            });
            this.setState(() => ({name: "", addedDate: ""}));
        });
    }

    
    onSubmit = (e) =>{
       
        var date = new Date();
        this.setState({addedDate: new Intl.DateTimeFormat("en-GB", {dateStyle: 'full', timeStyle: 'medium'}).format(date), cards: null}, this.addCardFunc);

        e.preventDefault();
    };

    onChangeName = (e) =>{
        this.setState({
            name :e.target.value
        });
    };

    
    componentDidMount(){
        console.log("mount");
        this.LoadData();
        this.service.getUser().then((value) =>{
            this.setState({welcomeName : value.data.fullName})
        });
    }


    LoadData = () =>{
        console.log("load");
        this.service.getAllBoards()
        .then((boards) => {
            this.setState({boards : boards});
        });
    }

    onChangeSearch = (e) =>{
        this.setState({
            search :e.target.value
        });
    };


    render(){

        if(!cookies.get('jwtToken')){
            return <Redirect to ="/login"/>    
        }

        const {search, boards} = this.state;
        let emptyMessage;

        if(!boards){
            return <Spinner/>;
        }
        
            const filteredData = boards.data.filter(item => {
                return Object.keys(item).some(key =>
                    item.name.includes(search)
                );
            });


        if(filteredData.length === 0){
            emptyMessage = <>
            
            <div className="center-align">
            <h3 className="center-align">Results Not Found</h3>
            </div>
            <div className="center-align">
            <img className="center-align" alt="" src="https://media.discordapp.net/attachments/512921760803454987/814575773741482026/cross_1.png"/>
            </div>
           
            </>
        }else{
            emptyMessage = ""
        }
        

        const {history} = this.props;


        return(
            <>

             <Modal show={this.state.show} onHide={this.handleClose} centered>
                    <Modal.Header closeButton  className="aqua-gradient">
                    <Modal.Title>Add new Board</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input type="text" 
                                    className="form-control" 
                                    placeholder="Create new board"
                                    value={this.state.name}
                                    onChange={this.onChangeName}
                                    required/>
                                </div>
                                <button type="submit" className="btn aqua-gradient" onClick={this.handleClose}>ADD NEW</button>

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
                        <div class="d-flex justify-content-center mt-5 ml-5 mb-5">                   
                        <Card  style={{ width: '650px', height: '270px' }} className="shadow-lg p-3 mb-5 bg-white rounded">
                            <Card.Img variant="top" src={card} />
                            <Card.Body>
                            <Card.Text>
                            <h5 className="text-center font-weight-bold"> Tiluan boards are the portal to more organized work-where every single part of your task can be managed.</h5>
                            </Card.Text>
                            </Card.Body>
                        </Card>
                        </div>

                        <div className="mt-5 ml-5 d-flex justify-content-center">
                        {emptyMessage}
                        <CardGroup className="mx-5 rounded">
                        <Board cards = {filteredData} OnItemSelected={(ItemId) => {
                                history.push(`/boards/${ItemId}`);
                        }}  LoadData={this.LoadData}/>
                        <div className="mx-5 my-3 rounded">
                        <Card border="dark" style={{ width: '15rem', height: '8rem'}} className="shadow ml-4 board" onClick={this.handleShow}>
                            <img src={add} alt=""/>
                        </Card>
                        </div>
                        </CardGroup >
                        </div>

                    </Col>
                    <div class="col-sm-3 d-flex flex-row-reverse pr-0">
                    <nav id="sidebar" className="img">
                            <div className="p-4">
                            <h1 ><span className="logo">Welcome <span className="ml-1"> {this.state.welcomeName}</span></span></h1>
                        <ul className="list-unstyled components mb-5">
                        <li className="active">
                        <LinkContainer to="/home"><a href="#"><span className="fa fa-home mr-3"></span> Home</a></LinkContainer>
                        </li>
                        <li>
                        <LinkContainer to="/profile"><a href="#"><span className="fa fa-user mr-3"></span> Profile</a></LinkContainer>
                        </li>
                        </ul>

                        <div className="mb-5">
                        <h3 className="h4 mb-3">Search for board</h3>
                        <form action="#" className="subscribe-form">
                            <div className="form-group d-flex">
                                <div className="icon"><span className="icon-paper-plane"></span></div>
                            <input type="text" className="form-control" placeholder="search for board..." 
                            value={this.state.search} onChange={this.onChangeSearch}/>
                            </div>
                        </form>
                        </div>
                    <div className="mt-5 d-flex justify-content-center">
                    <img src={sitting} alt=""/>
                    </div>
                    </div>
                    </nav>
                    </div>
                </Row>


            </>
        );
    };
}

export default withRouter(Home);