import React from 'react';
import {Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from './src/screens/Login';
import Otp from './src/screens/Otp';
import {CountryModalProvider} from 'react-native-country-picker-modal';
import {Provider} from 'react-redux';
import store from './src/store';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
      <CountryModalProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Login"
              options={{headerShown: false}}
              component={Login}
            />
            <Stack.Screen
              name="Otp"
              options={{headerShown: false}}
              component={Otp}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </CountryModalProvider>
    </Provider>
  );
};

export default App;
