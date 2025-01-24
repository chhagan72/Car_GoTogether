import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Button,
  StyleSheet,
  ImageBackground,
  KeyboardAvoidingView,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {Avatar, Modal} from 'react-native-paper';
import {black, green, lWhite, white} from '../Color';
import {useDispatch, useSelector} from 'react-redux';
import {PostRequestCall} from '../../apicall/PostReq';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function CreateRide(props) {
  const loginData = useSelector(state => state.loginData.value);
  const dispatch = useDispatch();

  const [openDeparture, setOpenDeparture] = useState(false);
  const [openArrival, setOpenArrival] = useState(false);
  const [open, setOpen] = useState(false);
  const [confirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState({
    passengerCount: 1,
    leavingForm: '',
    goingTo: '',
    date: '',
    departureTime: '',
    arrivalTime: '',
    pricePerSeat: 0,
  });

  const handleCreateRide = async () => {
    console.log('data', data);

    let obj = {
      driver_id: await AsyncStorage.getItem('userID'),
      vehicle_id: '1234',
      origin: data?.leavingForm,
      destination: data.goingTo,
      departure_time: data.departureTime,
      arrival_time: data.arrivalTime,
      price_per_seat: data.pricePerSeat,
      available_seats: data.passengerCount,
    };

    let data1 = JSON.stringify(obj);

    let res = await PostRequestCall(
      'api/rides/create',
      data1,
      await AsyncStorage.getItem('token'),
      false,
    );
    console.log('res', JSON.stringify(res, null, 2));
  };

  return (
    <View
      style={{
        backgroundColor: white,
        flex: 1,
        alignItems: 'center',
      }}>
      {/* <View
        style={{
          flexDirection: 'row',
          width: '90%',
          padding: 5,
          backgroundColor: lWhite,
          alignItems: 'center',
          borderRadius: 20,
          marginTop: 10,
        }}>
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            alignItems: 'center',
          }}>
        <Avatar.Image
            size={50}
            source={{ uri: loginData?.userData?.profile_pic }}
          /> 
          <Text
            style={{
              fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
              fontWeight: 'bold',
             fontSize : 14,
              color: black,
            }}>
          {loginData.userData.name}
          </Text>
        </View>
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
      </View> */}

      <KeyboardAvoidingView
        style={{
          flex: 1,
          width: '100%',
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
            placeholderTextColor={'#8e8e8e'}
            placeholder="From"
            onChangeText={text => {
              setData({...data, leavingForm: text});
            }}
            style={{...styles.TextInput, marginTop: 0}}></TextInput>

          <TouchableOpacity
            style={{
              marginTop: 10,
              justifyContent: 'center',
            }}
            onPress={() => setOpenDeparture(true)}>
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
                  color: data.departureTime ? black : '#8e8e8e',
                }}>
                {data.departureTime
                  ? moment(data?.departureTime).format('hh:mm A')
                  : 'Departure Time'}
              </Text>
              <ImageBackground
                source={require('../../assets/images/timeIcon.png')}
                style={{width: 30, height: 30}}></ImageBackground>
            </View>
          </TouchableOpacity>
          <DatePicker
            mode="time"
            modal
            open={openDeparture}
            date={data.departureTime || new Date()}
            onConfirm={date => {
              setOpenDeparture(false);
              setData({...data, departureTime: date});
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TextInput
            placeholderTextColor={'#8e8e8e'}
            placeholder="To"
            onChangeText={text => {
              setData({...data, goingTo: text});
            }}
            style={styles.TextInput}></TextInput>
          <TouchableOpacity
            style={{
              marginTop: 10,
            }}
            onPress={() => setOpenArrival(true)}>
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
                  color: data.arrivalTime ? black : '#8e8e8e',
                }}>
                {data.arrivalTime
                  ? moment(data?.arrivalTime).format('hh:mm A')
                  : 'Arrival Time'}
              </Text>
              <ImageBackground
                source={require('../../assets/images/timeIcon.png')}
                style={{width: 30, height: 30}}></ImageBackground>
            </View>
          </TouchableOpacity>
          <DatePicker
            mode="time"
            modal
            open={openArrival}
            date={data.arrivalTime || new Date()}
            onConfirm={date => {
              setOpenArrival(false);
              setData({...data, arrivalTime: date});
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
                setData({...data, passengerCount: data.passengerCount - 1});
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
                {data?.passengerCount} Passanger
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
                if (data?.passengerCount == 4) {
                  return;
                }
                setData({...data, passengerCount: data.passengerCount + 1});
              }}>
              <ImageBackground
                source={require('../../assets/images/add.png')}
                style={{width: 50, height: 50}}></ImageBackground>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => setOpen(true)}>
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
                  color: data.date ? black : '#8e8e8e',
                }}>
                {data.date != ''
                  ? moment(data?.date).format('hh:mm A')
                  : 'Select Date'}
              </Text>
              <ImageBackground
                source={require('../../assets/images/dateIcon.png')}
                style={{width: 30, height: 30}}></ImageBackground>
            </View>
          </TouchableOpacity>
          <TextInput
            placeholderTextColor={'#8e8e8e'}
            placeholder="Rs per seat"
            onChangeText={text => {
              setData({...data, pricePerSeat: text});
            }}
            style={{...styles.TextInput}}></TextInput>

          <DatePicker
            mode="date"
            modal
            open={open}
            date={data.date || new Date()}
            onConfirm={date => {
              setOpen(false);
              setData({...data, date: date});
            }}
            onCancel={() => {
              setOpen(false);
            }}
          />
          <TouchableOpacity
            disabled={
              data.leavingForm == '' ||
              data.goingTo == '' ||
              data.date == '' ||
              data.departureTime == '' ||
              data.arrivalTime == '' ||
              data.pricePerSeat == 0
            }
            onPress={() => {
              // handleCreateRide();
              setConfirmModal(true);
            }}>
            <Text
              style={{
                backgroundColor:
                  data.leavingForm == '' ||
                  data.goingTo == '' ||
                  data.date == '' ||
                  data.departureTime == '' ||
                  data.arrivalTime == '' ||
                  data.pricePerSeat == 0
                    ? '#8e8e8e'
                    : black,
                padding: 15,
                borderRadius: 10,
                marginTop: 10,
                textAlign: 'center',
                fontFamily: 'normalText',
                fontWeight: 'bold',
                fontSize: 14,
                color: white,
              }}>
              Publish Ride
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
      <Modal
        visible={confirmModal}
        onDismiss={() => setConfirmModal(false)}
        contentContainerStyle={{
          backgroundColor: white,
          padding: 20,
          borderRadius: 10,
          width: '80%',
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <View>
          <Text
            style={{
              color: black,
            }}>
            {`From : ${data.leavingForm}\nFrom Time : ${moment(
              data?.departureTime,
            ).format('hh:mm A')}`}
          </Text>
          <Text
            style={{
              color: black,
            }}>
            {`To : ${data.goingTo} \nTo Time : ${moment(
              data?.departureTime,
            ).format('hh:mm A')}`}
          </Text>
          <Text
            style={{
              color: black,
            }}>
            {`Date : ${moment(data?.date).format('DD-MM-YYYY')}`}
          </Text>
          <Text
            style={{
              color: black,
            }}>
            {`Rs Per seat : ${data.pricePerSeat}`}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: 10,
          }}>
          <TouchableOpacity
            onPress={() => {
              setConfirmModal(false);
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
              handleCreateRide();
              setConfirmModal(false);
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
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderRadius: 10,
    height: 50,
    backgroundColor: white,
    marginTop: 10,
    color: 'black',
    padding: 10,
    fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
    fontWeight: 'bold',
    fontSize: 14,
  },
});
