const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
let dotenv = require('dotenv');
dotenv.config();


url = 'mongodb+srv://cloud3:' + process.env.MONGO_PASSWORD + '@cluster0.79bpm.mongodb.net/djangoMovieFinder';
mongoose.connect(url, {useNewUrlParser:true, useUnifiedTopology: true});
let db = mongoose.connection;

//check connection
db.once('open', function(){
    console.log('Connected to MongoDB');
});

db.on('error', function(err){
    console.log(err);
});

//Bring in models
let Movie = require('./models/Movie');


//init app
const app = express();

app.set('views', path.join(__dirname, 'views') );
app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))

// set home route
app.get('/', async function(req, res) {
    await Movie.find({country: {$in :/USA/}}, function(err, result){
        if (err) {
            console.log('Error with query')
        }
        else{
            res.render('index', 
            {
            movies: result
            })
        }
        
    }).limit(100).sort({year: -1})
    }       
);


//add Submit Search Route
app.get('/search',async function(req, res){
    console.log(req.query.search)
    let re = new RegExp(req.query.search)
    await Movie.find({$text: {$search: req.query.search}},{"score": {$meta: "textScore"}}, function(err, result){
        if(err){
            console.log('Error with query')
        }
        else{
            res.render('searchResults',
            {
                movies: result
            })
        }
    }).limit(1000).sort({score:{$meta:"textScore"}})
    }
);

app.get('/search/:id', async function(req, res){
    console.log(req.params.id)

    await Movie.findOne({imdb_title_id: req.params.id}, function(err, result){
        if(err){
            console.log('unable to get movie')
        }
        else{
            console.log(result)
            res.render('movie',
            {
                movie: result
            })
        }
    })
})

process.on('exit', function(){
    db.close()
})

// Start Server
app.listen(3000, function(){
    console.log('Server started on port 3000 ... ');
});
