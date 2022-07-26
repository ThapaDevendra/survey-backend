require('dotenv').config(); //Loads .env file contents into process.env.
const jwt = require('jsonwebtoken');


//AUTHORIZATION TOKEN SAMPLE
//Authorization: Bearer <access_token>

//verify and authorize passed token from frontend 
exports.verifyToken = (req, res, next) => {
    //get auth header dataValues
    const authHeader = req.headers['authorization']; 
    const token = authHeader && authHeader.split(' ')[1];
    console.log('this is token.....', token);
    if(!token) return res.status(403).send({
        message: 'No token provided'
    });

    jwt.verify(token, process.env.SECRET_TOKEN, (err, user) => {
        if(err) return res.status(401).send({
            message: 'Unauthorized'
        });
        req.user = user
        next();
    });

}; 