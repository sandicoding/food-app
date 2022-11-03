import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import DATA from "./config/Restaurant/DATA";

import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import Loginscreen from "./Screens/auths/Login";
import SignUpScreen from "./Screens/auths/SignUp";

const Stack = createNativeStackNavigator();
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  return <NavigationContainer>
    {isLoggedIn ? <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
    </Stack.Navigator> :
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
        <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
      </Stack.Navigator>}
  </NavigationContainer>
};

export default App;
