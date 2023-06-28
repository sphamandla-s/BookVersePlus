const express = require('express');
const app = express();
const pJson = require('./package.json');
const port = 3000



app.get('/api/users/user', (req,res)=>{
    res.send('Siphamandla Sibonelo Mdletshe')
})


app.listen(port, () => {
    console.log(`Server version ${pJson.version} started at port ${port}`)
})