const mongoose = require('mongoose');
const dbConnection = async() => {

    try {
        await mongoose.connect( process.env.DATABASE_MONGO , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true
        });

        console.log('DB Connected');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error starting the Database ');
    }
}

module.exports = {
    dbConnection
}