
exports.html_validators = {
    auth_wrapper: function (req, res, callback) {
        if (!req.session.jwt) {
            callback("No Auth provided", true, 401)
        } else {
            callback('Auth provided', false, 200)
        }
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