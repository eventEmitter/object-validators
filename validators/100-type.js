!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({

        /**
         * prepare the validator (check against other validators)
         */
        prepare: function() {
            
        }


        /**
         * check the input type
         */
        , isValid: function(input) {
            return type(input) === this.value;
        }
    });


    module.exports.STRING = 'string';
    module.exports.NUMBER = 'number';
    module.exports.BOOLEAN = 'boolean';
    module.exports.OBJECT = 'object';
    module.exports.ARRAY = 'array';
    module.exports.REGEXP = 'regexp';
    module.exports.NULL = 'string';
    module.exports.UNDEFINED = 'undefined';
}();
