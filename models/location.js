const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);

/*{
    "driverId": 1,           ----------------------> integer, required
    "latitude": 12.972442,   ----------------------> double, required 
    "longitude": 77.580643   ----------------------> double, required 
}*/
const locationSchema = new mongoose.Schema({
    driverId: { type: Number, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
});

locationSchema.plugin(AutoIncrement, { inc_field: 'location_id' });

module.exports = mongoose.model('location', locationSchema);