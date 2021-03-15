const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

/*{
    "name": "",               ----------------------> string, required
    "email": "",              ----------------------> string, required, should be unique
    "phone_number":           ----------------------> number, required, should be unique and equal to 10 digits
    "license_number": "",     ----------------------> string, required, should be unique
    "car_number": ""          ----------------------> string, required, should be unique
}*/
const driverSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique : true },
    phone_number: { type: Number, required: true, unique : true },
    license_number: { type: String, required: true, unique : true },
    car_number: { type: String, required: true, unique : true }
});

driverSchema.plugin(AutoIncrement, { inc_field: 'id' });

module.exports = mongoose.model('driver', driverSchema);