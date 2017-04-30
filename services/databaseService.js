import { serverAPI } from '../config/api';


async function getEntries() {
  try {
    const response = await fetch(`${serverAPI}/quengel/entries`);
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}


module.exports = {
  getEntries
};
