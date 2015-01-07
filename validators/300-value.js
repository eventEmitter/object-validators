!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , assert        = require('assert')
        , BaseValidator = require('../lib/BaseValidator');



    module.exports = new Class({
        inherits: BaseValidator

        /**
         * set the validator ip
         */
        , init: function init() {
            init.super.apply(this, arguments);

            this.type = type(this.value);
        }


        /**
         * check the input type
         */
        , isValid: function(input) {
            if (this._validType(input)) {
                switch (type(input)) {
                    case 'string':
                    case 'number':
                    case 'boolean':
                    case 'null':
                    case 'undefined':
                        return input === this.value ? this.VALID : this.INVLAID;

                    case 'date':
                        return input.getTime() === this.type.getTime() ? this.VALID : this.INVLAID;

                    case 'object':
                    case 'array':
                        return assert.deepEqual(input, this.value) ? this.VALID : this.INVLAID;

                    case 'buffer':
                        return assert.equal(input, this.value) ? this.VALID : this.INVLAID;

                    default:
                        return this.INVALID;
                }
            }
            else return this.INVALID;
        }


        /**
         *
         */
        , _validType: function(input) {
            return (type(input) === this.type);
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
