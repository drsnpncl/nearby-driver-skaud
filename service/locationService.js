const mongoose = require('mongoose');
const Location = require('../models/location');
const haversine = require('haversine');
const Driver = require('./driverService');

async function findLocationByDriverId(id) {
    try{
        return await Location.findOne({ driverId: id });
    } catch(err) {
        return { message: err.message };
    }
}

async function saveLocation(location) {
    return await Location.create(location);
}

async function updateLocation(location) {
    return await Location.findOneAndUpdate({ driverId: location.driverId }, { latitude: location.latitude, longitude: location.longitude });
}

async function getNearbyDrivers(location) {
    try {
        var allDrivers = await Location.find();
        var filterDrivers = [];
        await Promise.all(allDrivers.map(async driver => {
            const endPoint = {
                latitude: driver.latitude,
                longitude: driver.longitude
            }
            if(haversine(location, endPoint) <= 4) {
                var driverDetails = await Driver.findDriverById(driver.driverId);
                filterDrivers.push(driverDetails);
            }
        }));
        return { available_cabs: filterDrivers };
    } catch (err) {
        return { message: err.message };
    }
}

module.exports = { findLocationByDriverId,  saveLocation, updateLocation, getNearbyDrivers }