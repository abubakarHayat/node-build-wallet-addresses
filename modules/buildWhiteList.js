const axios = require('axios')
const transformWhiteList = require('./transformWhiteList')
module.exports = async function buildWhiteList (contractAddress, type, withTokens, oldObj) {

  const response = axios.get(`https://${type}-mainnet.g.alchemy.com/nft/v2/${process.env.URL_KEY}/getOwnersForCollection?contractAddress=${contractAddress}&withTokenBalances=${withTokens}`)
  .then((res) => res.data)
  .catch((err) => console.log(err))

  const ObjData = await response

  const whiteList = transformWhiteList(ObjData.ownerAddresses)
  return { ...oldObj, ...whiteList }
}
