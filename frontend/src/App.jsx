import React from 'react';
import { View } from 'react-native'; // Ensure you've imported View
import Icon from 'react-native-vector-icons/FontAwesome'; // Example, import your icon library here
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomePage from './screens/HomePage';
import UserProfile from './screens/UserProfile';
import AddPost from './screens/AddPost';
import Home from '../assets/home.svg'
import User from '../assets/user.svg'
import Add from '../assets/add-circle.svg'


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Stack navigator for the individual screens
const StackNavigator = () => (
  <Stack.Navigator screenOptions={{
    headerShown: false
  }} >
    <Stack.Screen name="HomePage" component={HomePage} />
    <Stack.Screen name="UserProfile" component={UserProfile} />
    <Stack.Screen name="AddPost" component={AddPost} />
  </Stack.Navigator>
);

const App = () => {
  return (
    <NavigationContainer
      screenOptions={{
        headerShown: false
      }}>
      <Tab.Navigator
      
        screenOptions={{
          tabBarShowLabel: false,
          headerShown: false, activeTintColor: 'blue',
          labelStyle: {
            fontSize: 14
          },
        
        }}
      >
        <Tab.Screen
          name="Home"
          initialParams={{ showHeader: false }}
          component={StackNavigator}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Home width={25} height={25} color={color} />
                {focused && <View style={{ width: 30, height: 2, backgroundColor: 'black' }} />}
              </View>
            ),
          }}
        />

        <Tab.Screen
          name="Add"
          component={AddPost}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center' }}>
                <Add width={25} height={25} color={color} />
                {focused && <View style={{ width: 30, height: 2, backgroundColor: 'black' }} />}
              </View>
            ),
          }}
          initialParams={{ showHeader: false }}
        />

        <Tab.Screen
          name="User"
          component={UserProfile}
          options={{
            tabBarIcon: ({ color, focused }) => (
              <View style={{ alignItems: 'center' }}>
                <User width={25} height={25} color={color} />
                {focused && <View style={{ width: 30, height: 2, backgroundColor: 'black' }} />}
              </View>
            ),
          }}
          initialParams={{ showHeader: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;