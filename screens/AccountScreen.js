import AsyncStorage from "@react-native-async-storage/async-storage";
import { Avatar, Button, Center, Text, VStack } from "native-base";
import { CartState } from "../Context/CartProvider";

const AccountScreen = ({ navigation }) => {
  const { user, setUser } = CartState();
  return (
    <VStack
      display={"flex"}
      pt="10"
      alignItems={"center"}
      justifyContent={"center"}
    >
      <Avatar
        bg="lightBlue.400"
        source={{
          uri: "https://res.cloudinary.com/dvbjetffn/image/upload/v1671350752/60bf7fba-1ca5-4b62-8e8c-5220a909ace5_e85rce.jpg",
        }}
        size="2xl"
      >
        CT
      </Avatar>
      <Text fontSize="2xl" fontWeight="bold" mt="2">
        {user?.name}
      </Text>
      <Text fontSize="lg" color="gray.500" mt="1">
        {user?.email}
      </Text>
      <Button
        m="6"
        onPress={() => {
          AsyncStorage.removeItem("userInfo").then(() => {
            setUser(null);
          });
          navigation.navigate("Login");
        }}
      >
        <Text fontSize="lg" color="white">
          Logout
        </Text>
      </Button>
    </VStack>
  );
};

export default AccountScreen;
