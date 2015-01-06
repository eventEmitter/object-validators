

    var ValidatorCollection = require('./')
        , log = require('ee-log');



    var collection = new ValidatorCollection();



    var validator = collection.createValidator({
        a:{
              type      : collection.getValidator('type').NUMBER
            , nullable  : true
            , required  : false
        }
    });

    validator.validate({a: 345}).then(log).catch(log);