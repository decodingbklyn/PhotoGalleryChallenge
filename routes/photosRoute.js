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
                const photos = response.body.split("\r\n").map( (photo)=> {
                    const getDimensions = photo.slice(photo.length - 7).split('/')
                    const data =  {
                        src: photo,
                        greysrc: `${photo}?grayscale`, 
                        width: getDimensions[0], 
                        height: getDimensions[1]
                    }
                    return data
                })
                return res.send(photos)
            }
        })
    })

}