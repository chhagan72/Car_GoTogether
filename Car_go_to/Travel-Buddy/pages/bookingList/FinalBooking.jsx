import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Avatar} from 'react-native-paper';
import {black, green, lWhite, white} from '../Color';
import {useDispatch, useSelector} from 'react-redux';
import {PostRequestCall} from '../../apicall/PostReq';
import {setSerachRideData} from '../../redux/features/data/DataSlice';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export default function FinalBooking(props) {
  const [ride, setRide] = useState({});

  const [ passengerCount, setPassengerCount] = useState(1);

  useEffect(() => {
    getDataforSelectedBooking();
  }, []);

  const getDataforSelectedBooking = async () => {
    try {
      const value = await AsyncStorage.getItem('selectedBooking');
      if (value !== null) {
        console.log(JSON.stringify(JSON.parse(value), null, 2));

        let rideData = JSON.parse(value);
        setRide(rideData);

        console.log('rideData', JSON.stringify(rideData, null, 2));
        setData({
          _id: rideData?._id,
          driver_id: rideData?.driver_id,
          vehicle_id: rideData?.vehicle_id,
          origin: rideData?.origin,
          destination: rideData?.destination,
          departure_time: rideData?.departure_time,
          price_per_seat: rideData?.price_per_seat,
          arrival_time: rideData?.arrival_time,
          available_seats: rideData?.available_seats,
        });
      }
    } catch (error) {
      console.log('error', error);
    }
  };
  
  const BookRide = async () => {
    try {
      let obj = {
        user_id: await AsyncStorage.getItem('userID'),
        ride_id: ride?._id,
        seats: passengerCount,
        rideData: ride,
      };

      console.log('objakfjlslkjdfljn', JSON.stringify(obj, null, 2));
      const res = await PostRequestCall(
        'api/bookings/create',
        JSON.stringify(obj),
        await AsyncStorage.getItem('token'),
        false,
      );

      console.log('resbooking', JSON.stringify(res, null, 2));

      Toast.show({
        type: 'success',
        text1: 'Ride Booked Successfully',
      });
      props.navigation.navigate('Dashboard');
    } catch (error) {
      console.log('error', error);
    }
  };

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    passengerCount: 1,
    leavingForm: '',
    goingTo: '',
    date: new Date(),
  });
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
      }}>
      <View
        style={{
          width: '90%',
          backgroundColor: lWhite,
          marginTop: 70,
          borderRadius: 15,
          padding: 10,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}>
        <TextInput
          placeholderTextColor={black}
          value={data?.origin}
          onChangeText={text => {
            setData({...data, leavingForm: text});
          }}
          style={{...styles.TextInput, marginTop: 0}}></TextInput>
        <TextInput
          placeholderTextColor={black}
          value={data?.destination}
          onChangeText={text => {
            setData({...data, goingTo: text});
          }}
          style={{...styles.TextInput, marginTop: 10}}></TextInput>
        <TouchableOpacity
        disabled={true}
          style={{
            marginTop: 10,
            justifyContent: 'center',
          }}
          onPress={() => setOpen(true)}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: 10,
              borderRadius: 10,
              backgroundColor: white,
              width: '100%',
              height: 50,
            }}>
            <Text
              style={{
                fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                fontWeight: 'bold',
                fontSize: 14,
                color: black,
              }}>
              {moment(data?.departure_time).format('DD MMMM, YYYY')}
            </Text>
            <ImageBackground
              source={require('../../assets/images/dateIcon.png')}
              style={{width: 30, height: 30}}></ImageBackground>
          </View>
        </TouchableOpacity>
        <DatePicker
          mode="date"
          modal
          open={open}
          date={date}
          onConfirm={date => {
            setOpen(false);
            setData({...data, date: date});
          }}
          onCancel={() => {
            setOpen(false);
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            gap: 25,
            alignItems: 'center',
            justifyContent: 'space-evenly',
            borderColor: black,
            borderWidth: 1,
            borderRadius: 10,
            marginTop: 10,
            marginBottom: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              if (passengerCount == 1) {
                return;
              }
              setPassengerCount(prev => prev - 1);
            }}>
            <ImageBackground
              source={require('../../assets/images/remove.png')}
              style={{width: 50, height: 50}}></ImageBackground>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                fontWeight: 'bold',
                fontSize: 14,
                color: black,
              }}>
              {passengerCount} Passanger
            </Text>
            {data?.passengerCount == 1 ? (
              <ImageBackground
                source={require('../../assets/images/person.png')}
                style={{width: 30, height: 30}}></ImageBackground>
            ) : (
              <ImageBackground
                source={require('../../assets/images/group.png')}
                style={{width: 30, height: 30}}></ImageBackground>
            )}
          </View>
          <TouchableOpacity
            onPress={() => {
              if (passengerCount == data?.available_seats) {

                Toast.show({
                    type: 'error',
                    text1: `${data?.available_seats} seats are available`,
                });
                return;
              }
              setPassengerCount(prev => prev + 1);
            }}>
            <ImageBackground
              source={require('../../assets/images/add.png')}
              style={{width: 50, height: 50}}></ImageBackground>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            BookRide();
          }}>
          <Text
            style={{
              backgroundColor: black,
              padding: 15,
              borderRadius: 10,
              // marginTop: 10,
              textAlign: 'center',
              fontFamily: 'normalText',
              fontWeight: 'bold',
              fontSize: 14,
              color: white,
            }}>
            Book Ride
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderRadius: 10,
    height: 50,
    backgroundColor: white,
    color: 'black',
    padding: 10,
    fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
