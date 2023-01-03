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
  Pressable,
  Spinner,
  Text,
  Toast,
  useToast,
  VStack,
} from "native-base";
import { useEffect, useState } from "react";
import axios from "axios";
import { Keyboard } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CartState } from "../Context/CartProvider";
import { MaterialIcons } from "@expo/vector-icons";
const Signup = ({ navigation }) => {
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { setCart, setUser } = CartState();

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

  const sendverificationEmail = async (id, token, name, email) => {
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
            "https://meal-monkey-backend.onrender.com/api/sendmail",
            {
              email: email,
              subject: "Verify your email",
              html: `<h3>Hey, ${name}</h3>
          <p>Thanks for signing up with us. Please verify your email by clicking on the link below.</p>
          <a href="https://meal-monkey-kappa.vercel.app/verify/${id}/${token}">
          https://meal-monkey-kappa.vercel.app/verify/${id}/${token}
          </a>
          <p>If you did not sign up with us, please ignore this email.</p>
          <p>Thanks</p>
          <p>Team Meal Monkey</p>`,
            },
            configuration
          )
          .then((res) => {
            toast.show({
              backgroundColor: "green.400",
              title: "Verification Email Sent",
              status: "success",
              duration: 2000,
              isClosable: true,
            });
          })
          .catch((err) => {
            toast.show({
              backgroundColor: "red.600",
              title: "Error in sending verification email",
              status: "error",
              duration: 2000,
              isClosable: true,
            });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const handleSignup = () => {
    setLoading(true);
    if (email.length < 1 || password.length < 1 || confirmPassword.length < 1) {
      toast.show({
        title: "Please fill all the fields",
        duration: 2000,
        isClosable: true,
        backgroundColor: "red.600",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.show({
        title: "Passwords do not match",
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

    if (!validateEmail(email)) {
      toast.show({
        title: "Please enter a valid email address",
        status: "error",
        duration: 2000,
        isClosable: true,
        backgroundColor: "red.600",
      });
      setLoading(false);
      return;
    }
    Keyboard.dismiss();
    axios
      .post("https://meal-monkey-backend.onrender.com/api/user/register", {
        name,
        email,
        password,
      })
      .then((res) => {
        AsyncStorage.setItem("userInfo", JSON.stringify(res.data))
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        if (res.data) {
          toast.show({
            backgroundColor: "green.400",
            title: "Account created successfully",
            status: "success",
            duration: 2000,
            isClosable: true,
            variant: "left-accent",
          });
          setLoading(false);
          setUser(res.data);
          navigation.navigate("Home");
          getCartItems();
          sendverificationEmail(
            res.data._id,
            res.data.token,
            res.data.name,
            res.data.email
          );
        }
      })
      .catch((err) => {
        console.log(err);
        toast.show({
          title: "Something went wrong",
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
      <Box safeArea p="2" w="90%" py="8">
        <Heading
          size="lg"
          color="coolGray.800"
          _dark={{
            color: "warmGray.50",
          }}
          fontWeight="semibold"
        >
          Hey, Welcome to Meal Monkey!
        </Heading>
        <Heading
          mt="1"
          color="coolGray.600"
          _dark={{
            color: "warmGray.200",
          }}
          fontWeight="medium"
          size="xs"
        >
          Sign up to continue!
        </Heading>
        <VStack space={3} mt="5">
          <FormControl isRequired>
            <FormControl.Label>Name</FormControl.Label>
            <Input
              fontSize={16}
              variant={"underlined"}
              onChangeText={(val) => {
                setName(val);
              }}
              value={name}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Email</FormControl.Label>
            <Input
              fontSize={16}
              variant={"underlined"}
              onChangeText={(val) => {
                setEmail(val);
              }}
              value={email}
            />
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Password</FormControl.Label>
            <Input
              fontSize={16}
              onChangeText={(val) => {
                setPassword(val);
              }}
              value={password}
              variant={"underlined"}
              type={showPassword ? "text" : "password"}
              InputRightElement={
                <Pressable onPress={() => setShowPassword(!showPassword)}>
                  <Icon
                    as={
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
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
          </FormControl>
          <FormControl isRequired>
            <FormControl.Label>Confirm Password</FormControl.Label>
            <Input
              fontSize={16}
              onChangeText={(val) => {
                setConfirmPassword(val);
              }}
              value={confirmPassword}
              variant={"underlined"}
              type={showConfirmPassword ? "text" : "password"}
              InputRightElement={
                <Pressable
                  onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <Icon
                    as={
                      <MaterialIcons
                        name={
                          showConfirmPassword ? "visibility" : "visibility-off"
                        }
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
          </FormControl>
          <Button mt="2" colorScheme="blue" onPress={handleSignup}>
            {loading ? <Spinner color={"blue"} /> : "Sign Up"}
          </Button>
          <HStack mt="6" justifyContent="center">
            <Text
              fontSize="sm"
              color="coolGray.600"
              _dark={{
                color: "warmGray.200",
              }}
            >
              I have an account.{" "}
            </Text>
            <Link
              _text={{
                color: "indigo.500",
                fontWeight: "medium",
                fontSize: "sm",
              }}
              onPress={() => navigation.navigate("Login")}
            >
              Login
            </Link>
          </HStack>
        </VStack>
      </Box>
    </Center>
  );
};

export default Signup;
