import {
  Box,
  Button,
  Center,
  FormControl,
  Heading,
  HStack,
  Icon,
  Input,
  Link,
  Spinner,
  Text,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Keyboard } from "react-native";
import { CartState } from "../Context/CartProvider";
import { MaterialIcons } from "@expo/vector-icons";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";

const Login = ({ navigation }) => {
  const toast = useToast();
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { user, setCart, setUser } = CartState();

  useEffect(() => {
    if (user) {
      navigation.navigate("Home");
    }
  }, []);

  const getUser = async () => {
    let userDetails = await AsyncStorage.getItem("userInfo");
    userDetails = JSON.parse(userDetails);
    return userDetails;
  };

  const getCartItems = async () => {
    getUser()
      .then((userDetails) => {
        const configuration = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userDetails.token}`,
          },
        };
        axios
          .post(
            "https://meal-monkey-backend.onrender.com/api/cart/getCartItems",
            {
              userId: userDetails._id,
            },
            configuration
          )
          .then((res) => {
            setCart(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleLogin = () => {
    setLoading(true);
    if (email.length < 1 || password.length < 1) {
      toast.show({
        title: "Please fill all the fields",
        duration: 2000,
        isClosable: true,
        backgroundColor: "red.600",
      });
      setLoading(false);
      return;
    }
    if (password.length < 6) {
      toast.show({
        title: "Password must be at least 6 characters",
        status: "error",
        duration: 2000,
        isClosable: true,
        backgroundColor: "red.600",
      });
      setLoading(false);
      return;
    }
    Keyboard.dismiss();
    const config = {
      "Content-Type": "application/json",
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/user/login",
        { email, password },
        config
      )
      .then((res) => {
        AsyncStorage.setItem("userInfo", JSON.stringify(res.data))
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });

        toast.show({
          title: "Login Successful",
          status: "success",
          duration: 1000,
          isClosable: true,
          backgroundColor: "green.700",
        });
        setLoading(false);
        navigation.navigate("Home");
        setUser(res.data);
        getCartItems();
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        toast.show({
          title: "Invalid Credentials",
          status: "error",
          duration: 2000,
          isClosable: true,
          backgroundColor: "red.600",
        });
        setLoading(false);
      });
  };
  return (
    <Center w="100%">
      <Box safeArea p="2" py="8" w="90%">
        <Heading
          size="lg"
          fontWeight="600"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
        >
          Welcome Back,
        </Heading>
        <Heading
          mt="1"
          _dark={{
            color: "warmGray.200",
          }}
          color="coolGray.600"
          fontWeight="medium"
          size="xs"
        >
          Sign in to continue!
        </Heading>

        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              fontSize={16}
              type="email"
              onChangeText={(val) => {
                setEmail(val);
              }}
              value={email}
              variant="underlined"
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              value={password}
              onChangeText={(val) => {
                setPassword(val);
              }}
              fontSize={16}
              variant={"underlined"}
              type={show ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShow(!show)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={show ? "visibility" : "visibility-off"}
                      />
                    }
                    size={5}
                    mr="2"
                    color="muted.400"
                  />
                </Pressable>
              }
              // placeholder="Password"
            />
            {/* <Link
              _text={{
                fontSize: "xs",
                fontWeight: "500",
                color: "indigo.500",
              }}
              alignSelf="flex-end"
              mt="1"
            >
              Forget Password?
            </Link> */}
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={handleLogin}>
            {loading ? <Spinner /> : "Sign In"}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I'm a new user.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Signup")}
            >
              Sign Up
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Login;
