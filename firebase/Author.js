import AsyncStorage from "@react-native-async-storage/async-storage";

export const isLoggedIn = () => {
    const user = AsyncStorage.getItem("user");
    console.log(user, "user")
    if (user) {
        return true;
    }
    return false;
}