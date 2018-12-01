
const User = require('../models/user');
const {normalizeErrors} = require('../helpers/mongoose');
const jwt = require('jsonwebtoken');
const config = require('../config/dev');

exports.auth = function(req,res) {
    const { email, password } = req.body;

    if(!email || !password)
    {
        return res.status(422).send({ errors: [{title:'Data missing!', detail: 'Provide email and password!'}] });
    } 

    User.findOne({email}, function(err, user) {
        if(err){
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }

        if(!user) {
            return res.status(422).send({ errors: [{title:'Invalid User!', detail: 'User does not Exist!' }] });
        }

        if(user.hasSamePassword(password)) {
            const token = jwt.sign({
                userId: user.id,
                username : user.username
            }, config.SECRET, {expiresIn:'1hr'});
            
          return res.json(token);
        }
        else {
            return  res.status(422).send({ errors: [{title:'Wrong DATA!', detail: 'Wrong email or password!' }] });
        }

    });
}

exports.register = function(req,res) {

    const { username, email, password, passwordConfirmation } = req.body;

    if(!email || !password)
    {
        return res.status(422).send({ errors: [{title:'Data missing!', detail: 'Provide email and password!'}] });
    } 
    
    if(password !== passwordConfirmation)
    {
        return res.status(422).send({ errors: [{title:'Password not Matching!', detail: 'Re-type Password Again!'}] });
    }
    
    User.findOne({email}, function(err, existingUser) {
        if(err) {
            return res.status(422).send({'Mongoose': 'handle Mongoose Error in Node'})
        }

        if(existingUser) {
            return res.status(422).send({ errors: normalizeErrors(err.errors) });
        }
    
      const user = new User({
        username,
        email,
        password
      });    

      user.save(function(err){
          if(err) {
            return  res.status(422).send( { errors: normalizeErrors(err.errors) } );
          }

        return  res.json({ 'Registered': "Registration Succesful"});  
      })
    })

}


exports.authMiddleware = function(req, res, next) {

    const token = req.headers.authorization;

    if(token) {
        const user = parseToken(token);

        User.findById(user.userId, function(err,user) {
            if(err) {
                return res.status(422).send( { errors: normalizeErrors(err.errors) } );
            }

            if(user) {
                res.locals.user = user;
                next();
            }
            else {
                return notAuthorized(res);
            }
        })
    }
    else {
        return notAuthorized(res);
    }
}

function parseToken(token) {
    return jwt.verify( token.split(' ')[1], config.SECRET );
}

function notAuthorized(res) {
    return res.status(401).send({ errors: [{title:'Not Authorized!', detail: 'You need to login-In!'}] });
}