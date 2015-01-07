!function() {


    module.exports = {
          _no_input                     : 'Input has the wrong type, failed to test any properties!'
        , _invalid_property             : 'The property $property has no validators and should not be avaliable on the object $index!'
        , required                      : 'The property $property $index is required!'
        , nullable                      : 'The property $property $index is not nullable!'
        , type                          : 'The property $property $index has the invalid type! Expected $expected, got $got!'
        , length                        : 'The property $property $index should have a length of $expected, got $got!'
        , minLength                     : 'The property $property $index should have a length of at least $expected, got $got!'
        , maxLength                     : 'The property $property $index should have a length of not more than $expected, got $got!'
        , min                           : 'The property $property $index should have a value of at least $expected, got $got!'
        , max                           : 'The property $property $index should have a value of not more than $expected, got $got!'
        , value                         : 'The property $property $index should have the value $expected, got $got!'
        , pattern                       : 'The property $property $index should match the pattern $expected, got $got!'
    };
}();
