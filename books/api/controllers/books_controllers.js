const _services = require('../services/books_services')
const _httpWrapper = require('../wrappers/httphandler')

exports.create_sell = function (req, res) {
    _httpWrapper.html_validators.auth_wrapper(req, res, function (jsonResult, hasError, code) {
        if (hasError === true) {
            _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
        } else {
            _services.create_sell(req, function (jsonResult, hasError, code) {
                _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
            })
        }
    })
}

exports.get_books = function (req, res) {
    _httpWrapper.html_validators.auth_wrapper(req, res, function (jsonResult, hasError, code) {
        if (hasError === true) {
            _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
        } else {
            _services.get_books(req, function (jsonResult, hasError, code) {
                _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
            })
        }
    })

}

exports.get_book_by_id = function (req, res) {
    _httpWrapper.html_validators.auth_wrapper(req, res, function (jsonResult, hasError, code) {
        if (hasError === true) {
            _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
        } else {
            _services.get_book_by_id(req, function (jsonResult, hasError, code) {
                _httpWrapper.html_wrappers.result_wrapper(res, jsonResult, hasError, code)
            })
        }
    })

}