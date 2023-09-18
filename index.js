require("dotenv").config({path: "./.env"});
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const userRoutes = require('./src/router/userRouter');
const questionRoutes = require('./src/router/questionsRouter');

//  console.log(process.env.DATABASE )

// DATABASE CONNECTION
mongoose.connect( process.env.DATABASE, {
        useNewUrlParser: true      
    })
    .then(() => {
        console.log('MongoDB Is Connected To Hiclousia');
    })
    .catch((err) => console.log(err));

app.use(cors())

app.use(express.json()); 
app.use('/api/users', userRoutes);
app.use('/api/qa', questionRoutes);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




