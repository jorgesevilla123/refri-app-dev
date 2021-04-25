import { connect } from 'mongoose'

//Configurating, initializing and connecting to mongodb

export function startConnection(){
    
 connect(process.env.REFRI_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(db => console.log(`The database has connected succesfully `))
.catch(err => console.log(`Unexpected error at db.ts: ${err} `));

}


