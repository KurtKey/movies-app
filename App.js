import React from 'react';
import Favories from './screens/Favories';
import Home from './screens/Home';
import FilmDetails from './screens/FilmDetails';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MovieTrailer from './screens/MovieTrailer';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStack() {
  return (
    <Stack.Navigator
    initialRouteName="Home"
    screenOptions={{ headerStyle: { backgroundColor: '#2196F3' }, headerTitleStyle: { color: '#fff' }}}>
          <Stack.Screen name="Search" component={Home}/>
          <Stack.Screen name="MovieTrailer" component={MovieTrailer}/>
          <Stack.Screen name="FilmDetails" component={FilmDetails}/>
        </Stack.Navigator>
  );
}

export default function App() {

  return (
    <NavigationContainer>
    <Tab.Navigator
              screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                  let iconName;
                  if (route.name === 'Home') {
                    iconName = focused
                      ? 'ios-search'
                      : 'ios-search-outline';
                  } else if (route.name === 'Favories') {
                    iconName =  'ios-heart';
                  }
                  return <Ionicons name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
              })}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Favories" component={Favories} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

const styles = StyleSheet.create(
{
  container: {

  }
}
)