import React from 'react';
import { TouchableHighlight } from 'react-native';
import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator,
  createMaterialTopTabNavigator,
} from 'react-navigation';
import { Constants } from 'expo'
import Icon from 'react-native-vector-icons/MaterialIcons';

import { colors } from './style';

import { AuthLogin, AuthSignUp, Logout } from './scenes/Auth';
import Scheduling from './scenes/Scheduling';
import PendingServices from './scenes/PendingServices';
import CompletedServices from './scenes/CompletedServices';
import Evaluation from './scenes/Evaluation';
import SplashScreen from './scenes/SplashScreen';

const SplashScreenStack = createStackNavigator({
  SplashScreen: { screen: SplashScreen, tabBar: { visible: false } },
}, {
  initialRouteName: 'SplashScreen',
  headerMode: 'none',
});

const AuthStack = createStackNavigator({
  AuthLogin: { screen: AuthLogin, tabBar: { visible: false } },
  AuthSignUp: { screen: AuthSignUp },
}, {
  initialRouteName: 'AuthLogin',
  headerMode: 'screen',
});

const AppTabs = createMaterialTopTabNavigator({
  Scheduling: { screen: Scheduling },
  PendingServices: { screen: PendingServices },
  CompletedServices: { screen: CompletedServices },
}, {
  initialRouteName: 'Scheduling',
  tabBarPosition: 'top',
  tabBarOptions: {
    activeTintColor: '#666',
    inactiveTintColor: '#777',
    showIcon: true,
    showLabel: false,
    style: {
      backgroundColor: colors.backgroundTavbar,
    },
  },
});

const AppStack = createStackNavigator({
  AppTabs: {
    screen: AppTabs,
    navigationOptions: {
      title: `GuiaTur`,
      headerRight: <Logout />,
    },
  },
  Evaluation: { screen: Evaluation },
}, {
  initialRouteName: 'AppTabs',
  headerMode: 'screen',
});

export default createAppContainer(createSwitchNavigator({
  App: AppStack,
  Auth: AuthStack,
  SplashScreen: SplashScreenStack,
}, {
  initialRouteName: 'SplashScreen',
}));
