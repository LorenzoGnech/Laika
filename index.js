const app = require('./Backend/app');
const mongoose = require('mongoose');

let port = process.env.PORT || 3000;

try {
    mongoose.connect(process.env.DB_URL, {useNewUrlParser: true, useUnifiedTopology: true}, () =>
    console.log("connected"));    
}catch (error) { 
    console.log("could not connect");
}

app.listen(port, function() {
    console.log('Server running on port ', port);
});