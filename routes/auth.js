const express = require('express');
const { body } = require('express-validator');


const authController = require('../controllers/auth');

const User = require('../models/user');

const router = express.Router();

//PUT /auth/signup/
router.put(
    '/signup/',    
    [ // validation middleware uses {check} above
        body('email')
            .isEmail()
            .withMessage('Please enter a valid email')
            .custom((value, {req})=>{

                return User
                        .findOne({email:value})
                        .then(userDoc=>{
                            
                            if(userDoc){
                                return Promise.reject('E-mail already exists!');
                            }
                        });
            }),
        body('userName')
            .trim()
            .not()          // is not
            .isEmpty(),     // empty
        body('number')
            .not()          // is not
            .isEmpty()      // empty
            .isNumeric(),
        body('password')
            .trim()
            .isLength({min:8}),
    ], 
    authController.signup
);

//POST /auth/login/
router.post('/login', authController.login); // not validated becausse checks are done in the controller

module.exports = router;