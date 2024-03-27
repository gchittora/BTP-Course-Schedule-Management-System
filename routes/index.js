const express = require('express');
const router = express.Router();
const userModel = require('./users');
const Course = require('./course'); // Import the Course model
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
// Configure Passport to use the local strategy with your User model
passport.use(new localStrategy(userModel.authenticate()));

passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index');
});

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/registrar', isLoggedIn, function(req, res, next) {
  res.render('registrar');
});

router.post('/register', function(req, res, next) {
  const data = new userModel({
    username: req.body.username,
    email: req.body.email,
    contact: req.body.contact
  });
  userModel.register(data, req.body.password, function(err, user) {
    if (err) {
      console.error('Error registering user:', err);
      return next(err);
    }
    passport.authenticate('local')(req, res, function() {
      res.redirect('/');
    });
  });
});

// Route handler for saving course data
// Assuming you have already imported required modules and set up the necessary middleware

router.post('/save', function(req, res) {
  // Extract data from the request body
  const { name, year, semester, numberOfStudents, department, instructor, methodOfDelivery } = req.body;

  // Create a new course object using your Mongoose model
  const newCourse = new Course({
      name: name,
      year: year,
      semester: semester,
      numberOfStudents: numberOfStudents,
      department: department,
      instructor: instructor,
      methodOfDelivery: methodOfDelivery
  });

  // Save the new course to the database
  newCourse.save(function(err) {
      if (err) {
          console.error('Error saving course:', err);
          req.flash('error', 'An error occurred while saving the course.');
          return res.redirect('/registrar');
      }
      // Set a success flash message
      req.flash('success', 'Course saved successfully!');
      res.redirect('/registrar');
  });
});


router.get('/login', function(req, res) {
  if (req.isAuthenticated()) {
    res.redirect('/registrar');
  } else {
    res.render('login');
  }
});

router.post('/login', passport.authenticate('local', {
  successRedirect: '/registrar',
  failureRedirect: '/',
}));

router.post('/logout', function(req, res, next){
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});
function isLoggedIn(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
};

module.exports = router;
