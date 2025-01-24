import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ImageBackground,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { PostRequestCall } from '../apicall/PostReq';
import { black, lWhite, white } from './Color';
import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginDataRedux } from '../redux/features/data/DataSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bg from "../assets/images/BG-01.jpg";
import LoginScreen from 'react-native-login-screen';



export default function LoginPage(props) {
  const LoginData = useSelector(state => state.loginData.value);
  const dispatch = useDispatch();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const showTost = (type, text1, text2) => {
    Toast.show({
      type: type || 'error',
      text1: text1 || 'something went wrong',
      text2: text2 || '',
    });
  };

  const handleLogin = async () => {
    await AsyncStorage.clear();

    console.log('email', email);
    try {
      // let data = JSON.stringify({
      //   email: email,
      //   password: password,
      // });
      let data = JSON.stringify({
        email: email || 'chhagankumarkumawat@gmail.com',
        password: password || '52635263',
      });
      const res = await PostRequestCall('api/auth/login', data, '', false);
      // console.log(JSON.stringify(res, null, 4));

      if (res.data.message == 'Invalid credentials') {
        showTost('error', res.data.message);
      }
      if (res.status === 200) {
        showTost('success', 'Login Successfull', 'Redirecting to Dashboard');
        dispatch(setLoginDataRedux(res.data));

        console.log('res', JSON.stringify(res.data, null, 2));

        await AsyncStorage.setItem('userID', res?.data?.userData?._id);
        await AsyncStorage.setItem('name', res.data.userData?.name);
        await AsyncStorage.setItem('email', res.data.userData?.email);
        await AsyncStorage.setItem('number', res.data.userData?.phone_number);
        await AsyncStorage.setItem('token', res.data?.token);
          props.navigation.navigate('Dashboard');
      }
    } catch (e) {
      console.log(e);
      Toast.show({
        type: 'error',
        text1: 'something went wrong',
        text2: '',
      });
    }
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        {/* <View
          style={{
            flex: 1,
            backgroundColor: white,
            // backgroundColor: "#ffdad9",
            alignItems: 'center',
            // justifyContent: "center",
          }}> */}
          <View
            style={{
              flexDirection: 'column',
              backgroundColor: 'rgba(52, 52, 52, 0.8)',
              // backgroundColor: '#ffffff',
              // backgroundColor: lWhite,
              marginTop: 20,
              width: '90%',
              padding: 20,
              borderRadius: 20,
            }}>
            <View
              style={{
                marginLeft: 'auto',
                marginBottom: 30,
                marginRight: 'auto',
                alignItems: 'center',
              }}>
              <Text
                style={{
                  fontSize: 45,
                  height: 60,
                  color: lWhite,
                  fontFamily: 'Fontspring-DEMO-tt_fors_black',
                }}>
                Login
              </Text>
              <Text
                style={{
                  fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                  fontWeight: 'bold',
                  fontSize: 17,
                  color: lWhite,
                }}>
                Login to your account
              </Text>
            </View>
            <TextInput
              placeholderTextColor={black}
              placeholder="Email"
              onChangeText={email => setEmail(email)}
              style={{
                borderRadius: 10,
                // width: "90%",
                height: 60,
                backgroundColor: white,
                // marginLeft: "auto",
                // marginRight: "auto",
                marginTop: 10,
                color: 'black',
                padding: 20,
                fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                fontWeight: 'bold',
                fontSize: 17,
              }}
            />

            <TextInput
              placeholderTextColor={black}
              placeholder="Password"
              onChangeText={pass => setPassword(pass)}
              secureTextEntry={true}
              style={{
                borderRadius: 10,
                // width: "90%",
                height: 60,
                backgroundColor: white,
                // marginLeft: "auto",
                // marginRight: "auto",
                marginTop: 10,
                color: black,
                padding: 20,
                fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                fontWeight: 'bold',
                fontSize: 17,
              }}
            />

            <TouchableOpacity
              onPress={() => {
                // props.navigation.navigate("Login")
                handleLogin();
              }}
              style={{
                backgroundColor: lWhite,
                padding: 5,
                borderRadius: 10,
                marginTop: 10,
                justifyContent: 'center',
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontFamily: 'Fontspring-DEMO-tt_fors_display_medium',
                  fontWeight: 'bold',
                  backgroundColor: lWhite,
                  color: black,
                  fontSize: 17,
                  padding: 10,
                }}>
                Login
              </Text>
            </TouchableOpacity>
          </View>
        {/* </View> */}
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    // display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    flex: 1,
    backgroundColor: lWhite,
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 504,
    borderRadius: 10,
  },
  signUp: {
    marginTop: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    width: 10,
    height: 50,
    backgroundColor: 'rgba(5,70,82,1)',
    borderRadius: 10,
  },

  Text: {
    fontFamily: 'helvetica-regular',
    // fontWeight: "bold",
    backgroundColor: lWhite,
    color: 'rgba(5,70,82,1)',
    width: 304,
    fontSize: 20,
    // textAlign: "center",
    marginTop: 10,
    marginLeft: 50,
    // marginRight: "auto",
  },

  // image: {
  //   flex: 1,
  //   width: '100%',
  //   height: '100%',
  //   display: 'flex',
  // },
});
