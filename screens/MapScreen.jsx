// import React, { useEffect, useState } from "react";
// import { StyleSheet } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import * as Location from "expo-location";
// import { BASE_URL } from "../config/Ip";

// export default function MapScreen() {
//   const [userLocation, setUserLocation] = useState(null);

//   useEffect(() => {
//     (async () => {
//       const { status } =
//         await Location.requestForegroundPermissionsAsync();

//       if (status !== "granted") return;

//       const { coords } =
//         await Location.getCurrentPositionAsync({
//           accuracy: Location.Accuracy.High,
//         });

//       setUserLocation({
//         latitude: coords.latitude,
//         longitude: coords.longitude,
//       });
//     })();
//   }, []);

//   if (!userLocation) {
//     return <MapView style={StyleSheet.absoluteFillObject} />;
//   }

//   const fetchNearbyHouses = async () => {
//   const res = await axios.get(
//     `${BASE_URL}/property/nearby`,
//     {
//       params: {
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//       },
//     }
//   );

//   setHouses(res.data);
// };

//   return (
//     <MapView
//       provider="google"
//       style={StyleSheet.absoluteFillObject}
//       mapType="satellite"
//       region={{
//         latitude: userLocation.latitude,
//         longitude: userLocation.longitude,
//         latitudeDelta: 0.02,
//         longitudeDelta: 0.02,
//       }}
//       showsUserLocation={true}
//       followsUserLocation={true}
//     >
//       <Marker coordinate={userLocation} />
//     </MapView>
//   );
// }

import React, { useEffect, useState } from "react";
import { StyleSheet, View, TouchableOpacity, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";
import axios from "axios";
import { MaterialIcons } from "@expo/vector-icons";
import { BASE_URL } from "../config/Ip";

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);
  const [houses, setHouses] = useState([]);

  // Get user location
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const { coords } = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

const fetchNearbyHouses = async () => {
  if (!userLocation) return;

  try {
    const res = await axios.get(`${BASE_URL}/property/nearby`, {
      params: {
        latitude: userLocation.latitude,
        longitude: userLocation.longitude,
      },
    });

    const nearbyHouses = res.data;

    if (!nearbyHouses || nearbyHouses.length === 0) {
      Alert.alert(
        "No houses found",
        "There are no houses within a 10 km radius"
      );
    }

    setHouses(nearbyHouses);
    console.log("Nearby houses:", nearbyHouses);
  } catch (error) {
    console.log("Error fetching houses:", error.message);
    Alert.alert("Error", "Failed to fetch nearby houses");
  }
};

  if (!userLocation) {
    return <MapView style={StyleSheet.absoluteFillObject} />;
  }

  return (
    <View style={{ flex: 1 }}>
      <MapView
        provider="google"
        style={StyleSheet.absoluteFillObject}
        mapType="satellite"
        region={{
          latitude: userLocation.latitude,
          longitude: userLocation.longitude,
          latitudeDelta: 0.02,
          longitudeDelta: 0.02,
        }}
        showsUserLocation
        followsUserLocation
      >
        <Marker coordinate={userLocation} />

        {houses.map((house) => (
          <Marker
            key={house._id}
            coordinate={{
              latitude: house.coordinates.lat,
              longitude: house.coordinates.lng,
            }}
            title={house.title}
            description={`Ksh ${house.price}`}
          >
            <MaterialIcons name="home" size={30} color="#00FF00" />
          </Marker>
        ))}
      </MapView>

      {/* Fetch Button */}
      <TouchableOpacity style={styles.button} onPress={fetchNearbyHouses}>
        <Text style={styles.buttonText}>Find Nearby Houses</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    bottom: 70,
    alignSelf: "center",
    backgroundColor: "#FCA311",
    paddingVertical: 12,
    paddingHorizontal: 25,
    borderRadius: 30,
  },
  buttonText: {
color: "#14213D",
    fontWeight: "bold",
  },
});
