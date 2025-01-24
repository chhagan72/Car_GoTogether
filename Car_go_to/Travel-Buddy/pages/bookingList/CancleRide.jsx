import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {green, white} from '../Color';
import {PostRequestCall} from '../../apicall/PostReq';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CancleRide(props) {
  const cancleRIde = async () => {
    let data = await AsyncStorage.getItem('cancle');

    data = JSON.parse(data);

    let obj = JSON.stringify({
      booking_id: data._id,
    });

    const res = await PostRequestCall(
      'api/bookings/cancle',
      obj,
      await AsyncStorage.getItem('token'),
      false,
    );

    props.navigation.navigate('BookingHistory');

    console.log('restesting', JSON.stringify(res?.data, null, 2));
  };

  return (
    <>
      <View
        style={{
          backgroundColor: white,
          padding: 20,
          width: '100%',
          height: '100%',
          alignItems: 'center',
          justifyContent: 'center',
          alignSelf: 'center',
        }}>
        <View>
          <Text>Are you sure you want to cancle this ride</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('BookingHistory');
            }}
            style={{
              backgroundColor: 'red',
              padding: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: white,
                fontFamily: 'normalText',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              Cancle
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              cancleRIde();
            }}
            style={{
              backgroundColor: green,
              padding: 10,
              borderRadius: 10,
            }}>
            <Text
              style={{
                color: white,
                fontFamily: 'normalText',
                fontWeight: 'bold',
                fontSize: 14,
              }}>
              Confirm
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
}