!function() {

	var   Class 		= require('ee-class')
		, log 			= require('ee-log')
        , Promise       = (Promise || require('es6-promise').Promise)
        , type          = require('ee-types');



	module.exports = new Class({

        // default language for validation error messages
        _language: 'en'



        // set up the validator
		, init: function(collection, rules) {
            if (!type.object(rules)) throw new Error('The contructor expects a rules object!');

            // reference to the collection which holds translations
            // and the validators
            this.collection = collection;
            this.translations = collection.translations;
            this.validators = collection.validators;

            // storage
            this._validators = {};

            // create rulesets
            this._buildRules(rules);
		}





        /**
         * build optimized rulesets from the rule object
         *
         * @param <object> rules
         */
        , _buildRules: function(rules) {
            Object.keys(rules).forEach(function(propertyName) {
                var validatorList = [];

                this._validators[propertyName] = [];

                // loop through validators
                Object.keys(rules[propertyName]).forEach(function(validatorName) {
                    if (!this.collection.validators[validatorName]) throw new Error('Cannot validate property «'+propertyName+'» with the validator «'+validatorName+'». The validator does not exist!');

                    validatorList.push({
                          priority  : this.collection.validators[validatorName].priority
                        , validator : this.collection.validators[validatorName].validator
                        , value     : rules[propertyName][validatorName]
                        , name      : validatorName
                    });
                }.bind(this));

                // sort
                validatorList.sort(function(a, b) {return a.priority - b.priority});

                // initialize & store
                validatorList.forEach(function(validator) {
                    this._validators[propertyName].push(new validator.validator(this.collection, this, validator.value, validator.priority, validator.name));
                }.bind(this));

                // prepare the validator, check for async
                this._validators[propertyName].forEach(function(validatorInstance) {
                    validatorInstance.prepare(this._validators[propertyName]);

                    // check if the function accepts on or two parameters
                    validatorInstance.isAsync = /function\s*\([^,]+\,[^\)]+/gi.test(validatorInstance.isValid.toString());
                }.bind(this));
            }.bind(this));
        }



        /**
         * set the language that should be used for all coming validations
         *
         * @param <string> 2 character language code
         */
        , language: function(languageCode) {
            this._language = languageCode;
        }



        /**
         * execute the validation on an object or array
         *
         * @param <mixed> object or array
         * @param <function> optional callback
         */
        , validate: function(input, callback) {
            var promise, validationPromise;

            // make sure 
            if (!callback) {
                promise = new Promise(function(resolve, reject) {
                    callback = function(status, reason) {
                        if (!status) reject(reason);
                        else resolve(true);
                    }
                }.bind(this));
            }


            if (type.array(input)) {
                validationPromise = Promise.all(input.map(function(item, index) {
                    return this._validate(item, index, this._language);
                }.bind(this)));
            }
            else validationPromise = this._validate(input, null, this._language);

            // handle feedback
            validationPromise.then(function() {
                callback(true);
            }).catch(function(reason) {
                callback(false, reason);
            });

            // return the promise
            return promise;
        }




        /**
         * private validate function
         */
        , _validate: function(input, index, language) {
            if (type.object(input)) {
                return Promise.all(Object.keys(input).map(function(propertyName) {
                    if (!this._validators[propertyName]) return Promise.reject(this._fillText(language, '_invalid_property', '', propertyName, index));
                    else if (this._validators[propertyName].length === 0) return Promise.resolve();
                    else {
                        return new Promise(function(resolve, reject) {
                            var   count = this._validators[propertyName].length
                                , validatorIndex = 0
                                , executor;

                            // execute validators in the order they are in the array, 
                            // no parralell work!
                            executor = function() {
                                this._executeValidator(input[propertyName], this._validators[propertyName][validatorIndex], propertyName, index, language, function(continueValidation, message) {
                                    if (!continueValidation) {
                                        if (message) reject(message);
                                        else resolve();
                                    }
                                    else {
                                        if (++validatorIndex === count) resolve();
                                        else executor();
                                    }
                                }.bind(this));                                
                            }.bind(this);

                            // start
                            executor();
                        }.bind(this));
                    }
                }.bind(this)));
            }
            else return Promise.reject(this._fillText(language, '_no_input', '', ''));
        }   



        /**
         * execute an actual validator
         */
        , _executeValidator: function(value, validator, propertyName, index, language, callback) {
            if (!validator.isAsync) {
                this._evaluateResult(validator.isValid(value), value, null, validator, propertyName, index, language, callback);
            }
            else {
                validator.validate(value, function(isValid, data) {
                    this._evaluateResult(validator.isValid(value), value, data, validator, propertyName, index, language, callback);
                }.bind(this));
            }
        }



        /**
         * check the output of the validator
         */
        , _evaluateResult: function(status, input, data, validator, propertyName, index, language, callback) {
            switch(status) {
                case 'valid':
                case 'undetermined':
                    callback(true);
                    break;

                case 'invalid':
                case 'abort':
                    callback(false, this._fillText(language, validator.name, validator.name, propertyName, index, validator.isAsync ? data : validator.getData(input)));
                    break;

                case 'complete':
                    callback(false);
                    break;

                default:
                    callback(false, this._fillText(language, validator.name, validator.name, propertyName, index, validator.isAsync ? data : validator.getData(input)));
            }
        }



        /**
         * fill message text
         */
        , _fillText: function(language, id, validatorName, propertyName, index, data) {
            var message;

            if (!this.translations[language] || !this.translations[language][id]) {
                if (this.translations.en && this.translations.en[id]) message = this.translations.en[id];
                else message = 'Failed to get a validation message for the validator «'+id+'»!'
            }
            else message = this.translations[language][id];

            message = message.replace(/\$validator/gi, '«'+validatorName+'»');
            message = message.replace(/\$index/gi, !type.null(index) ? ' at index «'+index+'»' : '');
            message = message.replace(/\$property/gi, '«'+propertyName+'»');


            if (data) {
                Object.keys(data).forEach(function(key) {
                     message = message.replace(new RegExp('\\$'+key, 'gi'), '«'+data[key]+'»');
                }.bind(this));
            }

            return message.replace(/\s{2,}/gi, ' ').trim();
        }
	});
}();
