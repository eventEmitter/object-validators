!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator;



    BaseValidator = module.exports = new Class({

          UNDETERMINED  : 'undetermined'
        , VALID         : 'valid'
        , INVALID       : 'invalid'
        , ABORT         : 'abort'
        , COMPLETE      : 'complete'



        , init: function(collection, validatorInstance, value, priority, validatorName) {
            this.value              = value;
            this.collection         = collection;
            this.validatorInstance  = validatorInstance;
            this.priority           = priority;
            this.name               = validatorName;
        }



        /**
         * override this to set up your validator
         */
        , prepare: function() {}



        /**
         * validate function
         */
        , isValid: function(value) {
            throw new Error('This validator is not implemented!');
        }



        /**
         * stub
         */
        , getData: function(){}
    });



    BaseValidator.UNDETERMINED  = 'undetermined';
    BaseValidator.VALID         = 'valid';
    BaseValidator.INVALID       = 'invalid';
    BaseValidator.ABORT         = 'abort';
    BaseValidator.COMPLETE      = 'complete';
}();
