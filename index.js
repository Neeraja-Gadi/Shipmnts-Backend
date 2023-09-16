const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');

const express = require('express');

const app = express();
const userRoutes = require('./src/router/userRouter');
const questionRoutes = require('./src/router/questionsRouter');




// console.log(process.env.DATABASE)

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://maxxhimanshu:himanshu@cluster0.sg6kw.mongodb.net/Shipmnts?retryWrites=true" , {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      
    })
    .then(() => {
        console.log('MongoDB Is Connected To Hiclousia');
    })
    .catch((err) => console.log(err));

app.use(express.json()); 
app.use('/api/users', userRoutes);
app.use('/api/qa', questionRoutes);




const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});




