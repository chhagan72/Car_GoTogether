import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import DatePicker from 'react-native-date-picker';
import { Avatar } from 'react-native-paper';
import { black, green, lWhite, white } from '../Color';
import { useDispatch, useSelector } from 'react-redux';
import { PostRequestCall } from '../../apicall/PostReq';
import { setSerachRideData } from '../../redux/features/data/DataSlice';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Dashboard(props) {
  const loginData = useSelector(state => state.loginData.value);
  const dispatch = useDispatch();

  const [date, setDate] = useState(new Date());
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    passengerCount: 1,
    leavingForm: '',
    goingTo: '',
    date: new Date(),
  });

  const serarchRide = async () => {
    try {
      let payload = JSON.stringify({
        sortField: 'price_per_seat',
        sortValue: 1,
        origin: data?.leavingForm || 'pune',
        destination: data?.goingTo || 'bhusawal',
      });
      // let payload = JSON.stringify({
      //   sortField: 'price_per_seat',
      //   sortValue: 1,
      //   origin: data?.leavingForm,
      //   destination: data?.goingTo,
      // });

      const res = await PostRequestCall(
        'api/rides/all',
        payload,
        await AsyncStorage.getItem('token'),
        false,
      );
      console.log('res', JSON.stringify(res.data.data, null, 2));
      dispatch(setSerachRideData(res.data.data));
      props.navigation.navigate('BookingList');
    } catch (error) {
      console.log('errordghsdghsdh', error, null, 2);
    }
  };

  return (
    <>
      <View
        style={{
          backgroundColor: white,
          flex: 1,
          alignItems: 'center',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '90%',
            padding: 10,
            backgroundColor: lWhite,
            alignItems: 'center',
            borderRadius: 20,
            marginTop: 10,
          }}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              gap: 10,
              alignItems: 'center',
            }}
            onPress={() => props.navigation.navigate('userDetails')}>
            <Avatar.Image
              on
              size={50}
              source={{
                uri: 'https://media.istockphoto.com/id/691910449/photo/smiling-businessman-with-smart-phone-and-cup.jpg?s=612x612&w=0&k=20&c=xtKhWCfPYZrRjIs3cA_yFnxx3tx8CylnSt9knxib3qk=',
              }}
            />
            <Text
              style={{
                fontFamily: '',
                fontWeight: 'bold',
                fontSize: 14,
                color: black,
              }}>
              {loginData?.userData?.name}
            </Text>
            </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: black,
              padding: 10,
              borderRadius: 5,
              margin: 10,
            }}
            onPress={() => props.navigation.navigate('CreateRide')}>
            <Text
              style={{
                color: white,
                fontFamily: 'normalText',
                fontWeight: 'bold',
              }}>
              Publish a Ride
            </Text>
          </TouchableOpacity>
        </View>

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
            placeholder="Leaving from"
            onChangeText={text => {
              setData({ ...data, leavingForm: text });
            }}
            style={{ ...styles.TextInput, marginTop: 10 }}></TextInput>
          <TextInput
            placeholderTextColor={black}
            placeholder="Going to"
            onChangeText={text => {
              setData({ ...data, goingTo: text });
            }}
            style={{ ...styles.TextInput, marginTop: 10 }}></TextInput>
          <TouchableOpacity
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
                {moment(data?.date).format('DD MMMM, YYYY')}
              </Text>
              <ImageBackground
                source={require('../../assets/images/dateIcon.png')}
                style={{ width: 30, height: 30 }}></ImageBackground>
            </View>
          </TouchableOpacity>
          <DatePicker
            mode="date"
            modal
            open={open}
            date={date}
            onConfirm={date => {
              setOpen(false);
              setData({ ...data, date: date });
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
                if (data?.passengerCount == 1) {
                  return;
                }
                setData({ ...data, passengerCount: data.passengerCount - 1 });
              }}>
              <ImageBackground
                source={require('../../assets/images/remove.png')}
                style={{ width: 50, height: 50 }}></ImageBackground>
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
                {data?.passengerCount} Passanger
              </Text>
              {data?.passengerCount == 1 ? (
                <ImageBackground
                  source={require('../../assets/images/person.png')}
                  style={{ width: 30, height: 30 }}></ImageBackground>
              ) : (
                <ImageBackground
                  source={require('../../assets/images/group.png')}
                  style={{ width: 30, height: 30 }}></ImageBackground>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (data?.passengerCount == 4) {
                  return;
                }
                setData({ ...data, passengerCount: data.passengerCount + 1 });
              }}>
              <ImageBackground
                source={require('../../assets/images/add.png')}
                style={{ width: 50, height: 50 }}></ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              serarchRide();
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
              Search
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.navigate('BookingHistory');
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
          See Booking History
        </Text>
      </TouchableOpacity>
    </>
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
