

    var ValidatorCollection = require('./')
        , log = require('ee-log');



    var collection = new ValidatorCollection();



    var validator = collection.createValidator({
        a:{
            type: collection.getValidator('type').NUMBER
        }
    });

    validator.validate({a:1}).then(log).catch(log);