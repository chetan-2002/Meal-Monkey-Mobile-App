import { Box, Text } from "native-base";
import SingleOrderSummaryItem from "../components/SingleOrderSummaryItem";
import { CartState } from "../Context/CartProvider";

const OrderSummary = () => {
  const { cart } = CartState();
  return (
    <Box>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 10,
        }}
      >
        Order Summary
      </Text>

      {cart.cartItems?.map((item) => (
        <SingleOrderSummaryItem key={item._id} item={item} />
      ))}
    </Box>
  );
};

export default OrderSummary;
