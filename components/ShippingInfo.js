import {
  Box,
  FormControl,
  Input,
  InputGroup,
  InputLeftAddon,
  Text,
} from "native-base";
import React, { useEffect, useState } from "react";
import { CartState } from "../Context/CartProvider";

const ShippingInfo = () => {
  const { user, cart, setShippingInfo } = CartState();
  const cartTotal = cart.cartItems.reduce(
    (acc, ele) => acc + ele.product.price * ele.qty,
    0
  );
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [shippingInformation, setShippingInformation] = useState({
    userId: user._id,
    cart: cart._id,
    address: "",
    paymentType: "COD",
    total: (cartTotal + 0.18 * cartTotal + 50).toFixed(0),
    phoneNo: "",
  });

  return (
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
            setShippingInformation({
              ...shippingInformation,
              address: val,
            });
            // setShippingInfo(shippingInformation);
          }}
          value={shippingInformation.address}
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
              setShippingInformation({
                ...shippingInformation,
                phoneNo: val,
              });
              //   setShippingInfo(shippingInformation);
            }}
            value={shippingInformation.phoneNo}
            variant="outline"
          />
        </InputGroup>
      </FormControl>
    </Box>
  );
};

export default ShippingInfo;
