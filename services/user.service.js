import axios from 'react-native-axios';
import {BehaviorSubject} from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import EventEmitter from 'eventemitter3';

const API_URL = 'http://172.20.10.2:8080/api/user/';
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

    return axios.get(API_URL + 'login', {headers: headers}).then((response) => {
      AsyncStorage.setItem('currentUser', JSON.stringify(response.data));
      this.loginEmitter(JSON.stringify(response.data));
      currentUserSubject.next(response.data);
    });
  }

  logOut() {
    return axios.post(API_URL + 'logout', {}).then((_response) => {
      AsyncStorage.removeItem('currentUser');
      currentUserSubject.next(null);
    });
  }

  register(user) {
    return axios.post(API_URL + 'registration', JSON.stringify(user), {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  createEvent(event) {
    return axios.post(API_URL + 'event-create', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  updateEvent(event) {
    return axios.put(API_URL + 'event-update', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  deleteEvent(event) {
    return axios.post(API_URL + 'event-delete', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  findAllEvents() {
    return axios.get(API_URL + 'events', {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  addTaskToEvent(eventTask) {
    return axios.post(API_URL + 'event/addTask', JSON.stringify(eventTask), {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }
}

export default new UserService();
