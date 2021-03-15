const mongoose = require('mongoose');
const Driver = require('../models/driver');

async function findDriverById(id) {
    try{
        return await Driver.findOne({ id: id }).select({ name: 1, car_number: 1, phone_number: 1, _id: 0 });
    } catch(err) {
        return { message: err.message };
    }
}

async function findDriverByEmail(email) {
    try{
        return await Driver.findOne({ email: email });
    } catch(err) {
        return { message: err.message };
    }
}

async function findDriverByPhoneNumber(phone_number) {
    try{
        return await Driver.findOne({ phone_number: phone_number });
    } catch(err) {
        return { message: err.message };
    }
}

async function findDriverByLicenceNumber(licence_number) {
    try{
        return await Driver.findOne({ licence_number: licence_number });
    } catch(err) {
        return { message: err.message };
    }
}

async function findDriverByCarNumber(car_number) {
    try{
        return await Driver.findOne({ car_number: car_number });
    } catch(err) {
        return { message: err.message };
    }
}

async function createDriver(driver) {
    return await Driver.create(driver);
}

module.exports = { findDriverByEmail, findDriverByPhoneNumber, findDriverByLicenceNumber, findDriverByCarNumber, createDriver, findDriverById }