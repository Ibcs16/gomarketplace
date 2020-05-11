import React from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';

import { Image } from 'react-native';

import FeatherIcon from 'react-native-vector-icons/Feather';

import Dashboard from '../pages/Dashboard';
import Cart from '../pages/Cart';
import Splash from '../pages/Splash';

import Logo from '../assets/logo.png';

import Details from '../pages/Details';

type RootStackParamList = {
  Details: { itemId: string };
  Splash: undefined;
  Dashboard: undefined;
  Cart: undefined;
};

const App = createStackNavigator<RootStackParamList>();

const AppRoutes: React.FC = () => (
  <App.Navigator
    screenOptions={{
      headerShown: true,
      cardStyle: { backgroundColor: '#EBEEF8' },
    }}
    initialRouteName="Splash"
  >
    <App.Screen
      options={{
        headerShown: false,
        // headerTransparent: true,
        // headerTitle: () => <Image source={Logo} />,
      }}
      name="Splash"
      component={Splash}
    />
    <App.Screen
      options={{
        headerShown: true,
        headerTransparent: true,
        headerBackImage: () => null,
        headerTitle: () => <Image source={Logo} />,
      }}
      name="Dashboard"
      component={Dashboard}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        // headerTitle: () => <Image source={Logo} />,
        // headerBackTitleVisible: false,
        // // headerLeft: {
        // //   header: visible
        // // },
        // headerLeftContainerStyle: {
        //   backgroundColor: tra,
        // },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Details"
      component={Details}
    />
    <App.Screen
      options={{
        headerTransparent: true,
        headerTitle: () => <Image source={Logo} />,
        headerBackTitleVisible: false,
        // headerLeft: {
        //   header: visible
        // },
        headerLeftContainerStyle: {
          marginLeft: 20,
        },

        headerBackImage: () => <FeatherIcon name="chevron-left" size={24} />,
      }}
      name="Cart"
      component={Cart}
    />
  </App.Navigator>
);

export default AppRoutes;
