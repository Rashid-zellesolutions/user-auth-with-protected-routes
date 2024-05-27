const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3008;
const DBURI = "mongodb+srv://rashidalizellesolutions:Sniper+122@mycluster.v4cfzgl.mongodb.net/user-auth";

mongoose.connect(DBURI).then(() => {console.log("Connected")}).catch(err => {console.log(err)});

app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    console.log(`App is running on ${PORT}`)
})