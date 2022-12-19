import { createStackNavigator } from "@react-navigation/stack";
import Login from "../screens/Login";
import Signup from "../screens/Signup";
import Checkout from "../screens/Checkout";
import HomeScreen from "../screens/HomeScreen";
import BottomNavigator from "./BottomNavigator";
const Stack = createStackNavigator();

export default function LoginSignupNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Login"
        component={Login}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Signup"
        component={Signup}
        options={{
          headerShown: false,
        }}
        gestureEnabled={true}
        gestureDirection="horizontal"
      />
      <Stack.Screen
        name="Home"
        component={BottomNavigator}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Checkout"
        component={Checkout}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
}
