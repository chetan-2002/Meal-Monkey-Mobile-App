import "react-native-gesture-handler";
import { NativeBaseProvider } from "native-base";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import LoginSignupNavigator from "./navigation/loginSignupNavigator";
import CartProvider from "./Context/CartProvider";
export default function App() {
  return (
    <CartProvider>
      <NativeBaseProvider>
        <NavigationContainer>
          <>
            <LoginSignupNavigator />
          </>
        </NavigationContainer>
      </NativeBaseProvider>
    </CartProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
