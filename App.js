import React, { useState } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import DATA from "./config/Restaurant/DATA";

import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import Loginscreen from "./Screens/auths/Login";
import SignUpScreen from "./Screens/auths/SignUp";
import { persistor, store } from "./redux/store";
import { isLoggedIn } from "./firebase/Author";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createNativeStackNavigator();
const App = () => {
  const [isLogged, setIsLogged] = useState(isLoggedIn());
  React.useEffect(() => {
    const getLocalStorageToken = async () => {
      const token = await AsyncStorage.getItem("token");
      return setIsLogged(token);
    }
    getLocalStorageToken();
  }, [])

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          {isLogged !== null ? (
            <Stack.Navigator>
              <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          ) : (
            <Stack.Navigator>
              <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
              <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
            </Stack.Navigator>
          )
          }
        </NavigationContainer>
      </PersistGate>
    </Provider>
  )
};

export default App;
