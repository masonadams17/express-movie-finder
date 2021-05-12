let mongoose = require('mongoose')

let movieSchema = mongoose.Schema({
    imdb_title_id:{
        type: String
    },
    title:{
        type: String,
    },
    original_title:{
        type: String,
    },
    year:{
        type: String,
    },
    date_published:{
        type: String
    },
    genre:{
        type: String,
    },
    duration:{
        type: String
    },
    language:{
        type: String
    },
    country:{
        type: String
    },
    director:{
        type: String,
    },
    writer:{
        type: String
    },
    description:{
        type: String,
    },
    actors:{
        type: String,
    },
    reviews_from_critics:{
        type: String,
    }

})

let Movie = module.exports = mongoose.model('Movie', movieSchema, 'movies' )