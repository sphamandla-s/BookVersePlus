const { body, validationResult } = require('express-validator');

exports.html_validators = {
    auth_wrapper: function (req, res, callback, next) {
        const validations = [
            body('email').isEmail().withMessage('Email must be valid'),
            body('password')
                .trim()
                .isLength({ min: 6 })
                .withMessage('Password must be at least 6 characters long')
        ];

        const validationPromises = validations.map(validation => validation.run(req));
        Promise.all(validationPromises)
            .then(() => {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    callback(errors.array(), true, 500);
                } else {
                    callback();
                }
            })
            .catch(next);
    }
};



exports.html_wrappers = {
    result_wrapper: function (res, jsonResult, hasError, code) {
        if (hasError) {
            res.status(code).type('application/json').json(
                {
                    success: false,
                    statusCode: code,
                    error: jsonResult

                }
            )
        } else {
            res.status(code).type('application/json').json(
                {
                    success: true,
                    statusCode: code,
                    data: jsonResult
                }
            )
        }
    }
}