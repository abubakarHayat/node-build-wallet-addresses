const axios = require('axios')
const fs = require('fs')

module.exports = async function getWalletInfo (contractAddress, type, withTokens) {

  const response = axios.get(`https://${type}-mainnet.g.alchemy.com/nft/v2/${process.env.URL_KEY}/getOwnersForCollection?contractAddress=${contractAddress}&withTokenBalances=${withTokens}`)
    .then((res) => res.data)
    .catch((err) => console.log(err))

  const JSONData = JSON.stringify(await response)


  fs.mkdir(contractAddress, (err) => {
    console.log('Directory made!')
    if (withTokens) {
      fs.writeFile(`./${contractAddress}/dataWithBalance.json`, JSONData, (err) => {
        if (err) {
          console.log(err)
        }
        console.log('file written')
      })
    }else {
      fs.writeFile(`./${contractAddress}/dataWithoutBalance.json`, JSONData, (err) => {
        if (err) {
          console.log(err)
        }
        console.log('file written')
      })

    }
  })
}

