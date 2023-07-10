var _httpWrapper = require('../wrappers/httphandler');
var _services = require('../services/auth_service');

exports.signup = function (req, res) {
    _httpWrapper.html_validators.auth_wrapper(req, res, function (jsonResult, hasError, code) {
        if (hasError === true) {
            _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
        } else {
            _services.signup(req, function (jsonResult, hasError, code) {
                _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
            })
        }
    })

}


exports.login = function (req, res) {
    _httpWrapper.html_validators.auth_wrapper(req, res, function (jsonResult, hasError, code) {
        if (hasError) {
            _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
        } else {
            _services.login(req, function (jsonResult, hasError, code) {
                _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
            })
        }
    })
}

exports.current_user = function (req, res) {
    _services.current_user(req, function (jsonResult, hasError, code) {
        _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
    })
}

exports.logout = function (req, res) {
    _services.logout(req, function (jsonResult, hasError, code) {
        _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
    })
}