const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI;

mongoose.connect(MONGODB_URI,{useUnifiedTopology: true, useNewUrlParser: true, useNewUrlParser:true, useCreateIndex:true}, (err)=>{
    
    if (err) throw err ;
    console.log('DB is conected')
})
