const request = require('request')

module.exports = (app) => {
    const url = 'https://pastebin.com/raw/BmA8B0tY'

    app.get('/', (res, req)=>{
        res.send.status(200)
    })

    app.get(`/api/photos`, async (req, res) => {
        request({ url: url, json: true }, (error, response) => {
            if(error){
                console.log('Unable to connect to Photos')
            } else if ( response.body.error){
                console.log('Unable to find any photos')
            } else {
                let greyPhotos = response.body.split("\r\n").map(element => `${element}?grayscale`)
                return res.send({
                    data: response.body.split("\r\n"),
                    greyData: greyPhotos
                })
            }
        })
    })
}