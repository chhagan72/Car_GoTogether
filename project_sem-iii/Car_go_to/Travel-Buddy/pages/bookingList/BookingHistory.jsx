import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {Avatar, Modal} from 'react-native-paper';
import {useDispatch, useSelector} from 'react-redux';
import {black, green, lWhite, white} from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PostRequestCall} from '../../apicall/PostReq';

import {Pressable} from 'react-native';

export default function BookingHistory(props) {
  const data = useSelector(state => state.searchData.value);
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);
  const [bookingData, setBookingData] = useState([]);
  const [selectedData, setSelectedData] = useState({});

  useEffect(() => {
    getUserBookings();
  }, []);

  const cancleRIde = async () => {
    let obj = JSON.stringify({
      booking_id: selectedData?._id,
    });

    const res = await PostRequestCall(
      'api/bookings/cancle',
      obj,
      await AsyncStorage.getItem('token'),
      false,
    );
    getUserBookings();
    setModalVisible(false);
  };

  const getUserBookings = async () => {
    try {
      let payload = {
        userId: await AsyncStorage.getItem('userID'),
      };

      const res = await PostRequestCall(
        'api/bookings/user',
        payload,
        await AsyncStorage.getItem('token'),
        false,
      );

      console.log('restesting', JSON.stringify(res.data, null, 2));
      setBookingData(res.data?.temp);
    } catch (error) {
      console.log('errordghsdghsdh', error, null, 2);
    }
  };
  return (
    <>
      <View
        style={{
          height: '100%',
        }}>
        <ScrollView>
          <View>
            {bookingData?.map((item, index) => {
              return (
                <>
                  <ListComponent
                    data={item}
                    key={index}
                    props={props}
                    setData={setSelectedData}
                    setShow={setModalVisible}
                  />
                </>
              );
            })}
          </View>
        </ScrollView>
      </View>
      <Modal
        animationType="slide"
        // transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View
          style={{
            backgroundColor: white,
            padding: 20,
            width: '80%',
            height: '50%',
            borderRadius: 10,
            alignItems: 'center',
            justifyContent: 'center',
            alignSelf: 'center',
          }}>
          <View>
            <Text
              style={{
                backgroundColor: white,
                padding: 20,
                marginBottom: 10,
                fontWeight: 'bold',
                fontSize: 20,
              }}>
              Are you sure you want to cancle this ride ?
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
                setModalVisible(!modalVisible);
              }}
              style={{
                backgroundColor: 'red',
                padding: 20,
                borderRadius: 10,
                width: '50%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: white,
                  fontFamily: 'normalText',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                No
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                cancleRIde();
              }}
              style={{
                backgroundColor: green,
                padding: 20,
                borderRadius: 10,
                width: '50%',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: white,
                  fontFamily: 'normalText',
                  fontWeight: 'bold',
                  fontSize: 24,
                  textAlign: 'center',
                }}>
                Yes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  text: {
    color: black,
    fontFamily: 'Fontspring-DEMO-tt_fors_medium',
    fontWeight: 'bold',
  },
});

const ListComponent = ({data, key, setData, setShow}) => {
  const cancleRIde = async () => {
    let obj = JSON.stringify({
      booking_id: data._id,
    });

    const res = await PostRequestCall(
      'api/bookings/cancle',
      obj,
      await AsyncStorage.getItem('token'),
      false,
    );

    console.log('restesting', JSON.stringify(res?.data, null, 2));
  };

  return (
    <>
      <TouchableOpacity
        key={key}
        onPress={() => {
          setShow(true);
          setData(data);
        }}>
        <View
          key={key}
          style={{
            marginTop: 10,
            padding: 15,
            backgroundColor: lWhite,
            gap: 10,
            borderRadius: 10,
          }}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>Car : Audi</Text>
            {data?.isCancle && (
              <Text style={{...styles.text, color: 'red'}}>Cancled</Text>
            )}
            <Text style={styles.text}>
              {moment(data?.rideData?.departure_time).format('DD MMMM YYYY')}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>{data?.rideData?.origin}</Text>
            <Text style={styles.text}>
              -----------
              {moment(data?.rideData?.arrival_time).diff(
                moment(data?.rideData?.departure_time),
                'hours',
              )}{' '}
              hrs ----------
            </Text>
            <Text style={styles.text}>{data?.rideData?.destination}</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.text}>Available Seats :{data?.seats}</Text>

            <Text style={styles.text}>
              Price Per Seat : {data?.rideData?.price_per_seat}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    </>
  );
};
