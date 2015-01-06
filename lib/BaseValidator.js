!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types');



    module.exports = new Class({

        init: function(collection, validatorInstance, value, priority, validatorName) {
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
}();
