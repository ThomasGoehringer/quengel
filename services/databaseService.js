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

async function createEntry(entry) {
  try {
    const response = await fetch(`${serverAPI}/quengel/entry`, {
      method: 'post',
      body: entry
    });
    return response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
}

module.exports = {
  getEntries,
  createEntry
};
