// async function getEntries() {
//   try {
//     const response = await fetch(`${serverAPI}/entries`);
//     return response.json();
//   } catch (error) {
//     console.error(error);
//     return null;
//   }
// }

async function getEntries() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          createdAt: '28.04.2017 16:33',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:33',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:33',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:33',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        }
      ]);
    }, 500);
  });
}


module.exports = {
  getEntries
};
