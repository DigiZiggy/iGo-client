import axios from 'react-native-axios';
import UserService from './user.service';

const API_URL = 'http://172.20.10.2:8080/api/v1/admin/';

class AdminService {
  async setHeaders() {
    const user = await UserService.currentUser;
    this.headers = {
      'Content-Type': 'application/json',
      authorization: 'Bearer ' + (user ? user.token : ''),
    };
  }

  updateUser(user) {
    return axios.put(API_URL + 'users', JSON.stringify(user), {
      headers: this.headers,
    });
  }

  deleteUser(user) {
    return axios.post(API_URL + 'users', JSON.stringify(user), {
      headers: this.headers,
    });
  }

  findAllUsers() {
    return axios.get(API_URL + 'users', {headers: this.headers});
  }
}

export default new AdminService();
