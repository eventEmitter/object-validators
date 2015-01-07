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
            this.value.lastIndex = 0;
            return (this._validType(input) && this.value.test(input)) ? this.VALID : this.INVALID;
        }


        /**
         *
         */
        , _validType: function(input) {
            return (type.string(input));
        }


         /**
         * returns meaningful error message data
         */
        , getData: function(input) {
            return {
                  expected  : 'value matching '+this.value.toString()
                , got       : this._validType(input) ? input : 'invalid type: '+type(input)
            };
        }
    });
}();
