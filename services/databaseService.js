import { serverAPI } from '../config/api';


function handleErrors(response) {
  if (!response.ok) {
    throw Error(response.status);
  }
  return response;
}

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

async function getQuestions(jwt) {
  try {
    const options = {
      method: 'get',
      headers: {
        Authorization: `JWT ${jwt}`
      }
    };

    const response = await fetch(`${serverAPI}/quengel/questions`, options);
    return response.json();
  } catch (err) {
    console.error(err);
    return null;
  }
}

async function createComment(questionId, comment, jwt) {
  const requestBody = Object.assign(comment, { id: questionId });

  try {
    const options = {
      method: 'post',
      headers: {
        Authorization: `JWT ${jwt}`
      },
      body: JSON.stringify(requestBody)
    };

    await fetch(`${serverAPI}/quengel/comment`, options);
    return null;
  } catch (err) {
    console.error(err);
    return null;
  }
}

function register(user) {
  const options = {
    method: 'post',
    body: JSON.stringify(user)
  };

  return new Promise((resolve, reject) => {
    fetch(`${serverAPI}/quengel/user/register`, options)
    .then(handleErrors)
    .then(response => response.json())
    .then((json) => {
      resolve(json.token);
    })
    .catch((error) => {
      reject(error);
    });
  });
}

async function login(user) {
  const options = {
    method: 'post',
    body: JSON.stringify(user)
  };

  return new Promise((resolve, reject) => {
    fetch(`${serverAPI}/quengel/user/login`, options)
    .then(handleErrors)
    .then(response => response.json())
    .then((json) => {
      resolve(json.token);
    })
    .catch((error) => {
      reject(error);
    });
  });
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
  getQuestions,
  createComment
};
