function pad(val) {
  const valString = `${val}`;
  if (valString.length < 2) {
    return `0${valString}`;
  }
  return valString;
}

module.exports = {
  pad
};
