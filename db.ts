import * as mongoose from "mongoose"

//Configurating, initializing and connecting to mongodb

mongoose.connect('mongodb://localhost/Refridb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(db => console.log('The database has connected succesfully'))
.catch(err => console.log(`Unexpected error at db.ts: ${err}`));

