import React,{Component} from 'react';
import './boardItem.css'
import AnimatedBg from "react-animated-bg";
import EService from '../../service';
import {Redirect} from 'react-router-dom';
import CardItem from '../cardItem';

export default class BoardItem extends Component{
	service = new EService();
    
    state = {
        id: null,
		name: "",
		addedDate: "",
		cards: null,
        flag : true,
		deleted: "",
		cardName: "",
		cardDate: "",
		cardFlag: true,
		cardId: "",
		taskFlag: ""
   }

   onSubmit = (e) =>{
		var board;
        this.service.getUser().then((user) =>{
            console.log(user.data)
            board ={
                id: this.state.id,
		   		name: this.state.name,
		   		addedDate: this.state.addedDate,
                user: user.data
            }
            this.service.addBoard(board)

            this.setState(() => ({flag: true}));
        });
		e.preventDefault();
   }

   addCardFunc = () =>{
	const {flag, deleted, cards, ...board} = this.state;
	const card = {
		id: null, 
		name: this.state.cardName,
		addedDate: this.state.cardDate,
		board: board
	}
	this.service.addСard(card)
	.then(() =>{
		this.LoadData() 
	});
	this.setState(() => ({cardName: "", cardDate: "", cardFlag: true}));
	
}


onCardSubmit = (e) =>{
   
	var date = new Date();
	this.setState({cardDate: new Intl.DateTimeFormat("en-GB", {dateStyle: 'full', timeStyle: 'medium'}).format(date), cards: null}, this.addCardFunc);

	e.preventDefault();
};


    handleEditWindow = () =>{
        this.setState({flag: false})
    };

	handleCardWindow = () =>{
        this.setState({cardFlag: false})
    };



    onChangeName = (e) =>{
        this.setState({
            name :e.target.value
        });
    };

	onChangeCardName = (e) =>{
        this.setState({
            cardName :e.target.value
        });
    };

    handleCancel = () =>{
        this.setState({flag: true})
    };

	handleCardCancel = () =>{
        this.setState({cardFlag: true})
    };



    handleDelete = () =>{
        let del = this.service.deleteBoard(this.state.id);
        this.forceUpdate();
        del.then((value) =>{
            this.setState({
                deleted :"deleted"
            }); 
        });       
    };

	componentDidMount(){
        console.log("mount");
        this.LoadData();      
    }

	LoadData = () =>{
        console.log("load");
        var boardId = this.props.boardId;
        Promise.all([
            this.service.getCardsByBoard(boardId),
            this.service.getBoard(boardId)
        ]).then(([cards, board]) =>{
            this.setState({
                cards: cards.data,
                id: board.data.id,
				name: board.data.name,
				addedDate: board.data.addedDate
            });
            console.log(cards);
        })  
    }


    render(){

		const imagesList = [
			'url("https://picsum.photos/id/1000/2000/1000")',
			'url("https://picsum.photos/id/293/2000/1000")',
			'url("https://picsum.photos/id/302/2000/1000")',
			'url("https://picsum.photos/id/465/2000/1000")'
		  ];


		  if(this.state.deleted === "deleted"){
            return <Redirect to ="/home"/>
        }
        
        let window;
		if(this.state.flag){
			window = <div class="board-controls">

			<button class="board-title btn">
				<h2>{this.state.name}</h2>
			</button>

			<button class="star-btn btn" aria-label="Star Board" onClick = {this.handleEditWindow}>
				<i class="far fa-edit" aria-hidden="true"></i>
			</button>

			</div>
		}else{
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
				<button class="submit star-btn btn" aria-label="Star Board" onClick={this.handleCancel}>
						Cancel
				</button>
				</form>
				</div>
            </>
		}

		const board = {
			id: this.state.id,
			name: this.state.name,
			addedDate: this.state.addedDate,
		}

		let cardsHtml
		if(this.state.cards != null){
		cardsHtml = this.state.cards.map((card) => {
  
            const {id} = card;
            return (
                <div className="mr-4" key ={id}>
                	<CardItem card ={card} handleTaskWindow = {(flag)=>{
						this.setState({cardId: id, taskFlag: flag})
					}} handleTaskClosed = {()=>{
						this.setState({cardId: "", taskFlag: ""})
					}} cardId = {this.state.cardId} flag = {this.state.taskFlag} board = {board} BoardLoad = {this.LoadData}/>
                </div>
            );
        });
	}else{
		cardsHtml = ""
	}

	let cardAddWindow
	if(this.state.cardFlag){
		cardAddWindow = <button class=" add-list-btn btn font-weight-bold" style={{ width: '20rem'}} onClick = {this.handleCardWindow}>Add a list</button>
	}else{
		cardAddWindow = 
		<div class=" add-list-btn btn font-weight-bold" style={{ width: '20rem'}}>
		<form onSubmit={this.onCardSubmit}>
				<div class="">
					<input type="text" 
						value={this.state.CardName}
						onChange={this.onChangeCardName}
						required
						className="form-control font-weight-bold mt-1" style={{BorderBottom: '4px solid'}}/>
				</div>

				<button class="submit btn" aria-label="Star Board">
						Add
				</button>
				<button class="btn" aria-label="Star Board" onClick={this.handleCardCancel}>
						Cancel
				</button>
				</form>
			</div>
	}

     return (
         
		 <>
		    <AnimatedBg
        colors={imagesList}
        duration={10}
        delay={0}
        timingFunction="linear"
      >

		<div className="pt-2">
		<section class="board-info-bar my-3">
				{window}
				<button class="menu-btn btn" onClick={this.handleDelete}><i class="fas fa-trash menu-btn-icon" aria-hidden="true"></i>Delete Board</button>

		</section>

<section class="lists-container">
		{cardsHtml}
    <div className="pr-5" style={{ flex: '0 0 20rem'}}>
		{cardAddWindow}
    </div>
</section>
</div>
</AnimatedBg>
              </>
            );
       
    };
};