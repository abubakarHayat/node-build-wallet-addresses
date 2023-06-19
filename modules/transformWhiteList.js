const VAL = '500'
module.exports = function transformWhiteList(data) {
  let whiteList = {}
  data.forEach(addr => {
    whiteList[addr] = VAL
  })
  return whiteList
}
