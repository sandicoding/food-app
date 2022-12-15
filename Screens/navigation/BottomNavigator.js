import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialIcons as Icon, AntDesign } from '@expo/vector-icons';
import COLORS from '../../consts/colors';
import { View } from 'react-native';
import HomeScreen from '../Restaurant/HomeScreen';
import CartScreen from '../Restaurant/CartScreen';
import Profile from '../Restaurant/Profile';
import Transaction from '../Restaurant/Transaction';
import { useSelector } from 'react-redux';
import HomeStalls from '../Restaurant/HomeStalls';
import IncomingOrder from '../Restaurant/IncomingOrder';
import FoodStells from '../Restaurant/FoodStells';

const Tab = createBottomTabNavigator();

const BottomNavigator = () => {
  const authState = useSelector((state) => state.auth);
  const { user } = authState;

  console.log(user)

  return (
    <Tab.Navigator
      screenOptions={{
        style: {
          height: 55,
          borderTopWidth: 0,
          elevation: 0,
        },
        showLabel: false,
        headerShown: false,
        activeTintColor: COLORS.primary,
      }}>
      {user?.role === 'warung' ? (
        <Tab.Screen
          name="HomeScreen"
          component={HomeStalls}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home-filled" color={color} size={28} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home-filled" color={color} size={28} />
            ),
          }}
        />
      )}
      {user?.role === 'warung' ? (
        <Tab.Screen
          name="Orders"
          component={IncomingOrder}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="local-mall" color={color} size={28} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Cart"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="shopping-cart" color={color} size={28} />
            ),
          }}
        />
      )}
      {user?.role === 'warung' ? (
        <Tab.Screen
          name="FoodStells"
          component={FoodStells}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="LocalDining" color={color} size={28} />
            ),
          }}
        />
      ) : (
        <Tab.Screen
          name="Transactions"
          component={Transaction}
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="local-mall" color={color} size={28} />
            ),
          }}
        />
      )}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color }) => (
            <AntDesign name="user" color={color} size={28} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigator;
