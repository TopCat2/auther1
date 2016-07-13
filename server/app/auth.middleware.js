'use strict';

var router = require('express').Router();
var User = require('../api/users/user.model.js')

router.post('/login', function (req, res, next) {
  
  User.findOne({
    where: req.body
  })
  .then(function (user) {
    if (!user) {
      res.sendStatus(401);
    } else {
      req.session.userId = user.id;
      res.status(200).json({id: user.id, isAdmin: user.isAdmin, email: user.email});
    }
  })
  .catch(next);
});

router.post('/logout', function (req, res, next) {
  delete req.session.userId;
  res.sendStatus(200);
});

router.post('/signup', function (req, res, next) {
  
  User.create(req.body)
  .then(function (user) {
    req.session.userId = user.id;
    res.status(200).json(user);
  })
.catch(function(err) {
    if (err.errors[0] && err.errors[0].type === "unique violation") {
      res.status(409);
      res.send(err.errors[0].message)
    } else {
      res.status(500);
      res.json(err);
      throw err;
    }
  });
});

module.exports = router;

