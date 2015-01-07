!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({
        inherits: BaseValidator

        /**
         * prepare the validator (check against other validators)
         */
        , prepare: function(validatorList) {
            /*validatorList.forEach(function(validator) {
                if (validator.name === 'nullable') {
                    this.nullable = validator.value;
                }
                else if (validator.name === 'required') {
                    this.required = validator.value;
                }
            }.bind(this));*/
        }


        /**
         * check the input type
         */
        , isValid: function(input) {
            return type(input) === this.value ? this.VALID : this.INVALID;
        }


        /**
         * returns meaningful error message data
         */
        , getData: function(input) {
            return {
                  expected  : this.value
                , got       : type(input)
            };
        }
    });
    


    module.exports.STRING       = 'string';
    module.exports.NUMBER       = 'number';
    module.exports.BOOLEAN      = 'boolean';
    module.exports.OBJECT       = 'object';
    module.exports.ARRAY        = 'array';
    module.exports.REGEXP       = 'regexp';
    module.exports.BUFFER       = 'buffer';
    module.exports.NULL         = 'null';
    module.exports.UNDEFINED    = 'undefined';
}();
