import React from 'react';
import {createStackNavigator} from 'react-navigation-stack';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createAppContainer} from 'react-navigation';
import {Icon} from 'react-native-elements';
import HomePage from '../views/HomePage';
import EventPage from '../views/EventPage';
import DetailPage from '../views/DetailPage';
import DrawerContent from './menu.content';

const ListStack = createStackNavigator(
  {
    Event: {screen: EventPage},
    Detail: {screen: DetailPage},
  },
  {
    initialRouteName: 'Event',
  },
);

const Menu = createDrawerNavigator(
  {
    Home: {
      screen: HomePage,
      navigationOptions: ({navigation}) => ({
        drawerIcon: ({tintColor}) => <Icon name="home" color={tintColor} />,
      }),
    },
    Event: {
      screen: ListStack,
      navigationOptions: ({navigation}) => ({
        drawerIcon: ({tintColor}) => <Icon name="event" color={tintColor} />,
      }),
    },
  },
  {
    contentComponent: DrawerContent,
    drawerWidth: 300,
    drawerPosition: 'left',
    initialRouteName: 'Home',
  },
);

const MenuStack = createAppContainer(Menu);
export default MenuStack;
