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
          image: 'https://facebook.github.io/react/img/logo_og.png',
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:34',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:35',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: null,
          badges: ['nutrition', 'hydration', 'mood']
        },
        {
          createdAt: '28.04.2017 16:36',
          type: 'TextEntry',
          text: 'Lorem ipsum dolor sit amet',
          image: 'http://3.bp.blogspot.com/-GL-JfPHCj3I/Tb_zrNTOZbI/AAAAAAAAABw/X8BByO04uSY/s1600/Eastern%2BEurope%2BUnicorn.jpg',
          badges: ['nutrition', 'hydration', 'mood']
        }
      ]);
    }, 500);
  });
}


module.exports = {
  getEntries
};
