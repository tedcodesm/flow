import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import * as ImagePicker from "expo-image-picker";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import { BASE_URL } from "../config/Ip";

export default function CreatePropertyScreen({ navigation }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [address, setAddress] = useState("");
  const [propertyType, setPropertyType] = useState("Rent"); // must match backend enum
  const [category, setCategory] = useState("Apartment"); // must match backend enum
  const [amenities, setAmenities] = useState([]);
  const [amenityInput, setAmenityInput] = useState("");
  const [images, setImages] = useState([]);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lng: 0,
  });
  const [loading, setLoading] = useState(false);

  // Pick image
 const pickImage = async () => {
  try {
    // Request permission
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      alert("Permission to access media library is required!");
      return;
    }

    // Launch image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images, // <-- works for Expo SDK 49+
      quality: 0.7,
      allowsEditing: true,
      aspect: [4, 3],
    });

    // User cancelled
    if (result.canceled) return;

    // Add image
    if (result.assets && result.assets.length > 0) {
      const selectedUri = result.assets[0].uri;

      if (images.length + 1 > 10) {
        alert("You can upload a maximum of 10 images");
        return;
      }

      setImages([...images, selectedUri]);
    }
  } catch (error) {
    console.error("Image picker error:", error);
    alert("Failed to pick image. Please try again.");
  }
};


  // Add amenities
  const addAmenity = () => {
    if (amenityInput.trim() && !amenities.includes(amenityInput.trim())) {
      setAmenities([...amenities, amenityInput.trim()]);
      setAmenityInput("");
    }
  };

  const removeAmenity = (item) => {
    setAmenities(amenities.filter((a) => a !== item));
  };

  // Submit property
  const handleCreateProperty = async () => {
    if (
      !title ||
      !description ||
      !price ||
      !size ||
      !address ||
      !propertyType ||
      !category
    ) {
      alert("Please fill all required fields");
      return;
    }

    if (coordinates.lat === 0 && coordinates.lng === 0) {
      alert("Please select property location on the map");
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("size", size);
      formData.append("address", address);
      formData.append("propertytype", propertyType);
      formData.append("category", category);
      formData.append("amenities", amenities);
      formData.append("coordinates", JSON.stringify(coordinates));

      images.forEach((uri, idx) => {
        formData.append("images", {
          uri,
          name: `property_${idx}.jpg`,
          type: "image/jpeg",
        });
      });

      const res = await axios.post(`${BASE_URL}/property`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Alert.alert("Success", "Property created successfully!");
      navigation.goBack();
    } catch (error) {
      console.error("Error creating property:", error);
      Alert.alert(
        "Error",
        error?.response?.data?.message || "Failed to create property",
      );
    } finally {
      setLoading(false);
    }
  };

  // Toggle buttons renderer
  const renderToggleButton = (label, value, selected, setSelected) => (
    <TouchableOpacity
      key={value}
      onPress={() => setSelected(value)}
      style={{
        paddingHorizontal: 14,
        paddingVertical: 8,
        borderRadius: 20,
        backgroundColor: selected === value ? "#14213D" : "#E5E7EB",
        marginRight: 8,
      }}
    >
      <Text
        style={{
          color: selected === value ? "white" : "#374151",
          fontWeight: "600",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={{ padding: 20, paddingBottom: 40 }}
      enableOnAndroid={true}
      extraScrollHeight={20}
      keyboardShouldPersistTaps="handled"
    >
      <Text
        style={{
          fontSize: 28,
          fontWeight: "bold",
          color: "#14213D",
          marginBottom: 16,
        }}
      >
        Add New Property
      </Text>

      {/* Title */}
      <TextInput
        placeholder="Property Title"
        placeholderTextColor="#9CA3AF"
        value={title}
        onChangeText={setTitle}
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 14,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
      />

      {/* Description */}
      <TextInput
        placeholder="Description"
        placeholderTextColor="#9CA3AF"
        value={description}
        onChangeText={setDescription}
        multiline
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 14,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
          height: 100,
          textAlignVertical: "top",
        }}
      />

      {/* Price & Size */}
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        <TextInput
          placeholder="Price"
          placeholderTextColor="#9CA3AF"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 14,
            flex: 1,
            marginRight: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
        <TextInput
          placeholder="Size (sqft)"
          placeholderTextColor="#9CA3AF"
          value={size}
          onChangeText={setSize}
          keyboardType="numeric"
          style={{
            backgroundColor: "white",
            padding: 16,
            borderRadius: 14,
            flex: 1,
            marginLeft: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.2,
            shadowRadius: 2,
            elevation: 2,
          }}
        />
      </View>

      {/* Address */}
      <TextInput
        placeholder="Address"
        placeholderTextColor="#9CA3AF"
        value={address}
        onChangeText={setAddress}
        style={{
          backgroundColor: "white",
          padding: 16,
          borderRadius: 14,
          marginBottom: 12,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: 1 },
          shadowOpacity: 0.2,
          shadowRadius: 2,
          elevation: 2,
        }}
      />

      {/* Category */}
      <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>
        Category
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {["Apartment", "House", "Studio"].map((cat) =>
          renderToggleButton(cat, cat, category, setCategory),
        )}
      </View>

      {/* Property Type */}
      <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>
        Property Type
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 12 }}>
        {["Rent", "Sale"].map((type) =>
          renderToggleButton(type, type, propertyType, setPropertyType),
        )}
      </View>

      {/* Amenities */}
      <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>
        Amenities
      </Text>
      <View style={{ flexDirection: "row", marginBottom: 8 }}>
        <TextInput
          placeholder="Add amenity"
          placeholderTextColor="#9CA3AF"
          value={amenityInput}
          onChangeText={setAmenityInput}
          onSubmitEditing={addAmenity}
          style={{
            backgroundColor: "white",
            padding: 12,
            borderRadius: 14,
            flex: 1,
            marginRight: 8,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 1 },
            shadowOpacity: 0.1,
            shadowRadius: 1,
            elevation: 1,
          }}
        />
        <TouchableOpacity
          onPress={addAmenity}
          style={{
            backgroundColor: "#14213D",
            paddingHorizontal: 16,
            borderRadius: 14,
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "600" }}>Add</Text>
        </TouchableOpacity>
      </View>

      {/* Render amenities chips */}
      <FlatList
        data={amenities}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              backgroundColor: "#E5E7EB",
              borderRadius: 20,
              marginRight: 8,
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Text style={{ marginRight: 6 }}>{item}</Text>
            <TouchableOpacity onPress={() => removeAmenity(item)}>
              <MaterialCommunityIcons
                name="close-circle"
                size={18}
                color="#9CA3AF"
              />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Map Picker */}
      <Text style={{ fontWeight: "600", color: "#374151", marginVertical: 6 }}>
        Select Property Location
      </Text>
      <View
        style={{
          width: "100%",
          height: 200,
          borderRadius: 14,
          overflow: "hidden",
          marginBottom: 12,
        }}
      >
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: coordinates.lat || -1.2921,
            longitude: coordinates.lng || 36.8219,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
          onPress={(e) =>
            setCoordinates({
              lat: e.nativeEvent.coordinate.latitude,
              lng: e.nativeEvent.coordinate.longitude,
            })
          }
        >
          {coordinates.lat !== 0 && (
            <Marker
              coordinate={{
                latitude: coordinates.lat,
                longitude: coordinates.lng,
              }}
              title="Property Location"
            />
          )}
        </MapView>
      </View>

      {/* Images */}
      <Text style={{ fontWeight: "600", color: "#374151", marginBottom: 6 }}>
        Property Images
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ marginBottom: 12 }}
      >
        {images.map((uri, idx) => (
          <Image
            key={idx}
            source={{ uri }}
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              marginRight: 8,
            }}
          />
        ))}
        {images.length < 10 && (
          <TouchableOpacity
            onPress={pickImage}
            style={{
              width: 100,
              height: 100,
              borderRadius: 12,
              backgroundColor: "#E5E7EB",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <MaterialCommunityIcons
              name="image-plus"
              size={40}
              color="#9CA3AF"
            />
          </TouchableOpacity>
        )}
      </ScrollView>

      {/* Submit */}
      <TouchableOpacity
        onPress={handleCreateProperty}
        disabled={loading}
        style={{
          backgroundColor: "#14213D",
          padding: 16,
          borderRadius: 14,
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <Text style={{ color: "white", fontWeight: "700", fontSize: 16 }}>
          {loading ? "Creating..." : "Create Property"}
        </Text>
      </TouchableOpacity>
    </KeyboardAwareScrollView>
  );
}
