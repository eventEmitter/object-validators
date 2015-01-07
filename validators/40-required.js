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

            this.required = !!this.value;
        }



        /**
         * check the input type
         */
        , isValid: function(input) {
            if (this.required) return type.undefined(input) ? this.INVALID : this.VALID;
            else return type.undefined(input) ? this.COMPLETE : this.VALID;
        }
    });
}();
