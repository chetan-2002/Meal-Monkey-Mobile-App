import axios from "axios";
import React, { createContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = React.useState({});
  const [user, setUser] = React.useState(null);
  const [shippingInfo, setShippingInfo] = React.useState({});
  const [orderPlaced, setOrderPlaced] = React.useState(false);

  useEffect(() => {
    let userDetails = null;
    const getUser = async () => {
      userDetails = await AsyncStorage.getItem("userInfo");
      userDetails = JSON.parse(userDetails);
      //   console.log(userDetails, "cart provider line 27");
      return userDetails;
    };
    getUser()
      .then((userDetails) => {
        // console.log(userDetails, "cart provider line 30");
        if (userDetails) {
          setUser(userDetails);
          const configuration = {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${userDetails.token}`,
            },
          };
          axios
            .post(
              "https://meal-monkey-backend.onrender.com/api/cart/getCartItems",
              { userId: userDetails._id },
              configuration
            )
            .then((res) => {
              //   console.log(res.data, "cart provider line 46");
              setCart(res.data);
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        user,
        setUser,
        shippingInfo,
        setShippingInfo,
        orderPlaced,
        setOrderPlaced,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const CartState = () => {
  return React.useContext(CartContext);
};
export default CartProvider;
