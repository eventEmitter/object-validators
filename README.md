# object-validators

[![Greenkeeper badge](https://badges.greenkeeper.io/eventEmitter/object-validators.svg)](https://greenkeeper.io/)

description

## installation



## build status

[![Build Status](https://travis-ci.org/eventEmitter/object-validators.png?branch=master)](https://travis-ci.org/eventEmitter/object-validators)


## usage

Set up a validator configuration

    var   ObjectValidators = require('object-validatorss')
        , validators
        , validator;

    // create a new validator configuration that
    // can be extended with custom validators
    // and custom translations
    validators = new ObjectValidators();


    // create a validator for an object
    validators.createValidator({
        name: {
              type: validator.STRING
            , min: 10               // numbers only
            , max: 3000             // numbers only
            , value: 89999          // must have the type defined by the type filed
            , length: 10            // only for strings, buffers
            , minLength: 1          // only for strings, buffers
            , maxLength: 20         // only for strings, buffers
            , required: false       
            , pattern: /hui/gi      // only for strings
        }
        , related: validators.createValidator({});
    });



or use the default configuration


     var  Validator = require('object-validatorss').Validator
        , validator;

    validator = new Validator{
        name: {
              type: validator.STRING
            , min: 10               // numbers only
            , max: 3000             // numbers only
            , value: 89999          // must have the type defined by the type filed
            , length: 10            // only for strings, buffers
            , minLength: 1          // only for strings, buffers
            , maxLength: 20         // only for strings, buffers
            , required: false       
            , pattern: /hui/gi      // only for strings
        }
        , related: new Validator({});
    });



the validator validates either the object or all objects inside an array passed to it. each object may contain key pointing to other validator 

validation is async


    // using promises
    validator.validate(input).then(function() {
        // is valid
    }.bind(this)).catch(function(message) {

    }.bind(this));


    // using a callback
    validator.validate(input, function(isValid, message) {
        // isnt valid
    });