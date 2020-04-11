const db = require('../models/db.js');
const User = require('../models/UserModel.js');

const controller = {

    getFavicon: function (req, res) {
        res.status(204);
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/`. This displays `home.hbs` with all contacts
            current stored in the database.
    */
    getIndex: function(req, res) {
        // your code here
         // This is to load the page initially

        //with all contacts current stored in the database.
        db.findMany(User, {}, null, function(resp){
            res.render('home', {
                contactDetails: resp
            });
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getCheckNumber`. This function checks if a
            specific number is stored in the database. If the number is
            stored in the database, it returns an object containing the
            number, otherwise, it returns an empty string.
    */
    getCheckNumber: function(req, res) {
        var number = req.query.number; 

        db.findOne(User, {number: number}, null, function(resp){
            res.send(resp);
        })
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getAdd`. This function adds the contact sent
            by the client to the database, then appends the new contact to the
            list of contacts in `home.hbs`.
    */
    getAdd: function(req, res) {
        var number = req.query.number;
        var name = req.query.name;

        db.insertOne(User, {number: number, name: name}, function(resp){
            res.render('partials/card', {name: name, number: number}, function(err, partial){
                res.send(partial);
            });
        });
    },

    /*
    TODO:   This function is executed when the client sends an HTTP GET
            request to path `/getDelete`. This function deletes the contact
            from the database, then removes the contact to the list of
            contacts in `home.hbs`.
    */
    getDelete: function (req, res) {
        // your code here
        var number = req.query.number;

        db.deleteOne(User, {number: number}, function(resp){
            res.send(resp);
        });
    }

}

module.exports = controller;
