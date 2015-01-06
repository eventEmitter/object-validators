!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({
        inherits: BaseValidator


        // don't check any forward rules if this rule is ok
        , stopValidation: true

        // ignore if this is false
        , isOptional: true


        /**
         * check the input type
         */
        , isValid: function(input) {
            return input === null;
        }
    });
}();
