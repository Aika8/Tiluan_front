import React,{Component} from 'react';
import {Card} from 'react-bootstrap';
import './board.css';

export default class Board extends Component{

    render(){
        
        return this.props.cards.map((card) => {
  
            const {id,name, addedDate} = card;

            return (
                
                <div key ={id} className="mx-5 my-3 rounded">
                <Card border="primary" style={{ width: '19rem' }} className="board" onClick={()=> this.props.OnItemSelected(id)}>
                    <Card.Body className="aqua-gradient">
                    <Card.Title className="text-white"><h4>{name}</h4></Card.Title>
                    </Card.Body>
                    <Card.Footer className="text-muted">{addedDate}</Card.Footer>
                </Card>
                </div>
               
            );
        });
    };
}