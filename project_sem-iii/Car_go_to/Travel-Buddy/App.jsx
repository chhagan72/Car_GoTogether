import React, {Component} from 'react';
import Home from './pages/Home';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginPage from './pages/LoginPage';
import Register from './pages/Register';
import Dashboard from './pages/dashboard/Dashboard';
import OtpVerification from './pages/OtpVerification';
import Toast from 'react-native-toast-message';
import store from './redux/app/store';
import {Provider} from 'react-redux';
import CreateRide from './pages/CreateRide/CreateRide';
import BookingList from './pages/bookingList/BookingList';
import FinalBooking from './pages/bookingList/FinalBooking';
import BookingHistory from './pages/bookingList/BookingHistory';
import CancleRide from './pages/bookingList/CancleRide';
import userDetails from './pages/dashboard/userDetails';

function App(props) {
  const Stack = createNativeStackNavigator();

  return (
    <>
      <NavigationContainer>
        <Provider store={store}>
          <Stack.Navigator
            // initialRouteName="CreateRide"
            screenOptions={{
              headerShown: false,
            }}>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Login" component={LoginPage} />
            <Stack.Screen name="Register" component={Register} />
            <Stack.Screen name="Dashboard" component={Dashboard} />
            <Stack.Screen name="verifyOTP" component={OtpVerification} />
            <Stack.Screen name="CreateRide" component={CreateRide} />
            <Stack.Screen name="BookingList" component={BookingList} />
            <Stack.Screen name="FinalBooking" component={FinalBooking} />
            <Stack.Screen name="BookingHistory" component={BookingHistory} />
            <Stack.Screen name="CancleRide" component={CancleRide} />
            <Stack.Screen name="userDetails" component={userDetails} />

          </Stack.Navigator>
        </Provider>
      </NavigationContainer>
      <Toast />
    </>
  );
}

export default App;
