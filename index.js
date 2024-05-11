const express = require('express')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 5000





app.get('/', (req, res)=>{
    res.send('Volunteer Server is Running')
})

app.listen(port, (req, res)=>{
    console.log('Server is running on port', port)
})
