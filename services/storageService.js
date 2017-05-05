import { AsyncStorage } from 'react-native';


async function setData(key, data) {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (err) {
    // Error saving data
    console.error(err);
  }
}

async function getData(key) {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data !== null) {
      return JSON.parse(data);
    }
  } catch (error) {
    // Error retrieving data
    return error;
  }

  return null;
}

async function removeData(key) {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    // Error removing data
    console.error(err);
  }
}


export { setData, getData, removeData };
