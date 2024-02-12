const mongooose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CNN,{});
        console.log('base de datos conectada');
    } catch (e) {
        
    }   
}