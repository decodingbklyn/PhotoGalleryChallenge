// const request = require('request')


// const getPhotos = ()=> {
//     const url = 'https://pastebin.com/raw/BmA8B0tY'

//     request({ url: url, json: true}, (error, response) => {
//         if(error){
//             console.log('Unable to connect to Photos')
//         } else if ( response.body.error){
//             console.log('Unable to find any photos')
//         } else {
//             return {data: response.body.split("\r\n")}
//         }
//     })

// }

// module.exports = getPhotos