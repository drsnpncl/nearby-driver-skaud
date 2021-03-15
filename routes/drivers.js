var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var Driver = require('../service/driverService');
var Location = require('../service/locationService');

/* GET drivers listing. */
router.get('/driver/1', function(req, res, next) {
    return Driver.findDriverByEmail('driver@driver.com').then(result => {
        return res.json(result).status(201);
    }).catch(err => {
        return res.err(err).status(400);
    });
});

/*{
    "name": "",               ----------------------> string, required
    "email": "",              ----------------------> string, required, should be unique
    "phone_number":           ----------------------> number, required, should be unique and equal to 10 digits
    "license_number": "",     ----------------------> string, required, should be unique
    "car_number": ""          ----------------------> string, required, should be unique
}*/
router.post('/register', 
            body('name').not().isEmpty().withMessage('Driver Name is required.'),
            body('email').not().isEmpty().isEmail().withMessage('Unique & Valid Email is required.'),
            body('email').custom(value => {
                return Driver.findDriverByEmail(value).then(driver => {
                    if (driver) {
                        return Promise.reject('E-mail already in use.');
                    }
                });
            }),
            body('phone_number').not().isEmpty().isNumeric().isLength({ min: 10, max:10 }).withMessage('Unique Phone Number is required. Phone Number should be of 10 digits.'),
            body('phone_number').custom(value => {
                return Driver.findDriverByPhoneNumber(value).then(driver => {
                    if (driver) {
                        return Promise.reject('Phone Number already in use.');
                    }
                });
            }),
            body('license_number').not().isEmpty().withMessage('Unique Licence Number is required.'),
            body('license_number').custom(value => {
                return Driver.findDriverByLicenceNumber(value).then(driver => {
                    if (driver) {
                        return Promise.reject('Licence Number already in use.');
                    }
                });
            }),
            body('car_number').not().isEmpty().withMessage('Unique Car Number is required.'),
            body('car_number').custom(value => {
                return Driver.findDriverByCarNumber(value).then(driver => {
                    if (driver) {
                        return Promise.reject('Car Number already in use.');
                    }
                });
            }),
            function(req, res, next) {
                var errors = validationResult(req);
                if (!errors.isEmpty()) {
                    var errArray = '';
                    errors.array().forEach(err => {
                        errArray = errArray + err.msg + ' ';
                    });
                    return res.status(400).json({ status: 'failure', message: errArray });
                }
                return Driver.createDriver(req.body).then(res1 => {
                   return res.status(201).json(res1);
                }).catch(err => {
                    return res.status(400).json({ status: 'failure', message: err });
                });
            }
);

/*{
    "latitude": 12.972442,   ----------------------> double, required 
    "longitude": 77.580643   ----------------------> double, required 
}*/
router.post('/:id/sendLocation/', 
            body('latitude').not().isEmpty().isNumeric('Latitude should be a number.'),
            body('longitude').not().isEmpty().isNumeric().withMessage('Longitude should be a number.'),
            function(req, res, next) {
                var errors = validationResult(req);
                if (!errors.isEmpty()) {
                    var errArray = '';
                    errors.array().forEach(err => {
                        errArray = errArray + err.msg + ' ';
                    });
                    return res.status(400).json({ status: 'failure', message: errArray });
                }
                var location = {
                    driverId: req.params.id,
                    latitude: req.body.latitude,
                    longitude: req.body.longitude
                }
                Location.findLocationByDriverId(location.driverId).then(loc => {
                  if(loc){
                    return Location.updateLocation(location).then(res2 => {
                      return res.status(202).json({ status: 'success' });
                    }).catch(err => {
                      return res.status(400).json({ status: 'failure', message: err });
                  });
                  } else {
                    return Location.saveLocation(location).then(res1 => {
                      return res.status(202).json({ status: 'success' });
                  }).catch(err => {
                      return res.status(400).json({ status: 'failure', message: err });
                  });
                  }
                })
});
module.exports = router;
