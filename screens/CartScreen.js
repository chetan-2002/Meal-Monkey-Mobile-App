import {
  Box,
  Button,
  Center,
  Divider,
  ScrollView,
  Text,
  VStack,
} from "native-base";
import { CartState } from "../Context/CartProvider";
import { FontAwesome } from "@expo/vector-icons";
import SingleCartItem from "../components/SingleCartItem";

const CartScreen = ({ navigation }) => {
  const { cart } = CartState();
  const cartTotal = cart.cartItems.reduce(
    (acc, ele) => acc + ele.product.price * ele.qty,
    0
  );
  // console.log(cart);
  return (
    <VStack>
      {!cart ? (
        <Box
          alignItems={"center"}
          display={"flex"}
          height={"100%"}
          justifyContent={"center"}
        >
          <FontAwesome name="shopping-cart" color="black" size={100} />
          <Text
            style={{
              fontSize: 18,
              fontWeight: "bold",
              marginTop: 10,
            }}
          >
            No Items in Cart yet!
          </Text>
        </Box>
      ) : (
        <ScrollView>
          <Box
            style={{
              padding: 12,
            }}
          >
            {cart?.cartItems?.map((item, key) => (
              <SingleCartItem key={key} item={item} />
            ))}
            {
              <Divider
                style={{
                  marginTop: 18,
                  marginBottom: 18,
                }}
              ></Divider>
            }
            {
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
            }
            <Button
              style={{
                marginTop: 18,
              }}
              backgroundColor={"#f0c14b"}
              onPress={() => {
                navigation.navigate("Checkout");
              }}
            >
              <Text
                style={{
                  color: "black",
                  fontWeight: "bold",
                  fontSize: 16,
                }}
              >
                Proceed to Checkout
              </Text>
            </Button>
          </Box>
        </ScrollView>
      )}
    </VStack>
  );
};
export default CartScreen;
