

    var   Validator = require('./').Validator
        , log = require('ee-log');


    var types = Validator.getValidator('type');
    

    var validator = new Validator({
        a: {
              type      : types.STRING
            , nullable  : false
            , required  : true
            , pattern     : /hui/gi
            //, length    : 3
            //, minLength : 3
            //, maxLength : 3
        }
        , b: new Validator({
            x: {
                type: types.STRING
            }
        })
    });


    validator.validate({a: 'hui', b: {x: ''}}).then(log).catch(log);



