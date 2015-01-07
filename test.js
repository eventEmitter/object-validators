

    var ValidatorCollection = require('./')
        , log = require('ee-log');



    var collection = new ValidatorCollection();



    var validator = collection.createValidator({
        a:{
              type      : collection.getValidator('type').STRING
            , nullable  : false
            , required  : true
            , length    : 3
            , minLength : 3
            , maxLength : 3
        }
    });


    validator.validate({a: 'ilf'}).then(log).catch(log);