!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({
        inherits: BaseValidator


        /**
         * check the input type
         */
        , isValid: function(input) {
            return (this._validType(input) && input >= this.value) ? this.VALID : this.INVALID;
        }


        /**
         *
         */
        , _validType: function(input) {
            return (type.number(input));
        }


         /**
         * returns meaningful error message data
         */
        , getData: function(input) {
            return {
                  expected  : this.value
                , got       : this._validType(input) ? input : 'invalid type: '+type(input)
            };
        }
    });
}();
