const path = require('path')
const express = require('express')
const app = express();
const port = process.env.PORT || 8000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());


require('./routes/photosRoute')(app)


app.listen( port, ()=> {
    console.log(`Listening to requests on http://localhost:${port}`)
})