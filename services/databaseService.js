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
          text: [
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '28.04.2017 16:33'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '28.04.2017 16:34'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'hydration',
              value: '1250ml',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'meals',
              value: '3',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'weight',
              value: '2500g',
              createdAt: '28.04.2017 16:33'
            }
          ],
          milestone: false,
          createdAt: '27.04.2017 16:33'
        },
        {
          text: [
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '28.04.2017 16:33'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '27.04.2017 16:34'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'hydration',
              value: '1050ml',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'headCircumference',
              value: '72cm',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'weight',
              value: '2700g',
              createdAt: '28.04.2017 16:33'
            }
          ],
          milestone: false,
          createdAt: '28.04.2017 16:33'
        },
        {
          text: [
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '28.04.2017 16:33'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '28.04.2017 16:34'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'hydration',
              value: '1450ml',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'meals',
              value: '3',
              createdAt: '28.04.2017 16:33'
            },
            {
              badgeType: 'height',
              value: '94cm',
              createdAt: '28.04.2017 16:33'
            }
          ],
          milestone: false,
          createdAt: '29.04.2017 16:33'
        }
      ]);
    }, 500);
  });
}


module.exports = {
  getEntries
};
