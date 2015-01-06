# object-validators

description

## installation



## build status

[![Build Status](https://travis-ci.org/eventEmitter/object-validators.png?branch=master)](https://travis-ci.org/eventEmitter/object-validators)


## usage


    var   ValidatorCollection = require('object-validatorss')
        , collection
        , Validator
        , validator;

    // create a new validator collection that
    // can be extended with custom validators
    // and custom translations
    collection = new ValidatorCollection();

    // get the validator class
    Validator = collection.Validator;


    // create a validator for an object
    validator = new Validator({
        name: {
              type: validator.STRING
            , min: 10               // numbers only
            , max: 3000             // numbers only
            , value: 89999          // must have the type defined by the type filed
            , length: 10            // only for strings, buffers
            , minLength: 1          // only for strings, buffers
            , maxLength: 20         // only for strings, buffers
            , required: false       
            , nullable: true
            , pattern: /hui/gi      // only for strings, buffers
            , validator: function() {}
        }
        , related: new Validator();
    });


    // the validator function is treated as async if it accepts two parameters
    // parameter 1 is the input, parameter 2 the callback

    // the validator validates either the object or all objects
    // inside an array passed to it. each object may contain key pointing to 
    // other validator



    // sync validation, will throw an error as soon 
    // an async validator is encountered
    validator.validate(input);



    // async, using promises
    validator.validate(input).then().catch();


    // async using a callback
    validator.validate(input, cb);