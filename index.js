const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const comments = require('./routes/comments');
<<<<<<< HEAD
=======
const cors = require('cors')
>>>>>>> ba8b216aa8922cc2119fa6b985c6b61fb433b2ea

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/comments', comments);
const port = process.env.PORT || 5500;
app.listen(port, ()=>{
    console.log(`Server Started on port: ${port}`);
});