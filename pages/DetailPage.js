import React, {Component} from 'react';
import {View, Text, Image} from 'react-native';
import {styles} from '../styles/index.style';
import {Header, Icon, Button} from 'react-native-elements';
import UserService from '../services/user.service';
import EventTask from '../models/event-task';
import User from '../models/user';
import AsyncStorage from '@react-native-community/async-storage';

export default class DetailPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      eventId: this.props.navigation.getParam('eventId', '0'),
      event: this.props.navigation.getParam('event', '0'),
      errorMessage: '',
      infoMessage: '',
      currentUser: new User(),
      isError: false,
      isSucceed: false,
      loading: false,
    };
  }

  componentDidMount() {
    AsyncStorage.getItem('currentUser', (_err, result) => {
      this.setState({
        currentUser: JSON.parse(result),
      });
    });
  }

  addTaskToEvent() {
    if (!this.state.currentUser) {
      this.setState({
        errorMessage: 'You should sign in to add task to an event',
      });
      return;
    }

    var eventTask = new EventTask(this.state.currentUser, this.state.event);
    this.setState({loading: true});
    UserService.addTaskToEvent(eventTask).then(
      (data) => {
        this.setState({
          infoMessage: 'Mission is completed.',
          isSucceed: true,
          loading: false,
        });
      },
      (error) => {
        this.setState({
          errorMessage: 'Unexpected error occurred.',
          isError: true,
          loading: false,
        });
      },
    );
  }

  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="arrow-back"
              color="#fff"
              onPress={() => this.props.navigation.goBack()}
            />
          }
          centerComponent={{
            text: this.event.title,
            style: {color: '#fff'},
          }}
          rightComponent={
            <Icon
              name="home"
              color="#fff"
              onPress={() => this.props.navigation.navigate('Home')}
            />
          }
        />
        <View style={styles.container}>
          {this.state.isError && (
            <Text style={styles.alertDanger}>
              <Text style={{fontWeight: '600'}}>Error! </Text>
              {this.state.errorMessage}
            </Text>
          )}
          {this.state.isSucceed && (
            <Text style={styles.alertSuccess}>
              <Text style={{fontWeight: '600'}}>Successfull! </Text>
              {this.state.infoMessage}
            </Text>
          )}
          <Text style={styles.detailTitle}>{this.state.event.title}</Text>
          <Image
            resizeMode="cover"
            style={styles.eventLogo}
            source={require('../imgs/product.jpg')}
          />
          <Text style={{marginBottom: 10}}>{this.state.event.description}</Text>
          <Button
            onPress={() => this.addTaskToEvent()}
            buttonStyle={styles.button}
            titleStyle={styles.buttonTitle}
            disabled={this.state.loading}
            title="Add Task Now!"
          />
        </View>
      </View>
    );
  }
}
