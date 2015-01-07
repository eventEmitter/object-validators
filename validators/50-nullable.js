!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({
        inherits: BaseValidator

        /**
         * set the validator ip
         */
        , init: function init() {
            init.super.apply(this, arguments);

            this.nullable = !!this.value;
        }




        /**
         * check the input type
         */
        , isValid: function(input) {
            if (this.nullable) return input === null ? this.COMPLETE : this.VALID;
            else return input === null ? this.INVALID : this.VALID;
        }
    });
}();
