const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // import config values

const SECRET = process.env.SECRET;

const User = require('../models/user'); // get the model and in there, the user schema


exports.signup = (req, res, next) => {

    const errors = validationResult(req); // fetch all errors caught by express-validator in router

    if(!errors.isEmpty()){ // errors is not empty

        const error = new Error("Validation Failed!");

        error.statusCode = 422;

        throw error;
    }


    const email = req.body.email;
    const userName = req.body.userName;
    const password = req.body.password;
    const number = req.body.number;
    const userType = req.body.userType;


    bcrypt.hash(password, 12) // hash password with salt of 12 characters included
        .then(hashedPassword=>{

            const user = new User({
                email:email, 
                userName:userName,
                password:hashedPassword,
                number:number, 
                userType:userType
                
            })
        
            return user.save();
        })
        .then(result=>{
            res.status(201).json({
                    message:'User Created successfully!', 
                    userId:result._id
                })
        })
        .catch(err=>{
            if(!err.statusCode){ // give error a status code if it is not found 

                err.statusCode = 500;
    
            } // cannot throw error inside a promise, therefore we send it to next middleware
    
            next(err); // go to next middleware with err as an argument passed to it.
        })
};

exports.login = (req, res, next) => {

    const email = req.body.email;
    const password = req.body.password;
    let loadedUser;

    User.findOne({email: email})
        .then(user=> {

            if(!user){ // give error a status code if it is not found 

                const error = new Error('User with this email was not found')

                error.statusCode = 401;

                throw error;

            } // cannot throw error inside a promise, therefore we send catch block

            loadedUser = user; // to make sure user received from db carries through next then blocks, transfer it to variable
            return bcrypt.compare(password, user.password); // check password is correct
        })
        .then(passwordCorrect=>{

            if(!passwordCorrect){// give error a status code if it is not correct 

                const error = new Error('Password and email combination not correct, Please try again');

                error.statusCode = 500;

                throw error;
            } // cannot throw error inside a promise, therefore we send catch block

            // if password was correct, we continue and sign token
            const token = jwt.sign(
                {
                    email: loadedUser.email,
                    userId: loadedUser._id.toString() 
                }, 
                SECRET, // 'secret | developer generated string to sign token'
                {expiresIn:'1h'}
            );

            // This response(res.json()) returns a json format response to the request
            // This response(res.status(201).json()) includes status code to assist request understand outcome since they must decide what view to dispay
            res.status(200).json({
                token:token, // frontend must receive & store this as long as the user is logged in
                userId: loadedUser._id.toString()
            });
        })
        .catch(err =>{

            if(!err.statusCode){ // give error a status code if it is not found 

                err.statusCode = 500;

            } // cannot throw error inside a promise, therefore we send it to next middleware

            next(err); // go to next middleware with err as an argument passed to it.
        });

};
