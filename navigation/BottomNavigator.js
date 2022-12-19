import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen";
import SearchScreen from "../screens/SearchScreen";
import CartScreen from "../screens/CartScreen";
import AccountScreen from "../screens/AccountScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { CartState } from "../Context/CartProvider";
const Tab = createBottomTabNavigator();

export default function BottomNavigator() {
  const { cart } = CartState();
  //   console.log(cart);
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          headerTitle: "Meal Monkey",
          headerTitleAlign: "left",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          tabBarLabel: "Home",
        }}
      />
      <Tab.Screen
        name="Search"
        component={SearchScreen}
        options={{
          headerTitle: "Search For Meals",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="magnify" color={color} size={size} />
          ),
          tabBarLabel: "Search",
          headerLeft: () => (
            <>
              <MaterialCommunityIcons
                name="magnify"
                color={"black"}
                size={30}
                style={{ marginLeft: 10 }}
              />
            </>
          ),
        }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          //   headerShown: false,
          headerTitle: "Your Cart",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarLabel: "Cart",
          tabBarBadge: cart?.totalItem,
        }}
      />
      <Tab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          //   headerShown: false,
          headerTitle: "Your Account",
          headerTitleAlign: "center",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarLabel: "Account",
        }}
      />
    </Tab.Navigator>
  );
}
