const getWalletInfo = require('./modules/getWalletInfo')
const buildWhiteList = require('./modules/buildWhiteList')
const fs = require('fs')

require('dotenv').config()

// driver function
function driver  () {

   fs.readFile('./source.json', 'utf-8', async (err, jsonString) => {
    if (err) {
      console.log(err)
    }else{
      try {
        const addresses = JSON.parse(jsonString)
        let completeWhiteList = {}

        for (const key in addresses) {
          await getWalletInfo(key, addresses[key], false)
          completeWhiteList = await buildWhiteList(key, addresses[key], false, completeWhiteList)
        }

        //write whiteList
        try {
         fs.writeFile(`./whiteListedData.json`, JSON.stringify(completeWhiteList), (err) => {
           if (err){
             console.log(err)
           }
           console.log('White list file written!')
         })
        }catch (err){
          console.log(err)
        }


      }catch (err){
        console.log(err)
      }
    }
  })

}
driver()
