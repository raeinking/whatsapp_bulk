require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { Users } = require('./modul/users');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());




app.post('/newUser', async (req, res) => {
    try {
        // Calculate expiration date: current date + 1 year
        const expireDate = new Date();
        expireDate.setFullYear(expireDate.getFullYear() + 1);

        // Create a new user
        const newUser = new Users({
            email: req.body.email,
            isBand: req.body.isBand,
            date: new Date(),
            expire_date: expireDate
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).send('User created successfully.');
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send('Error creating user.');
    }
});




mongoose.connect(process.env.MONGODB_URL)
  .then(() => console.log('Connected!'));


app.listen(process.env.PORT, () => console.log(`Example app listening on port ${process.env.PORT}!`))