import * as React from 'react';
import {Text, View} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/Home';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DailyMatchScreen from '../screens/DailyMatchScreen';
import MatchesListScreen from '../screens/MatchesListScreen';
import MatchScreen from '../screens/MatchScreen';
import TabNavigator from './TabNavigation';
import { useDispatch, useSelector } from 'react-redux'
import ProfileAddInformationsScreen from '../screens/ProfileAddInformationsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import ProfileAddPhotosScreen from '../screens/ProfileAddPhotosScreen';

const Stack = createNativeStackNavigator();
const StackNavigation= () => {
  const isAuthenticated = useSelector<any>((state)=>state.auth.isAuthenticated)
  console.log(isAuthenticated)

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      {isAuthenticated === false ? (
        <>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
          />
        </>
      ): (
        <>
          <Stack.Screen
            name="ProfilScreen"
            component={ProfileScreen}
          />
          <Stack.Screen
            name="MainScreen"
            component={TabNavigator}
          />
          <Stack.Screen
            name="ProfileAddInformationsScreen"
            component={ProfileAddInformationsScreen}
          />
          <Stack.Screen
            name="ProfileAddPhotosScreen"
            component={ProfileAddPhotosScreen}
          />
        </>
      )}
    </Stack.Navigator>
  );
}
export default StackNavigation;


// Ajouter une autre stack screen si besoin
