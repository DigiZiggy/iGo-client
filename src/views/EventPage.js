import React, {Component} from 'react';
import {View, Text, FlatList, ActivityIndicator} from 'react-native';
import {styles} from '../styles';
import {ListItem} from 'react-native-elements';
import CustomHeader from '../components/header';
import UserService from '../services/user.service';

export default class EventPage extends Component {
  static navigationOptions = {
    headerShown: false,
  };

  constructor(props) {
    super(props);

    this.state = {
      events: [],
      loading: true,
      title: 'Event List',
    };
  }

  componentDidMount() {
    UserService.findAllEvents().then((events) => {
      this.setState({
        events: events.data,
        loading: false,
      });
    });
  }

  renderItem(itemEvent) {
    const {item} = itemEvent;
    return (
      <ListItem
        title={<Text style={styles.eventTitle}>{item.title}</Text>}
        subtitle={item.description}
        leftIcon={{name: 'pin-drop'}}
        onPress={() =>
          this.props.navigation.navigate('Detail', {
            eventId: item.id,
            event: item,
          })
        }
        chevron
      />
    );
  }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.softContainer}>
        <CustomHeader
          navigation={this.props.navigation}
          title={this.state.title}
        />
        {!this.state.loading && (
          <FlatList
            data={this.state.events}
            renderItem={(item) => this.renderItem(item)}
          />
        )}
        {this.state.loading && (
          <View style={styles.form}>
            <ActivityIndicator size="large" color="#0000ff" />
          </View>
        )}
      </View>
    );
  }
}
