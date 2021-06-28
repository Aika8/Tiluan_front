import axios from 'axios'
import {userInstance} from './index';
import Cookies from 'universal-cookie';

const cookies = new Cookies();

const axiosInstanse  = axios.create({
  baseURL: "http://localhost:8000"
});


class EService{


  Check = () => {

    if(cookies.get('jwtToken')) {
      let token = "Bearer " + cookies.get('jwtToken');
        axiosInstanse.defaults.headers.common['Authorization'] = `${token}`;
    } else {
        delete axiosInstanse.defaults.headers.common['Authorization'];
    }
  }

  async getAllCards() {
    this.Check();
    return await axiosInstanse.get(`/api/allCards`);
  }

  async getAllBoards() {
    this.Check();
    return await axiosInstanse.get(`/api/allBoards`);
  }

  async getCardsByBoard(id) {
    this.Check();
    return await axiosInstanse.get(`/api/allCardsByBoard?id=${id}`);
  }

  async getCard(id) {
    this.Check();
    return await axiosInstanse.get(`/api/card?id=${id}`);;
  }

  async getBoard(id) {
    this.Check();
    return await axiosInstanse.get(`/api/board?id=${id}`);;
  }

  async addСard(data) {
    this.Check();
    return await axiosInstanse.post(`/api/addCard`, data);
  }

  async addBoard(data) {
    this.Check();
    return await axiosInstanse.post(`/api/addBoard`, data);
  }

  async addTask(data) {
    this.Check();
    return await axiosInstanse.post(`/api/addTask`, data);
  }

  async deleteCard(id) {
    this.Check();
    await axiosInstanse.post(`/api/deleteCard?id=${id}`);
      return true;
  }

  async deleteTask(id) {
    this.Check();
    await axiosInstanse.post(`/api/deleteTask?id=${id}`);
      return true;
  }

  async deleteBoard(id) {
    this.Check();
    await axiosInstanse.post(`/api/deleteBoard?id=${id}`);
      return true;
  }

  async getSearchedCards(search) {
    this.Check();
    return await axiosInstanse.get(`/api/allCardsBySearch?search=${search}`);
  }


 async authenticateUser(email, password){
    const credentials = {
      email: email,
      password: password
    };
    return await axiosInstanse.post(`/auth`, credentials);
  }


  async getUser(){
    this.Check();
    return axiosInstanse.get(`/api/user`);
  }

  async LogoutUser(){
    cookies.remove('jwtToken');
    userInstance.isLoggedIn = '';
    userInstance.user = '';
  }


  async register(email, password, fullName){
    const credentials = {
      email: email,
      password: password,
      fullName : fullName
    };


    return await axiosInstanse.post(`/register`, credentials);
  }


  async addUser(data) {
    this.Check();
    return await axiosInstanse.post(`/api/addUser`, data);
  }

  async chackPassord(password) {
    this.Check();
    return await axiosInstanse.get(`/api/checkPassword?password=${password}`);
  }

}

export default EService;