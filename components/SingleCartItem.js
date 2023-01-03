import {
  Box,
  Button,
  Center,
  Image,
  Pressable,
  Spinner,
  Text,
  useToast,
} from "native-base";
import { Ionicons } from "@expo/vector-icons";
import { CartState } from "../Context/CartProvider";
import axios from "axios";
import { useState } from "react";
const SingleCartItem = ({ item }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { user, setCart } = CartState();
  const updateProduct = async (productId, operation) => {
    setLoading(true);
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    await axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/cart/updateCartItems",
        { productId, operation, userId: user._id },
        config
      )
      .then((res) => {
        setCart(res.data);
        toast.show({
          title: `Cart updated successfully`,
          description:
            operation === "inc"
              ? `A ${item.product.name} was added`
              : `A ${item.product.name} is removed`,
          backgroundColor: operation === "inc" ? "green.600" : "red.600",
          duration: 1000,
          isClosable: true,
        });
        setLoading(false);
      })
      .catch((err) => {
        toast.show({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 2000,
          isClosable: true,
          backgroundColor: "red.600",
        });
        setLoading(false);
      });
  };
  return (
    <Box
      style={{
        display: "flex",
        flexDirection: "row",
        marginBottom: 20,
      }}
    >
      <Image
        source={{ uri: item?.product.image }}
        alt={item?.product.name}
        size={"lg"}
        style={{
          borderRadius: 10,
        }}
      />
      <Box
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: 14,
          justifyContent: "space-between",
          flexShrink: 1,
        }}
      >
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontSize: 18,
              fontWeight: "800",
            }}
          >
            {item?.product.name}
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            width: "100%",
            paddingRight: 10,
          }}
        >
          {loading ? (
            <>
              <Box
                display={"flex"}
                flexDirection={"row"}
                justifyContent={"center"}
                alignItems={"center"}
                width={"100%"}
              >
                <Spinner size={"lg"}></Spinner>
              </Box>
            </>
          ) : (
            <>
              <Button
                backgroundColor={"white"}
                borderRadius={"3xl"}
                onPress={() => {
                  updateProduct(item.product._id, "inc");
                }}
              >
                <Ionicons name="add-sharp" size={24} color="black" />
              </Button>
              <Text
                style={{
                  fontSize: 18,
                  fontWeight: "bold",
                }}
              >
                {item?.qty}
              </Text>
              <Button
                backgroundColor={"white"}
                borderRadius={"3xl"}
                onPress={() => {
                  updateProduct(item.product._id, "dec");
                }}
              >
                <Ionicons name="remove-sharp" size={24} color="black" />
              </Button>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default SingleCartItem;
