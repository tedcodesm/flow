import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import MapView, { Marker } from "react-native-maps";
import * as Location from "expo-location";

export default function MapScreen() {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } =
        await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") return;

      const { coords } =
        await Location.getCurrentPositionAsync({
          accuracy: Location.Accuracy.High,
        });

      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, []);

  if (!userLocation) {
    return <MapView style={StyleSheet.absoluteFillObject} />;
  }

  return (
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
      showsUserLocation={true}
      followsUserLocation={true}
    >
      <Marker coordinate={userLocation} />
    </MapView>
  );
}
