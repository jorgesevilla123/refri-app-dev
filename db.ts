import { connect } from 'mongoose'

//Configurating, initializing and connecting to mongodb

export function startConnection(){
    
 connect('mongodb+srv://Joche:Joche2784@cluster0.a2hsl.mongodb.net/refritest?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false

}).then(db => console.log(`The database has connected succesfully `))
.catch(err => console.log(`Unexpected error at db.ts: ${err} `));

}


