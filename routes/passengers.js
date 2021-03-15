var express = require('express');
var router = express.Router();
var { body, validationResult  } = require('express-validator'); 
var Location = require('../service/locationService');

router.post('/available_cabs/',
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
                Location.getNearbyDrivers(req.body).then(res3 => {
                  if(res3.available_cabs.length != 0) {
                    return res.status(200).json(res3);
                  } else {
                    return res.status(200).json({ message: 'No cabs available!' });
                  }
                }).catch(err => {
                  return res.status(400).json({ status: 'failure', message: err });
                });
});

module.exports = router;
