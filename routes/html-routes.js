var path = require("path");
var db = require("../models/chirp");

var user = require('../models/user');

var auth = require('../utils/auth');

// Main routes for app
module.exports = function(app) {

  app.get('/', function(req, res, next) {

    res.render('index');

  });

  app.get('/profile', auth.requireLogin, function(req, res, next) {

    res.render('profile', { user: req.user });

  });

  app.get('/admin', auth.requireLogin, auth.requireAdmin, function(req, res, next) {

    user.listUsers(function(err, rows) {
      var users = [];
      if (!err) {
        rows.forEach(function(row) {
          users.push({ id: row.id, email: row.email });
        });
      }

      res.render('admin', { user: req.user, users: users });
    });

  });

  app.get('/delete/user/:id', auth.requireLogin, auth.requireAdmin, function(req, res, next) {

    if (req.user.id === req.params.id) {
      // If the user is trying to delete their own account, log them out first
      req.logout();
    }

    user.deleteUser(req.params.id, function(err) {
      if (err) {
        console.error(err);
      }
      res.redirect('/admin');
    });

  });

};


module.exports = function (app) {

    // index route loads view.html
    app.get("/", function(req, res) {
        db.Chirp.findAll({}).then(function(sequelize_chirp) {
          res.render("index", {
            Title: "Chirps!",
            Chirps: sequelize_chirp
          });
        });
      });
    
      app.post("/api/new", function(req, res) {

        console.log("Chirp Data:");
        console.log(req.body);
    
        Chirp.create({
          author: req.body.author,
          body: req.body.body,
          created_at: req.body.created_at
        }).then(function(results) {
          // `results` here would be the newly created chirp
          res.end();
        });
    
      });

    app.get("/dashboard", function (req, res) {
        res.render("dashboard");
    });

    app.get("*", function (req, res) {
        res.render("404");
    });

};