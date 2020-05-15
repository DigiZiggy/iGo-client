import axios from 'react-native-axios';
import {BehaviorSubject} from 'rxjs';
import AsyncStorage from '@react-native-community/async-storage';
import {decode as atob, encode as btoa} from 'base-64';
import EventEmitter from 'eventemitter3';

const API_URL = 'http://172.20.10.2:8080/api/v1/';
var currentUserSubject = new BehaviorSubject(null);

const emitter = new EventEmitter();

class EventService {
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

  createEvent(event) {
    return axios.post(API_URL + 'events', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  modifyEvent(event) {
    return axios.patch(API_URL + 'events', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  deleteEvent(event) {
    return axios.delete(API_URL + 'events', JSON.stringify(event), {
      headers: this.headers,
    });
  }

  findAllEvents() {
    return axios.get(API_URL + 'events', {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  findEventById(id) {
    return axios.get(API_URL + 'events/' + id, {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  addTaskToEvent(eventId, eventTask) {
    return axios.post(
      API_URL + 'events/' + eventId + '/tasks',
      JSON.stringify(eventTask),
      {
        headers: {'Content-Type': 'application/json; charset=UTF-8'},
      },
    );
  }

  findAllEventTasks(eventId) {
    return axios.get(API_URL + 'events/' + eventId + '/tasks', {
      headers: {'Content-Type': 'application/json; charset=UTF-8'},
    });
  }

  deleteEventTask(eventId, eventTask) {
    return axios.delete(
      API_URL + 'events/' + eventId + '/tasks',
      JSON.stringify(eventTask),
      {
        headers: this.headers,
      },
    );
  }
}

export default new EventService();
