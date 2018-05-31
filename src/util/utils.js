function isEmptyObj(it) {
  return !Object.keys(it).length;
}

module.exports = {
  isEmptyObj: isEmptyObj
};