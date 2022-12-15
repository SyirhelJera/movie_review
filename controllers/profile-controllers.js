const {User, validate} = require('../models/User');


const addMovieWatchlist = (req,res, next) =>{
    const {error} = validate   (req.body);
    if(error) return res.status(422).send(error.details[0].message);

    let User = await new User({
        
    })


} 






module.exports = {
    addMovieWatchlist
}

