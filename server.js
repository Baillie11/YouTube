const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

app.use(bodyParser.urlencoded({ extended: true }));

//Connect to MongoDB
mongoose.connect('mongodb+srv://appadmin:YcbKiiQHvY289rIJ@cluster0.ggcze.mongodb.net/myFirstDatabase', { useNewURLParser: true }, { useUnifiedTopology: true });

//Create a schema
const userSchema = {
    firstName: String,
    email: String
};

const User = mongoose.model('User', userSchema);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
    let newUser = new User({
        firstName: req.body.firstName,
        email: req.body.email
    });
    newUser.save((err) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
});

app.listen(3000, () => {
    console.log('Server started on port 3000');
});