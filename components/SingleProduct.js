import axios from "axios";
import {
  Box,
  Button,
  Image,
  Pressable,
  Spinner,
  Text,
  useToast,
} from "native-base";
import { useState } from "react";
import { TouchableOpacity } from "react-native";
import { CartState } from "../Context/CartProvider";

const SingleProduct = ({ product }) => {
  const toast = useToast();
  const [loading, setLoading] = useState(false);
  const { user, setCart } = CartState();
  const handleAddToCart = async () => {
    setLoading(true);
    const productId = product?._id;
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user?.token}`,
      },
    };
    const body = {
      productId,
      userId: user._id,
    };
    axios
      .post(
        "https://meal-monkey-backend.onrender.com/api/cart/addToCart",
        body,
        config
      )
      .then((res) => {
        toast.show({
          title: `${product?.name} added to cart successfully`,
          // description: "We've added the product to your cart",
          status: "success",
          duration: 3000,
          isClosable: true,
        });
        setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        toast({
          title: "Error",
          description: "Something went wrong",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
        setLoading(false);
      });
  };
  return (
    <Box
      display={"flex"}
      flexDirection={"column"}
      backgroundColor={"white"}
      style={{
        borderRadius: 10,
        // padding: 10,
        marginBottom: 10,
      }}
    >
      <Image
        source={{ uri: product?.image }}
        alt={product?.name}
        height={"40"}
        style={{
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
        }}
      ></Image>
      <Box
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box>
          <Text
            style={{
              fontSize: 18,
              paddingBottom: 5,
              fontWeight: "500",
            }}
          >
            {product?.name}
          </Text>
          <Text
            style={{
              fontSize: 14,
              paddingBottom: 5,
              fontWeight: "400",
            }}
          >
            {product?.description}
          </Text>
        </Box>
        <Box
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              paddingBottom: 5,
            }}
          >
            Price
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: "500",
              paddingBottom: 5,
            }}
          >
            ₹ {product?.price}
          </Text>
        </Box>
        <Pressable zIndex={1}>
          <Button
            // variant={"outline"}
            style={{
              backgroundColor: "#FFC107",
              // width: "100%",
              borderRadius: 8,
              marginTop: 10,
            }}
            onPress={() => {
              handleAddToCart();
            }}
          >
            {loading ? (
              <Spinner color="white" />
            ) : (
              <Text
                style={{
                  fontWeight: "500",
                }}
              >
                Add to Cart
              </Text>
            )}
          </Button>
        </Pressable>
      </Box>
    </Box>
  );
};
export default SingleProduct;
