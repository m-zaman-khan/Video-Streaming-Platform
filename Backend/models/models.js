    const mongoose = require('mongoose');

    const movieSchema = new mongoose.Schema({
        title: String,
        description: String,
        duration: String,
        age: String,
        release: String,
        genre: String,
        videoUrl: String,
        trailerUrl: String,
        imageUrl: String
    });

    const tvSchema = new mongoose.Schema({
        title: String,
        description: String,
        age: Number,
        release: String,
        genre: String,
        trailerUrl: String,
        imageUrl: String,
        episodes: [{
            title: String,
            description: String,
            videoUrl: String
        }]
    });
    
    const TV = mongoose.model('TV', tvSchema);
    

    const Movie = mongoose.model('Movie', movieSchema);
   

    module.exports = { Movie, TV };
