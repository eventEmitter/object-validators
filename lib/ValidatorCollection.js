!function() {

    var   Class         = require('ee-class')
        , log           = require('ee-log')
        , type          = require('ee-types')
        , fs            = require('fs')
        , path          = require('path')
        , Validator     = require('./Validator');



    module.exports = new Class({

        init: function() {

            // path of this project
            this._basePath = path.join(__dirname, '../');

            // set storage
            this.translations = {};
            this.validators = {};

            // load included stuff
            this._loadValidators();
            this._loadTranslations();
        }



        /**
         * create a new validator
         *
         * @param <Object> rules
         */
        , createValidator: function(rules) {
            return new Validator(this, rules);
        }





        /**
         * set a new translation (new language)
         *
         * @param <String> 2 character languageCode 
         * @param <Object> translations
         */
        , setTranslations: function(languageCode, translations) {
            this.translations[languageCode] = translations;
        }



        /**
         * set a single translation
         *
         * @param <String> 2 character languageCode 
         * @param <String> validatorName
         * @param <String> translation
         */
        , addTranslation: function(languageCode, validatorName, translation) {
            if (!this.translations[languageCode]) this.translations[languageCode] = {};
            if (!this.validators[validatorName]) throw new Error('The validator «'+validatorName+'» does not exist!');

            this.translations[languageCode][validatorName] = translation;
        }




        /**
         * add a new validator
         *
         * @param <String> validatorName
         * @param <Number> priority
         * @param <Function> validator
         */
        , addValidator: function(validatorName, priority, validatorFunction) {
            if (this.validators[validatorName]) throw new Error('the validator «'+validatorName+'» exists already!');

            // save
            this.validators[validatorName] = {
                  priority  : priority
                , validator : validator
            };
        }




        /**
         * load the included validators
         */
        , _loadValidators: function() {
            var   dir   = path.join(this._basePath, 'validators')
                , files = this._readDir(dir);


            // load validators
            files.forEach(function(validatorName) {
                var   validator
                    , priority;

                try {
                    validator = require(path.join(dir, validatorName));
                } catch (err) {
                    throw new Error('Failed to load «'+validatorName+'» validator!');
                }

                // get validator priority
                priority = parseInt(validatorName, 10) || 1000;

                // remove priority
                validatorName = validatorName.replace(/^[0-9-]+/gi, '');

                // save
                this.validators[validatorName] = {
                      priority  : priority
                    , validator : validator
                };
            }.bind(this));
        }



        /**
         * load the included translations
         */
        , _loadTranslations: function() {
            var   dir   = path.join(this._basePath, 'translations')
                , files = this._readDir(dir);


            // load validators
            files.forEach(function(translationName) {
                var translation;

                try {
                    translation = require(path.join(dir, translationName));
                } catch (err) {
                    throw new Error('Failed to load «'+translationName+'» translation!');
                }

                // save
                this.translations[translationName] = translation;
            }.bind(this));
        }



        /**
         * get a list of js files in a dir
         */
        , _readDir: function(dir) {
            return fs.readdirSync(dir).filter(function(file) {
                return /\.js$/gi.test(file);
            }.bind(this));
        }
    });
}();
