import React, { useEffect } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";
import { Button } from "@rneui/themed";
import bg from "../assets/images/BG-01.jpg";
import { useDispatch, useSelector } from "react-redux";
function Home(props) {
  const count = useSelector((state) => state.loginData);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(count);
  }, []);
  return (
    <View style={styles.container}>
      <ImageBackground source={bg} resizeMode="cover" style={styles.image}>
        <View
          style={{
            alignItems: "center",
            marginTop: 100,
          }}
        >
          <Text
            style={{
              fontSize: 100,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Car Go 
          </Text>
          <Text
            style={{
              fontSize: 100,
              color: "#ffffff",
              fontWeight: "bold",
            }}
          >
            Together
          </Text>
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "#e2e2e254",
            width: 304,
            height: 50,
            borderRadius: 40,
            marginTop: 100,
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            props.navigation.navigate("Login");
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 18,
              letterSpacing: 2,
              fontWeight: "bold",
            }}
          >
            Sign in
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginTop: 25,
            marginLeft: "auto",
            marginRight: "auto",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            props.navigation.navigate("Register");
          }}
        >
          <Text
            style={{
              color: "#ffffff",
              fontSize: 15,
              letterSpacing: 2,
            }}
          >
            Create an account
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  button: {
    flex: 1,
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: 304,
    borderRadius: 10,
  },
  signUp: {
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
    width: 10,
    height: 50,
    backgroundColor: "rgba(5,70,82,1)",
    borderRadius: 10,
  },

  Text: {
    fontFamily: "helvetica-regular",
    fontWeight: "bold",
    color: "rgba(5,70,82,1)",
    width: 304,
    fontSize: 25,
    textAlign: "center",
    marginTop: 30,
    marginLeft: "auto",
    marginRight: "auto",
  },

  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    display: "flex",
  },
});

export default Home;

// import React from "react";
// import {
//   Image,
//   ImageBackground,
//   StyleSheet,
//   Text,
//   Touchable,
//   TouchableOpacity,
//   View,
// } from "react-native";
// import { Button } from "@rneui/themed";
// import bg from "../assets/images/Bg.jpg";
// import { black, lWhite, white } from "./Color";
// function Home(props) {
//   return (
//     <View style={styles.container}>
//       {/* <ImageBackground source={bg} resizeMode="cover" style={styles.image}> */}
//       {/* <View
//         style={{
//           alignSelf: "center",
//           marginTop: 100,
//         }}
//       >

//       </View> */}

//       <View
//         style={{
//           backgroundColor: lWhite,
//           width: "90%",
//           height: 300,
//           borderRadius: 25,
//           justifyContent: "center",
//           alignItems: "center",

//         }}
//       >
//         <Text
//           style={{
//             // fontSize: 100,
//             color: black,
//             fontWeight: "bold",
//           }}
//         >
//           Travel Buddy
//         </Text>
//       </View>
//       <TouchableOpacity
//         style={{
//           backgroundColor: "#e2e2e254",
//           width: 304,
//           height: 50,
//           borderRadius: 40,
//           marginTop: 100,
//           marginLeft: "auto",
//           marginRight: "auto",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//         onPress={() => {
//           props.navigation.navigate("Login");
//         }}
//       >
//         <Text
//           style={{
//             color: "#ffffff",
//             fontSize: 18,
//             letterSpacing: 2,
//             fontWeight: "bold",
//           }}
//         >
//           Sign in
//         </Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={{
//           marginTop: 25,
//           marginLeft: "auto",
//           marginRight: "auto",
//           alignItems: "center",
//           justifyContent: "center",
//         }}
//         onPress={() => {
//           props.navigation.navigate("Register");
//         }}
//       >
//         <Text
//           style={{
//             color: "#ffffff",
//             fontSize: 15,
//             letterSpacing: 2,
//           }}
//         >
//           Create an account
//         </Text>
//       </TouchableOpacity>
//       {/* </ImageBackground> */}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     color: white,
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   button: {
//     flex: 1,
//     marginTop: 30,
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: 304,
//     borderRadius: 10,
//   },
//   signUp: {
//     marginTop: 30,
//     marginLeft: "auto",
//     marginRight: "auto",
//     width: 10,
//     height: 50,
//     backgroundColor: "rgba(5,70,82,1)",
//     borderRadius: 10,
//   },

//   Text: {
//     fontFamily: "helvetica-regular",
//     fontWeight: "bold",
//     color: "rgba(5,70,82,1)",
//     width: 304,
//     fontSize: 25,
//     textAlign: "center",
//     marginTop: 30,
//     marginLeft: "auto",
//     marginRight: "auto",
//   },

//   image: {
//     flex: 1,
//     width: "100%",
//     height: "100%",
//     display: "flex",
//   },
// });

// export default Home;
