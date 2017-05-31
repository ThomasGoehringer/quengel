import { serverAPI } from '../config/api';


async function getEntries(jwt) {
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: `JWT ${jwt}`
      }
    };

    const response = await fetch(`${serverAPI}/quengel/entries`, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createEntry(entry, jwt) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
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

async function createMilestone(entry, jwt) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
      },
      body: JSON.stringify(entry)
    };

    await fetch(`${serverAPI}/quengel/milestone`, options);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getCharts(jwt) {
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: `JWT ${jwt}`
      }
    };

    const response = await fetch(`${serverAPI}/quengel/charts`, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createQuestion(question, jwt) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
      },
      body: JSON.stringify(question)
    };

    await fetch(`${serverAPI}/quengel/question`, options);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createComment(comment, jwt) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
      },
      body: JSON.stringify(comment)
    };

    await fetch(`${serverAPI}/quengel/comment`, options);
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

async function login(user) {
  try {
    const response = await fetch(`${serverAPI}/quengel/user/login`, {
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

async function createProfile(userProfile, jwt) {
  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
      },
      body: JSON.stringify(userProfile)
    };

    await fetch(`${serverAPI}/quengel/user/profile`, options);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function getProfile(jwt) {
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: `JWT ${jwt}`
      }
    };

    const response = await fetch(`${serverAPI}/quengel/user/profile`, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}


module.exports = {
  getEntries,
  createEntry,
  createMilestone,
  getCharts,
  register,
  login,
  createProfile,
  getProfile,
  createQuestion,
  createComment
};
