import AsyncStorage from "@react-native-async-storage/async-storage";

// Store data
const setItem = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.log("Error storing data: ", error);
  }
};

// Retrieve data
const getItem = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log("getItem", error)
    return undefined;
  }
};
const removeItem = async (key) =>  {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Error retrieving data: ", error);
  }
};
localStorage = { setItem, getItem };
export const storage = { setItem, getItem, removeItem };
