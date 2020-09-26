var jwt = require('jsonwebtoken')


//this is the sender part
var secretKey = 'secret-key'


var payload = {
    name: 'George'
};

//Creating a json web token

// var newToken = jwt.sign(payload, secretKey);

// console.log("JWT created!", newToken);



//Verifying the json web token using the secret key we created
//This is the reciever part 
var currentToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR2VvcmdlIiwiaWF0IjoxNjAwNjA3Njk0fQ.iii3NPA5l66z4_TUNHm6X3dnPfVRW08jK2ka862laN8'

const verify = jwt.verify(currentToken, secretKey)



console.log("Decoded JWT: ", verify);