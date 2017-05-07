import { serverAPI } from '../config/api';


async function getEntries(user) {
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: `JWT ${user.jwt}`,
        email: user.email
      }
    };

    const response = await fetch(`${serverAPI}/quengel/entries`, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createEntry(entry, user) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${user.jwt}`,
        email: user.email
      },
      body: JSON.stringify(entry)
    };

    await fetch(`${serverAPI}/quengel/entry`, options);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function register(user) {
  try {
    const response = await fetch(`${serverAPI}/quengel/user/register`, {
      method: 'post',
      body: JSON.stringify(user)
    });

    const json = await response.json();
    return json.token;
  } catch (err) {
    console.error(err);
    return null;
  }
}


module.exports = {
  getEntries,
  createEntry,
  register
};
