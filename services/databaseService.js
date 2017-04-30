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
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              emotion: 'neutral',
              createdAt: '2017-04-28T16:34:42.732Z'
            },
            {
              emotion: 'happy',
              createdAt: '2017-04-28T16:35:42.732Z'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'hydration',
              value: '1250ml',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'meals',
              value: '3',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'weight',
              value: '2500g',
              createdAt: '2017-04-28T16:33:42.732Z'
            }
          ],
          milestone: false,
          createdAt: '2017-04-27T15:00:42.732Z'
        },
        {
          text: [
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '2017-04-28T16:33:42.732Z'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'hydration',
              value: '1050ml',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'headCircumference',
              value: '72cm',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'weight',
              value: '2700g',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'nursing',
              value: '4:38 min',
              createdAt: '2017-04-28T16:33:42.732Z'
            }
          ],
          milestone: false,
          createdAt: '2017-04-28T16:33:42.732Z'
        },
        {
          text: [
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '2017-04-28T16:34:42.732Z'
            },
            {
              value: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
              createdAt: '2017-04-28T16:35:42.732Z'
            }
          ],
          badges: [
            {
              badgeType: 'diapers',
              value: '5',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'hydration',
              value: '1450ml',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'meals',
              value: '3',
              createdAt: '2017-04-28T16:33:42.732Z'
            },
            {
              badgeType: 'height',
              value: '94cm',
              createdAt: '2017-04-28T16:33:42.732Z'
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
