import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { PostRequestCall } from "../apicall/PostReq";
import { black, lWhite, white } from "./Color";
import { useDispatch, useSelector } from "react-redux";
import { setEmailRedux } from "../redux/features/data/DataSlice";

export default function Register(props) {
  const dispatch = useDispatch();
  const Remail = useSelector((state) => state.emailData.value);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [toggleOTP, setToggleOTP] = useState(true);
  const [age, setAge] = useState("20");

  const [otp, setOTP] = useState(null);

  const handleRegister = async () => {
    let data = JSON.stringify({
      name: fullName,
      email: email,
      phone_number: phone,
      password: password,
    });
    console.log(data);
    dispatch(setEmailRedux(email));

    const res = await PostRequestCall("api/auth/register", data, "", false);
    console.log(JSON.stringify(res, null, 2));
    if (res.status === 201) {
      props.navigation.navigate("verifyOTP");
    }
  };

  return (
    <View
      style={{
        backgroundColor: white,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View
        style={{
          //   height: 400,
          width: "90%",
          backgroundColor: lWhite,
          marginTop: 160,
          borderRadius: 25,
          padding: 20,
          // paddingTop: 10,
          // paddingBottom: 10,
          // paddingLeft: 20,
          // paddingRight: 20,
          flexDirection: "column",
          justifyContent: "space-around",
          height: 400,
        }}
      >
        <TextInput
          placeholderTextColor={black}
          placeholder="Full Name"
          onChangeText={(text) => {
            setFullName(text);
          }}
          style={styles.TextInput}
        ></TextInput>
        <TextInput
          placeholderTextColor={black}
          placeholder="Email"
          onChangeText={(email) => {
            setEmail(email);
          }}
          style={styles.TextInput}
        ></TextInput>
        <TextInput
          placeholderTextColor={black}
          placeholder="Phone"
          onChangeText={(text) => {
            setPhone(text);
          }}
          style={styles.TextInput}
        ></TextInput>
        <TextInput
          placeholderTextColor={black}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text) => {
            setPassword(text);
          }}
          style={styles.TextInput}
        ></TextInput>

        <TouchableOpacity
          onPress={() => {
            handleRegister();
          }}
        >
          <Text
            style={{
              backgroundColor: black,
              padding: 15,
              borderRadius: 10,
              // marginTop: 10,
              textAlign: "center",
              fontFamily: "normalText",
              fontWeight: "bold",
              fontSize: 17,
              color: white,
            }}
          >
            Register
          </Text>
        </TouchableOpacity>
      </View>
    </View>
    // <View>
    //   {toggleOTP ? (
    //     <>
    //       <View
    //         style={{
    //           flexDirection: "column",
    //           // backgroundColor: "#ffffff",
    //           backgroundColor: lWhite,
    //           marginLeft: "auto",
    //           marginRight: "auto",
    //           width: "90%",
    //           padding: 20,
    //           height: "50%",
    //           borderRadius: 20,
    //           justifyContent: "space-around",
    //           alignItems: "center",
    //         }}
    //       >
    //         <View>
    //           <Text
    //             style={{
    //               fontSize: 50,
    //               fontWeight: "bold",
    //               color: "#5ab33f",
    //             }}
    //           >
    //             Welcome
    //           </Text>
    //           <Text
    //             style={{
    //               fontSize: 20,
    //               color: "#28a691",
    //             }}
    //           >
    //             Register new account
    //           </Text>

    //           <TextInput
    //             placeholder="Email"
    //             onChangeText={(email) => setEmail(email)}
    //             style={{
    //               borderRadius: 10,
    //               // width: "90%",
    //               height: 60,
    //               backgroundColor: white,
    //               // marginLeft: "auto",
    //               // marginRight: "auto",
    //               // marginTop: 10,
    //               color: "black",
    //               padding: 20,
    //               fontFamily: "Fontspring-DEMO-tt_fors_display_medium",
    //               fontWeight: "bold",
    //               fontSize: 17,
    //             }}
    //           />

    //           <TextInput
    //             onChangeText={(phone) => setPhone(phone)}
    //             style={{
    //               borderRadius: 10,
    //               // width: "90%",
    //               height: 60,
    //               backgroundColor: white,
    //               // marginLeft: "auto",
    //               // marginRight: "auto",
    //               // marginTop: 10,
    //               color: "black",
    //               padding: 20,
    //               fontFamily: "Fontspring-DEMO-tt_fors_display_medium",
    //               fontWeight: "bold",
    //               fontSize: 17,
    //             }}
    //           />

    //           <TextInput
    //             onChangeText={(pass) => setPassword(pass)}
    //             secureTextEntry={true}
    //             style={{
    //               borderRadius: 10,
    //               // width: "90%",
    //               height: 60,
    //               backgroundColor: white,
    //               // marginLeft: "auto",
    //               // marginRight: "auto",
    //               // marginTop: 10,
    //               color: "black",
    //               padding: 20,
    //               fontFamily: "Fontspring-DEMO-tt_fors_display_medium",
    //               fontWeight: "bold",
    //               fontSize: 17,
    //             }}
    //           />
    //         </View>
    //       </View>
    //       <View>
    //         <View>
    //           <TouchableOpacity
    //             onPress={() => {
    //               handleRegister();
    //             }}
    //             style={{
    //               display: "flex",
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 backgroundColor: "#5ab33f",
    //                 color: "#ffffff",
    //                 alignSelf: "center",
    //                 fontSize: 20,
    //                 textAlign: "center",
    //                 marginTop: 30,
    //                 marginLeft: "auto",
    //                 marginRight: "auto",
    //                 width: 200,
    //                 justifyContent: "center",
    //                 borderRadius: 30,
    //                 padding: 10,
    //               }}
    //             >
    //               Get Started
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </>
    //   ) : (
    //     <>
    //       <View
    //         style={{
    //           marginTop: 30,
    //           marginLeft: "auto",
    //           marginBottom: 30,
    //           marginRight: "auto",
    //           alignItems: "center",
    //         }}
    //       >
    //         <Text
    //           style={{
    //             fontSize: 50,
    //             fontWeight: "bold",
    //             color: "#5ab33f",
    //           }}
    //         >
    //           Welcome
    //         </Text>
    //         <Text
    //           style={{
    //             fontSize: 20,
    //             color: "#28a691",
    //           }}
    //         >
    //           Verify your account
    //         </Text>
    //       </View>
    //       <View>
    //         <View>
    //           <Text style={styles.Text}>Enter the OTP</Text>
    //           <View
    //             style={{
    //               display: "flex",
    //               flexDirection: "row",
    //               // justifyContent: "center",
    //               // alignItems: "center",
    //               width: 304,
    //               height: 50,
    //               backgroundColor: "#f6fcf8",
    //               borderWidth: 1,
    //               borderColor: "#cacaca",
    //               borderRadius: 10,
    //               marginLeft: 50,
    //               paddingLeft: 10,
    //               marginTop: 10,
    //               paddingRight: 10,
    //             }}
    //           >
    //             <TextInput
    //               maxLength={6}
    //               keyboardType="numeric"
    //               onChangeText={(otp) => setOTP(otp)}
    //               style={{
    //                 fontSize: 20,
    //                 width: "100%",
    //                 color: "#000000",
    //               }}
    //             />
    //           </View>
    //         </View>

    //         <View>
    //           <TouchableOpacity
    //             onPress={() => {
    //               handleOTPverification();
    //             }}
    //             style={{
    //               display: "flex",
    //             }}
    //           >
    //             <Text
    //               style={{
    //                 backgroundColor: "#5ab33f",
    //                 color: "#ffffff",
    //                 alignSelf: "center",
    //                 fontSize: 20,
    //                 textAlign: "center",
    //                 marginTop: 30,
    //                 marginLeft: "auto",
    //                 marginRight: "auto",
    //                 width: 200,
    //                 justifyContent: "center",
    //                 borderRadius: 30,
    //                 padding: 10,
    //               }}
    //             >
    //               Verify
    //             </Text>
    //           </TouchableOpacity>
    //         </View>
    //       </View>
    //     </>
    //   )}
    // </View>
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
