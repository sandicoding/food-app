import React, { useState, useEffect } from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider, useDispatch, useSelector } from "react-redux";
import { PersistGate } from 'redux-persist/integration/react';

import RecipeDetailScreen from "./Screens/Restaurant/RecipeDetailScreen";
import HomeScreen from "./Screens/Restaurant/HomeScreen";
import WelcomeScreen from "./Screens/Restaurant/WelcomeScreen";
import Loginscreen from "./Screens/auths/Login";
import SignUpScreen from "./Screens/auths/SignUp";
import { persistor, store } from "./redux/store";
import { isLoggedIn } from "./firebase/Author";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getUserAction, getUserLoggedAction } from "./redux/actions/AuthAction";
import BottomNavigator from "./Screens/navigation/BottomNavigator";
import FormCreateFood from "./Screens/Restaurant/FormCreateFood";

const Stack = createNativeStackNavigator();
const ContainerApp = () => {
    const dispatch = useDispatch();

    const authState = useSelector((state) => state.auth);
    const { isLogged } = authState;

    return (
        <NavigationContainer>
            {isLogged ? (
                <Stack.Navigator initialRouteName="Home">
                    <Stack.Screen name="Home" component={BottomNavigator} options={{ headerShown: false }} />
                    <Stack.Screen name="Form Create Food" component={FormCreateFood} options={{ headerShown: false }} />
                    <Stack.Screen name="Food Detail" component={RecipeDetailScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            ) : (
                <Stack.Navigator>
                    <Stack.Screen name="Login" component={Loginscreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Sign Up" component={SignUpScreen} options={{ headerShown: false }} />
                </Stack.Navigator>
            )
            }
        </NavigationContainer>
    )
}

export default ContainerApp