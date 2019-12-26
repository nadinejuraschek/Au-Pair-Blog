// NPM PACKAGES
require('dotenv').config();

const express = require('express');
const ejs = require('ejs');
const lodash = require('lodash');

const app = express();

// CUSTOM MODULES


// PORT
const PORT = process.env.PORT || 8000;

// TEMPORARY content
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

// EJS SETUP
app.set('view engine', 'ejs');

// PARSE
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// STATIC FILES
app.use(express.static('public'));

// var to store all blog entries
let posts = [];

// GET ROUTES
app.get('/', function(req, res) {
    res.render('home', {
        posts: posts
    });
});

app.get('/posts/:postName', function(req, res) {
    let requestedTitle = lodash.lowerCase(req.params.postName);
    posts.forEach(function(post) {
        let storedTitle = lodash.lowerCase(post.title);
        if (requestedTitle === storedTitle) {
            console.log("Match found!");
        } else {
            console.log("Not a match.");
        };
    });
});

app.get('/about', function(req, res) {
    res.render('about', { aboutContent: aboutContent });
});

app.get('/contact', function(req, res) {
    res.render('contact', { contactContent: contactContent });
});

app.get('/compose', function(req, res) {
    res.render('compose');
});

// POST ROUTES

app.post('/compose', function(req, res) {
    const post = {
        title: req.body.postTitle,
        content: req.body.postBody
    };
    // console.log(post);
    posts.push(post);

    res.redirect('/');
});



// LISTEN
app.listen(PORT, function() {
    console.log("Server has started on PORT " + PORT + ".");
});