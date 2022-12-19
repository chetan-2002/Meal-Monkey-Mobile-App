import {
  Box,
  Button,
  Center,
  HStack,
  Icon,
  Pressable,
  ScrollView,
  Spinner,
  Text,
} from "native-base";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React, { useEffect, useState } from "react";
import { CartState } from "../Context/CartProvider";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import SingleSection from "../components/SingleSection";

const HomeScreen = ({ navigation }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const getAllCategoriesWithProducts = async () => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios
      .get("https://meal-monkey-backend.onrender.com/api/category/", config)
      .then((res) => {
        // console.log(res.data);
        setCategories(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllCategoriesWithProducts();
  }, [setCategories]);
  return (
    <Box>
      {loading ? (
        <Box
          display={"flex"}
          height={"full"}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <Spinner size={"lg"} />
          <Text mt={"7"}>Hold on Tight , Loading ...</Text>
        </Box>
      ) : (
        <ScrollView>
          {categories?.map((category, key) => (
            <SingleSection key={key} category={category} />
          ))}
        </ScrollView>
      )}
    </Box>
  );
};

export default HomeScreen;
