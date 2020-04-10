export default class User {
  constructor(id, name, username, password, email, activityTypes, token, role) {
    this.id = id;
    this.name = name;
    this.username = username;
    this.password = password;
    this.email = email;
    this.activityTypes = activityTypes;
    this.token = token;
    this.role = role;
  }
}
