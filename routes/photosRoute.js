const request = require('request')

module.exports = (app) => {
    const url = 'https://pastebin.com/raw/BmA8B0tY'

    app.get(`/api/photos`, async (req, res) => {
        request({ url: url, json: true, page_size: 10}, (error, response) => {
            if(error){
                console.log('Unable to connect to Photos')
            } else if ( response.body.error){
                console.log('Unable to find any photos')
            } else {
                return res.send({data: response.body.split("\r\n")})
            }
        })
    })

    app.get('/', (res, req) => {
        return res.status(200)
    })
}