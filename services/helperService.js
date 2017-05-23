import moment from 'moment';


function pad(val) {
  const valString = `${val}`;
  if (valString.length < 2) {
    return `0${valString}`;
  }
  return valString;
}

function transformCharts(user, charts) {
  const dateOfBirth = moment(user.dateOfBirth, 'DD.MM.YYYY').format();

  // Weight data
  const weightBadges = charts.filter(badge => badge.badgeType === 'weight');
  const chartDataWeight = weightBadges.reduce((acc, weightBadge) => {
    const dateDiff = moment(weightBadge.createdAt).diff(dateOfBirth, 'days') / 30;
    const data = {
      x: dateDiff,
      y: Number(weightBadge.value),
      unit: weightBadge.unit,
      createdAt: weightBadge.createdAt
    };

    acc.push(data);
    return acc;
  }, []);

  // Height data
  const heightBadges = charts.filter(badge => badge.badgeType === 'height');
  const chartDataHeight = heightBadges.reduce((acc, heightBadge) => {
    const dateDiff = moment(heightBadge.createdAt).diff(dateOfBirth, 'days') / 30;
    const data = {
      x: dateDiff,
      y: Number(heightBadge.value),
      unit: heightBadge.unit,
      createdAt: heightBadge.createdAt
    };

    acc.push(data);
    return acc;
  }, []);

  // Head circumference data
  const headCircumferenceBadges = charts.filter(badge => badge.badgeType === 'headCircumference');
  const chartDataHeadCircumference = headCircumferenceBadges.reduce((acc, headCircumferenceBadge) => {
    const dateDiff = moment(headCircumferenceBadge.createdAt).diff(dateOfBirth, 'days') / 30;
    const data = {
      x: dateDiff,
      y: Number(headCircumferenceBadge.value),
      unit: headCircumferenceBadge.unit,
      createdAt: headCircumferenceBadge.createdAt
    };

    acc.push(data);
    return acc;
  }, []);

  return {
    weight: chartDataWeight,
    height: chartDataHeight,
    headCircumference: chartDataHeadCircumference
  };
}

module.exports = {
  pad,
  transformCharts
};
