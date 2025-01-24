import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Touchable,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { Avatar } from 'react-native-paper';
import { useDispatch, useSelector } from 'react-redux';
import { black, lWhite, white, red } from '../Color';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../redux/actions/loginActions';

export default function UserDetails(props) {
    // const data = useSelector(state => state.searchData.value);
    const loginData = useSelector(state => state.loginData.value);

    const dispatch = useDispatch();
    // const navigation = useNavigation();

    // useEffect(() => {
    //     console.log('data', JSON.stringify(data, null, 2));
    // });
    // const handleLogout = async () => {
    //     try {
    //         // Clear token or any stored data
    //         await AsyncStorage.removeItem('token');
    //         dispatch(logout()); // Clear Redux state if necessary
    //         navigation.replace('Home'); // Navigate to the Home screen
    //     } catch (error) {
    //         console.error('Error during logout:', error);
    //     }
    // };

    return (
        <>
            <View
                style={{
                    flex: 1,
                    backgroundColor: black,
                    flexDirection: 'column',
                    alignItems: "center",
                    // justifyContent: "center",



                }}>
                <View
                    style={{
                        height: 150,
                        width: '100%',
                        // backgroundColor: red,    
                        flexDirection: 'row',
                        width: '100%',
                        alignItems: "center",
                        justifyContent: "center",




                    }}>
                        
                    <Avatar.Image
                        size={100}
                        source={require('../../assets/images/ck.jpg')}
                    />
                    {/* <Text
                    style={{
                        color: lWhite,
                        fontSize: 20,

                    }}
                >User Details</Text> */}
                </View>
                <View
                    style={{
                        height: 300,
                        width: '90%',
                        backgroundColor: lWhite,
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 10,
                        borderRadius: 20,
                    }}>


                    <View
                        style={{
                            // height: 50,
                            width: '90%',
                            backgroundColor: lWhite,
                            flexDirection: 'row',
                            width: '100%',
                            padding: 5,



                        }}>
                        <View>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                    fontWeight: 'bold',

                                }}>
                                User Name
                            </Text>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                }}>
                                {loginData?.userData?.name}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 80,
                            width: '100%',
                            // backgroundColor: red,
                            flexDirection: 'row',
                            width: '100%',
                            // alignItems: "center",
                            // justifyContent: "center",
                            marginTop: 10,
                            padding: 5,



                        }}>
                        <View>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                    fontWeight: 'bold',

                                }}>
                                User Email
                            </Text>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                }}>
                                {loginData?.userData?.email}
                            </Text>
                        </View>
                    </View>
                    <View
                        style={{
                            height: 80,
                            width: '100%',
                            // backgroundColor: red,
                            flexDirection: 'row',
                            width: '100%',
                            marginTop: 15,
                            padding: 5,


                        }}>
                        <View>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                    fontWeight: 'bold',

                                }}>
                                User Mobile
                            </Text>
                            <Text
                                style={{
                                    color: black,
                                    fontSize: 20,
                                }}>
                                {loginData?.userData?.phone_number}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>
            <TouchableOpacity
            style={{
              backgroundColor: black,
              padding: 10,
              borderRadius: 5,
              margin: 10,
            }}
            onPress={() => props.navigation.navigate('Home')}>
            <Text
              style={{
                color: white,
                fontFamily: 'normalText',
                fontWeight: 'bold',
                textAlign: 'center',
              }}>
              LogOut
            </Text>
          </TouchableOpacity>
            {/* <View>
                <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                    <Text style={styles.logoutButtonText}>Logout</Text>
                </TouchableOpacity>
            </View> */}
        </>
    );
}