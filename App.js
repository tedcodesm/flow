import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import StackNavigator from "./navigation/StackNavigator";
import "./global.css";
import HomeScreen from "./screens/HomeScreen";

export default function App() {
  return(
 <SafeAreaView > <HomeScreen/></SafeAreaView>
)}
