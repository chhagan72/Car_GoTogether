import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Touchable,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import moment from 'moment';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { black, lWhite } from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function BookingList(props) {
  const data = useSelector(state => state.searchData.value);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log('data', JSON.stringify(data, null, 2));
  });

  // let data1 = {
  //   start: moment('2024-09-28T15:00:00'),
  //   end: moment('2024-09-29T15:00:00'),
  // };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: black,
        flexDirection: 'column',
      }}>
      <ScrollView
        style={{
          padding: 10,
        }}>
        {data?.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={async () => {
                await AsyncStorage.setItem(
                  'selectedBooking',
                  JSON.stringify(item),
                );

                props.navigation.navigate('FinalBooking');
              }}>
              <ListComponent data={item} />
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
}

const ListComponent = ({ data }) => {
  return (
    <View
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
        <Text style={styles.text}>{moment().format('DD MMMM YYYY')}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text}>{data?.origin}</Text>
        <Text style={styles.text}>
          -----------
          {moment(data?.arrival_time).diff(
            moment(data?.departure_time),
            'hours',
          )}{' '}
          hrs ----------
        </Text>
        <Text style={styles.text}>{data?.destination}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
        }}>
        <Text style={styles.text}>
          Available Seats :{data?.available_seats}
        </Text>

        <Text style={styles.text}>Price Per Seat : {data?.price_per_seat}</Text>
      </View>

      {/* User details */}
      {/* <View
        style={{
          marginTop: 10,
          padding: 10,
          backgroundColor: '#f0f0f0',
          borderRadius: 10,
        }}>
        <Text style={styles.text}>User Name: {data?.username || 'N/A'}</Text>
        <Text style={styles.text}>Email: {data?.email || 'N/A'}</Text>
        <Text style={styles.text}>Mobile: {data?.mobile || 'N/A'}</Text>
      </View>
    </View> */}
    </View >

    
  );
};

const styles = StyleSheet.create({
  text: {
    color: black,
    fontFamily: 'Fontspring-DEMO-tt_fors_medium',
    fontWeight: 'bold',
  },
});
