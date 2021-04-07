const mongoose = require('mongoose');
const connectionURI = (process.env.DATABASE_URI)

const db = mongoose.connection;

mongoose.connect(connectionURI, {
    
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
});


db.on('connected', function(){
    console.log(`connected to MongoDB on ${db.host} on port: ${db.port}`);
});