const express = require('express');
var Datastore = require('nedb')
    ,db = new Datastore();

const PORT = 5000;

// BDD
db = {};
db.posts = new Datastore({ filename: "./backend/bdd/posts"});
db.posts.loadDatabase();

db.users = new Datastore({ filename: "./backend/bdd/users"});
db.users.loadDatabase();

// Start Express
const app = express();

app.use(express.json());

// API CRUD POSTS
// Create
app.post('/api/post', (req, res) => {
    db.posts.insert(req.body);
    res.send(req.body);
});

// Read All Posts
app.get('/api/post', (req, res) => {
    db.posts.find({}, (err, docs) => {
        if (err) console.log(err);

        res.send(docs);
    });
});

// Read One Post
app.get('/api/post/:id', (req, res) => {
    db.posts.find({_id: req.params.id}, (err, docs) => {
        if (err) console.log(err);

        res.send(docs);
    });
});

// Update Post
app.patch('/api/post/:id', (req, res) => {
    db.posts.update({_id: req.params.id}, {$set: {...req.body} });
    res.send(req.body);
});

// Delete Post
app.delete('/api/post/:id', (req, res) => {
    db.posts.remove({_id: req.params.id});
});

// API CRUD USERS
// Create user
app.post('/api/user', (req, res) => {
    db.users.insert(req.body);
    res.send(req.body);
});

// Delete User
app.delete('/api/user/:id', (req, res) => {
    db.users.remove({_id: req.params.id});
});



app.listen(PORT, () => {
  console.log(`Example app listening at http://localhost:${PORT}`);
});
