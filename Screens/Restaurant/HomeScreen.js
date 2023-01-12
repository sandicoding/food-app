import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import SPACING from "../../config/SPACING";
import colors from "../../config/Restaurant/colors";
import DATA from "../../config/Restaurant/DATA";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { isLoggedIn } from "../../firebase/Author";
import { collection, getDocs, query, where } from "firebase/firestore/lite";
import { db } from "../../firebase/firebase";
import { getIdUserAction, getUserAction } from "../../redux/actions/AuthAction";
import { listFoodAction } from "../../redux/actions/FoodAction";
import { useFocusEffect } from "@react-navigation/native";
const { width } = Dimensions.get("window");

const ITEM_WIDTH = width / 2 - SPACING * 3;

const HomeScreen = (props) => {

  const [activeCategory, setActiveCategory] = useState(0);
  const [ token , setToken ] = useState(isLoggedIn());
  const [user, setUser] = useState(null);
  const [foodData, setFoodData] = useState([]);
  const [uidUser, setUidUser] = useState(null);
  const [search, setSearch] = useState('');

  const dispatch = useDispatch();

  const userState = useSelector((state) => state.auth);
  const foodsState = useSelector((state) => state.foods);

  const { user: currentUser } = userState;
  const { foods, loading } = foodsState;

  useFocusEffect(
    React.useCallback(() => {
      dispatch(getUserAction());
      dispatch(getIdUserAction())
      dispatch(listFoodAction())
    }, [dispatch])
  )

  const halperIdr = (price) => {
    return price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

const handleSearch = (text) => {
    const query = text.toLowerCase();
    const filtered = foods.filter((food) => {
      return food.name.toLowerCase().includes(query);
    });
    setFoodData(filtered);
};

  React.useEffect(() => {
    handleSearch(search)
  }, [search])

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ padding: SPACING * 2, marginTop: SPACING * 2 }}>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                style={{
                  width: SPACING * 4.5,
                  height: SPACING * 4.5,
                  borderRadius: SPACING * 3,
                  marginRight: SPACING,
                }}
                source={require("../../assets/restaurant/avatar.jpg")}
              />
              <Text
                style={{
                  fontSize: SPACING * 1.7,
                  fontWeight: "800",
                  color: colors.dark,
                }}
              >
                Hello, {currentUser?.fullname}
              </Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <TouchableOpacity style={{ marginRight: SPACING }}>
                <Ionicons
                  name="notifications-outline"
                  size={SPACING * 3.5}
                  color={colors.dark}
                />
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ width: "60%", marginTop: SPACING * 2 }}>
            <Text style={{ fontSize: SPACING * 3, fontWeight: "700" }}>
              What would you like to order?
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              backgroundColor: colors.light,
              marginVertical: SPACING * 3,
              padding: SPACING * 1.5,
              borderRadius: SPACING,
            }}
          >
            <Ionicons name="search" color={colors.gray} size={SPACING * 2.7} />
            <TextInput
              placeholder="Want to .."
              placeholderTextColor={colors.gray}
              onChangeText={(text) => setSearch(text)}
              style={{
                color: colors.gray,
                fontSize: SPACING * 2,
                marginLeft: SPACING,
              }}
            />
          </View>
          <ScrollView horizontal>
              <TouchableOpacity
                style={{ marginRight: SPACING * 3 }}
              >
                <Text
                  style={[
                    {
                      fontSize: SPACING * 1.7,
                      fontWeight: "700",
                      color: colors.black,
                    }
                  ]}
                >
                  Foods
                </Text>
              </TouchableOpacity>
          </ScrollView>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              justifyContent: "space-between",
              marginVertical: SPACING * 2,
            }}
          >
            {foodData?.map((item) => (
              <TouchableOpacity
                onPress={() => props.navigation.navigate("Food Detail", { item })}
                style={{ width: ITEM_WIDTH, marginBottom: SPACING * 2 }}
                key={item?.id}
              >
                <Image
                  style={{
                    width: "100%",
                    height: ITEM_WIDTH + SPACING * 3,
                    borderRadius: SPACING * 2,
                  }}
                  source={{ uri: item?.image }}
                />
                <Text
                  style={{
                    fontSize: SPACING * 2,
                    fontWeight: "700",
                    marginTop: SPACING,
                  }}
                >
                  {item?.name}
                </Text>
                <Text
                  style={{
                    fontSize: SPACING * 1.5,
                    color: colors.gray,
                    marginVertical: SPACING / 2,
                  }}
                >
                  {item?.description}
                </Text>
                <Text style={{ fontSize: SPACING * 2, fontWeight: "700" }}>
                  Rp {halperIdr(item?.price)}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
