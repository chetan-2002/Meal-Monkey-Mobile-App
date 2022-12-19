import axios from "axios";
import {
  Box,
  Button,
  Divider,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Pressable,
  ScrollView,
  Spinner,
  Text,
  useToast,
} from "native-base";
import { useState } from "react";
import { CartState } from "../Context/CartProvider";
import OrderSummary from "./OrderSummary";

const Checkout = ({ navigation }) => {
  const toast = useToast();
  const { cart, user, setOrderPlaced } = CartState();
  const cartTotal = cart.cartItems.reduce(
    (acc, ele) => acc + ele.product.price * ele.qty,
    0
  );
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [shippingInfo, setshippingInfo] = useState({
    userId: user._id,
    cart: cart._id,
    address: "",
    paymentType: "COD",
    total: (cartTotal + 0.18 * cartTotal + 50).toFixed(0),
    phoneNo: "",
  });

  const placeOrder = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/order/makeOrder",
        shippingInfo,
        config
      )
      .then((res) => {
        toast.show({
          title: "Order Placed Successfully",
          backgroundColor: "green.600",
          duration: 3000,
          isClosable: true,
        });
        axios.post(
          "https://meal-monkey-backend.onrender.com/api/sendmail",
          {
            email: user?.email,
            subject: "Order Confirmation",
            html: `<h3>Hey ${user?.name}, </h3>
            Thank you for shopping with us. Your order has been placed successfully.
            <br>
            <h3>Order Details</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>S.No</th>
            <th>Product Name</th>
            <th>Product Price</th>
            <th>Product Quantity</th>
            <th>Product Total</th>
            </tr>
            ${cart?.cartItems
              .map(
                (item) =>
                  `<tr>
              <td>${cart.cartItems.indexOf(item) + 1}</td>
              <td>${item.product.name}</td>
              <td>₹ ${item.product.price}</td>
              <td>${item.qty}</td>
              <td>₹ ${item.product.price * item.qty}</td>
              </tr>`
              )
              .join("")}
            </table>
            <br>
            <h3>Shipping Details</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>Address</th>
            <th>Phone No</th>
            <th>Payment Type</th>
            <th>Total Amount Payable (After Taxes)</th>
            </tr>
            <tr>
            <td>${shippingInfo.address}</td>
            <td>${shippingInfo.phoneNo}</td>
            <td>${shippingInfo.paymentType}</td>
            <td>₹ ${(cartTotal + cartTotal * 0.18 + 50).toFixed(0)}</td>
            </tr>
            </table>
            <br>
            <h3>Order Placed On</h3>
            <table border="1" cellpadding="10" cellspacing="0">
            <tr>
            <th>${new Date().toLocaleString()}</th>
            </tr>
            </table>
            <h3>Regards,</h3>
            <h3>Team Meal Monkey</h3>
            `,
          },
          config
        );
        setOrderPlaced(true);
        navigation.navigate("Home");
        setLoading(false);
      })
      .catch((err) => {
        toast.show({
          title: "Something went wrong",
          backgroundColor: "red.600",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };

  const handleOrder = async () => {
    setLoading(true);
    const configuration = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/user/isEmailVerified",
        {
          email: user?.email,
        },
        configuration
      )
      .then((res) => {
        if (
          !shippingInfo.address ||
          !shippingInfo.paymentType ||
          !shippingInfo.phoneNo
        ) {
          toast.show({
            title: "Please Enter all the fields",
            backgroundColor: "red.600",
            duration: 3000,
            isClosable: true,
          });
          setLoading(false);
        } else {
          placeOrder();
        }
      })
      .catch((err) => {
        toast({
          title: "Please Verify Your Email",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
        return;
      });
  };

  return (
    <ScrollView>
      <Box safeArea p={5}>
        {/* <ShippingInfo /> */}
        <Box display={"flex"} flexDirection={"column"} flexShrink={"1"}>
          <Text
            style={{
              fontSize: 20,
              fontWeight: "bold",
              marginBottom: 10,
            }}
          >
            Shipping Information
          </Text>
          <FormControl
            isReadOnly
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label>Full Name</FormControl.Label>
            <Input fontSize={16} value={user?.name} variant="outline" />
          </FormControl>
          <FormControl
            isRequired
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label>Street Address</FormControl.Label>
            <Input
              fontSize={16}
              onChangeText={(val) => {
                setshippingInfo({
                  ...shippingInfo,
                  address: val,
                });
                // setShippingInfo(shippingInfo);
              }}
              value={shippingInfo.address}
              variant="outline"
            />
          </FormControl>
          <FormControl
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label>Zip Code</FormControl.Label>
            <Input
              fontSize={16}
              onChangeText={(val) => {
                setZipCode(val);
              }}
              value={zipCode}
              variant="outline"
            />
          </FormControl>
          <FormControl
            isRequired
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label isRequired>City</FormControl.Label>
            <Input
              fontSize={16}
              onChangeText={(val) => {
                setCity(val);
              }}
              value={city}
              variant="outline"
            />
          </FormControl>
          <FormControl
            isReadOnly
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label>Email Address</FormControl.Label>
            <Input fontSize={16} value={user?.email} variant="outline" />
          </FormControl>
          <FormControl
            isRequired
            style={{
              marginBottom: 10,
            }}
          >
            <FormControl.Label>Phone Number</FormControl.Label>
            <InputGroup>
              <InputLeftAddon children={"+91"} />
              <Input
                width={"88%"}
                fontSize={16}
                onChangeText={(val) => {
                  setshippingInfo({
                    ...shippingInfo,
                    phoneNo: val,
                  });
                  //   setShippingInfo(shippingInfo);
                }}
                value={shippingInfo.phoneNo}
                variant="outline"
              />
            </InputGroup>
          </FormControl>
        </Box>
        {/*****************************************************************************/}
        <Divider
          style={{
            marginTop: 18,
            marginBottom: 18,
          }}
        ></Divider>
        {/*****************************************************************************/}
        <OrderSummary />
        {/*****************************************************************************/}
        <Box
          style={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text fontSize={18}>
              Subtotal ({cart?.cartItems?.length} items)
            </Text>
            <Text fontSize={18}>₹ {cartTotal}</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text fontSize={18}>Delivery Charges</Text>
            <Text fontSize={18}>₹ 50</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text fontSize={18}>GST (18%)</Text>
            <Text fontSize={18}>₹ {(cartTotal * 0.18).toFixed(0)}</Text>
          </Box>
          <Box
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <Text fontSize={18} fontWeight={"bold"}>
              Total
            </Text>
            <Text fontSize={18} fontWeight={"bold"}>
              ₹ {(cartTotal + cartTotal * 0.18 + 50).toFixed(0)}
            </Text>
          </Box>
        </Box>
        {/*****************************************************************************/}
        {/* <Pressable zIndex={1}> */}

        <Button
          onPress={() => {
            handleOrder();
          }}
          style={{
            marginTop: 18,
            backgroundColor: "#FFC107",
          }}
        >
          <Text
            style={{
              color: "black",
              fontWeight: "bold",
              fontSize: 16,
            }}
          >
            {loading ? (
              <Spinner size={"sm"} color={"white"}></Spinner>
            ) : (
              "Place Order"
            )}
          </Text>
        </Button>

        {/* </Pressable> */}
      </Box>
    </ScrollView>
  );
};

export default Checkout;
