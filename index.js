const connectDB = require('./startup/db');
const express = require('express');
const app = express();
const comments = require('./routes/comments');
const cors = require('cors')

connectDB();

app.use(cors());
app.use(express.json());
app.use('/api/comments', comments);
const port = process.env.PORT || 5500;
app.listen(port, ()=>{
    console.log(`Server Started on port: ${port}`);
});