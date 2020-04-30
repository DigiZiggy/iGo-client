import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';
import {Icon} from 'react-native-elements';

import HomePage from '../views/HomePage';
import AdminPage from '../views/AdminPage';
import UserPage from '../views/UserPage';

import DrawerContent from './menu.content';

const ListStack = createStackNavigator(
  {
    Admin: {screen: AdminPage},
    User: {screen: UserPage},
  },
  {
    initialRouteName: 'Admin',
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
    Admin: {
      screen: ListStack,
      navigationOptions: ({navigation}) => ({
        drawerIcon: ({tintColor}) => <Icon name="person" color={tintColor} />,
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

const AdminMenuStack = createAppContainer(Menu);
export default AdminMenuStack;
