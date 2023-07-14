const controllers = require('../controllers/books_controllers')

module.exports = function (webserver) {
    webserver.route('/books/api/v1/book/:id')
    .get(controllers.get_book_by_id);


    webserver.route('/books/api/v1/book')
        .post(controllers.create_sell)
        .get(controllers.get_books);


}