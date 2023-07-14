const db = require('../model/books_models');
const jwt = require('jsonwebtoken');


exports.create_sell = async function (req, callback) {
    try {
        const { title, author, publication_year, price, quantity_available } = req.body;

        const client = await db.connect();
        await client.query(`CREATE TABLE IF NOT EXISTS "books" (
            "id" SERIAL,
            "seller_id" VARCHAR(200) NOT NULL,
            "title" VARCHAR(200) NOT NULL,
            "author" VARCHAR(200) NOT NULL,
            "publication_year" VARCHAR(4) NOT NULL,
            "price" VARCHAR(10) NOT NULL,
            "quantity_available" VARCHAR(200) NOT NULL,
            PRIMARY KEY ("id")
        )`);

        const payLoad = jwt.verify(req.session.jwt, process.env.JWT_KEY);
        const seller_id = payLoad.id.toString(); // Convert seller_id to string


        const result = await client.query(
            'INSERT INTO books (title, seller_id, author, publication_year, price, quantity_available) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [title, seller_id, author, publication_year, price, quantity_available]
        );

        callback(result.rows[0], false, 201);
        client.release();
    } catch (error) {
        console.log(error);
        callback('An error occurred while creating the book.', true, 500);
    }
};



exports.get_books = async function (req, callback) {
    try {


        const client = await db.connect();
        const result = await client.query('SELECT * FROM books');

        callback(result.rows, false, 201)

    } catch (error) {
        callback('An error occurred while fetching the books.', true, 500);

    }
}

exports.get_book_by_id = async function (req, callback) {
    try {

        const { id } = req.params;

        const client = await db.connect();
        const result = await client.query('SELECT * FROM books WHERE id = $1', [id]);

        if (result.rows.length === 0) {
            callback("The book you are trying to get does not exist", true, 500);
        } else {
            callback(result.rows, false, 200);
        }

        client.release();
    } catch (error) {
        console.log(error);
        callback('An error occurred while fetching the book.', true, 500);
    }
};
