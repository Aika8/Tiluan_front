import React, {Component} from 'react';
import { X, ThreeDotsVertical } from 'react-bootstrap-icons';
import EService from '../../service';
import Spinner from '../spinner';
import { Dropdown } from 'react-bootstrap';

export default class CardItem extends Component{
    service = new EService();

    state = {
         id: this.props.card.id,
         name: this.props.card.name,
         addedDate: this.props.card.addedDate,
         tasks: this.props.card.tasks,
         taskDate: "",
         taskName: ""
    }
  

    addCardFunc = () =>{
        const {cardId, taskDate, taskName,tasks, ...card} = this.state;
        const task = {
            id: null, 
            description: this.state.taskName,
            addedDate: this.state.taskDate,
            card: card
        }
        this.service.addTask(task).then(() =>{
            this.LoadData() 
        });
        this.setState(() => ({taskName: "", taskDate: ""}));
        this.props.handleTaskClosed();

    }

    onSubmit = (e) =>{
		const card = {
            id: this.state.id,
            name: this.state.name, 
            addedDate: this.state.addedDate,
            board: this.props.board
        }
        this.service.addСard(card);
        this.props.handleTaskClosed();
		e.preventDefault();
   }


    LoadData = () =>{
        this.service.getCard(this.state.id).then((card)=>{
            this.setState({
                id: card.data.id,
                name: card.data.name,
                addedDate: card.data.addedDate,
                tasks: card.data.tasks
            })
        })
    }
    
    
    onCardSubmit = (e) =>{
       
        var date = new Date();
        this.setState({taskDate: new Intl.DateTimeFormat("en-GB", {dateStyle: 'full', timeStyle: 'medium'}).format(date)}, this.addCardFunc);
    
        e.preventDefault();
    };


    onChangeCardName = (e) =>{
        this.setState({
            taskName :e.target.value
        });
    };

    onChangeName = (e) =>{
        this.setState({
            name :e.target.value
        });
    };

    
    handleTaskDelete = (id) =>{
        this.service.deleteTask(id).then(()=>{
            this.LoadData()
        });     
    };

    handleCardDelete = (id) =>{
        this.service.deleteCard(id).then(()=>{
            this.props.BoardLoad()
        });     
    };


    render(){

        const {tasks} = this.state;
        
        if(!tasks){
            return <Spinner/>;
        }

        const tasksHtml = tasks.map((task) => {
  
            const {id, description} = task;
            return (
                
                <li key ={id} style={{position: 'relative'}}>{description}<X color="dark" style={{
                    position: 'absolute',top: '0px', right:'2px',
                    cursor: 'pointer' }} onClick = {() => {this.handleTaskDelete(id)}}/></li>
               
            );
        });

        let cardAddWindow;
        let window = <>
            {this.state.name}
            <Dropdown  style={{float: "right"}}>
            <Dropdown.Toggle id="dropdown-basic" drop="right" key="right" as ={ThreeDotsVertical}>
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href="" onClick = {() => {this.props.handleTaskWindow("edit")}}>Edit</Dropdown.Item>
                <Dropdown.Item href="" onClick = {() => {this.handleCardDelete(this.state.id)}}>Delete</Dropdown.Item>
            </Dropdown.Menu>
            </Dropdown>
        </>;
        if(this.props.cardId !== this.state.id){
            cardAddWindow = <button class="add-card-btn btn" onClick = {() => {this.props.handleTaskWindow("")}}>Add a card</button>
        }else{
            if(this.props.flag === "edit"){
                window = <>
                <div class="board-controls">
				<form onSubmit={this.onSubmit}>
				<div class="board-title btn">
					<input type="text" 
                        value={this.state.name}
                        onChange={this.onChangeName}
                        required
						className="form-control font-weight-bold mt-1" style={{BorderBottom: '4px solid'}}/>
				</div>

				<button class="submit star-btn btn" aria-label="Star Board">
						Change
				</button>
				<button class="submit star-btn btn" aria-label="Star Board"  onClick={() => {this.props.handleTaskClosed()}}>
						Cancel
				</button>
				</form>
				</div>
            </>
            }else{
                cardAddWindow = 
            <div class="add-card-btn btn">
            <form onSubmit={this.onCardSubmit}>
                    <div class="">
                        <input type="text" 
                            value={this.state.TaskName}
                            onChange={this.onChangeCardName}
                            required
                            className="form-control font-weight-bold mt-1" style={{BorderBottom: '4px solid'}}/>
                    </div>
    
                    <button class="submit btn" aria-label="Star Board">
                            Add
                    </button>
                    <button class="btn" aria-label="Star Board" onClick={() => {this.props.handleTaskClosed()}}>
                            Cancel
                    </button>
                    </form>
                </div>
            }
        }


        return(
            <>
               	<div class="list">
		
                <h3 class="list-title">{window}
                </h3>

                <ul class="list-items">
                    {tasksHtml}
                </ul>

                {cardAddWindow}

            </div> 
            </>
        );
    };
};