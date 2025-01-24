import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useEffect, useState } from "react";
import { PostRequestCall } from "../apicall/PostReq";
import { black, lWhite, white } from "./Color";
import Toast from "react-native-toast-message";
import { useSelector } from "react-redux";

export default function OtpVerification(props) {
  const [timeOut, setTimeOut] = useState(30);
  const [otp, setOTP] = useState("");
  const Remail = useSelector((state) => state.emailData.value);

  useEffect(() => {
    console.log("email , ");
    const interval = setInterval(() => {
      setTimeOut(timeOut == 0 ? "" : timeOut - 1);
    }, 1000);
    return () => clearInterval(interval);
  }, [timeOut]);

  const handleOTPverification = async () => {
    let data = JSON.stringify({
      email: Remail,
      otp: String(otp),
    });

    const res = await PostRequestCall("api/auth/verify-otp", data, "", false);

    if (res.status === 200 || res.status === 201) {
      Toast.show({
        type: "success",
        text1: "OTP Verified",
        text2: "Redirecting to Login Page",
      });
      setTimeOut(() => {
        props.navigation.navigate("Login");
      }, 4000);
    }
    console.log(JSON.stringify(res, null, 2));
  };
  return (
    <View
      style={{
        backgroundColor: black,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          //   height: 400,
          width: "90%",
          backgroundColor: 'rgba(52, 52, 52, 0.8)',
          marginTop: 160,
          borderRadius: 25,
          padding: 20,
          // paddingTop: 10,
          // paddingBottom: 10,
          // paddingLeft: 20,
          // paddingRight: 20,
          flexDirection: "column",
          justifyContent: "space-around",
          height: 220,
        }}
      >
        <TextInput
          placeholder="Enter OTP"
          maxLength={6}
          keyboardType="numeric"
          onChangeText={(otp) => setOTP(otp)}
          style={styles.TextInput}
        ></TextInput>

        <TouchableOpacity
          onPress={() => {
            handleOTPverification();
          }}
        >
          <Text
            style={{
              backgroundColor: lWhite,
              padding: 15,
              borderRadius: 10,
              // marginTop: 10,
              textAlign: "center",
              fontFamily: "normalText",
              fontWeight: "bold",
              fontSize: 17,
              color: black,
            }}
          >
            Verify OTP
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate("Register");
            }}
          >
            <Text
              style={{
                // marginTop: 10,
                textAlign: "center",
                fontFamily: "normalText",
                fontWeight: "bold",
                fontSize: 17,
                color: lWhite,
                textDecorationLine: "underline",
              }}
            >
              Back
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            disabled={timeOut !== "" ? true : false}
            onPress={() => {
              setTimeOut(30);
            }}
          >
            <Text
              style={{
                // marginTop: 10,
                textAlign: "center",
                fontFamily: "normalText",
                fontWeight: "bold",
                fontSize: 17,
                color: lWhite,
                textDecorationLine: "underline",
              }}
            >
              {timeOut} Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  TextInput: {
    borderRadius: 10,
    // width: "90%",
    height: 60,
    backgroundColor: white,
    // marginLeft: "auto",
    // marginRight: "auto",
    // marginTop: 10,
    color: "black",
    padding: 20,
    fontFamily: "Fontspring-DEMO-tt_fors_display_medium",
    fontWeight: "bold",
    fontSize: 17,
  },
});
