import axios from 'react-native-axios';
import {BehaviorSubject} from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import EventEmitter from 'eventemitter3';

const API_URL = 'http://172.20.10.2:8080/api/v1/';
var currentUserSubject = new BehaviorSubject(null);

const emitter = new EventEmitter();

class UserService {
  constructor() {
    AsyncStorage.getItem('currentUser', (_err, result) => {
      if (result) {
        currentUserSubject = new BehaviorSubject(JSON.parse(result));
      }
    });
  }

  get currentUser() {
    return currentUserSubject.value;
  }

  get emitter() {
    return emitter;
  }

  loginEmitter(data) {
    emitter.emit('onLogin', {user: data});
  }

  login(user) {
    const headers = {
      authorization: 'Basic ' + btoa(user.username + ':' + user.password),
    };

    return axios
      .get(API_URL + 'user/login', {headers: headers})
      .then((response) => {
        AsyncStorage.setItem('currentUser', JSON.stringify(response.data));
        this.loginEmitter(JSON.stringify(response.data));
        currentUserSubject.next(response.data);
      });
  }

  logOut() {
    return axios.post(API_URL + 'user/logout', {}).then((_response) => {
      AsyncStorage.removeItem('currentUser');
      currentUserSubject.next(null);
    });
  }

  register(user) {
    return axios.post(API_URL + 'user/registration', JSON.stringify(user), {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  findAllUsers() {
    return axios.get(API_URL + 'users', {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  findUserById(id) {
    return axios.get(API_URL + 'users/' + id, {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  findAllUserEvents(id) {
    return axios.get(API_URL + 'users/' + id + '/events', {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }
}

export default new UserService();
