const express = require('express');
const router = express.Router();
const Course = require('./course');
const Department = require('./department');
const Professor = require('./professor');
const userModel = require('./users');
const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

passport.use(new localStrategy(userModel.authenticate()));
passport.serializeUser(userModel.serializeUser());
passport.deserializeUser(userModel.deserializeUser());

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

router.post('/save', async (req, res) => {
    try {
        // Extract data from the request body
        const { name, id, department, numberOfStudents, year, professors } = req.body;

        // Find or create the department
        let foundDepartment = await Department.findOne({ name: department });
        if (!foundDepartment) {
            foundDepartment = await Department.create({ name: department });
        }

        // Find or create professors
        const foundProfessors = [];
        for (const professorName of professors) {
            let professor = await Professor.findOne({ name: professorName });
            if (!professor) {
                professor = await Professor.create({ name: professorName, department: foundDepartment._id });
            }
            foundProfessors.push(professor);
        }

        // Create a new Course document
        const newCourse = new Course({
            name: name,
            id: id,
            department: foundDepartment._id,
            numberOfStudents: numberOfStudents,
            year: year,
            professors: foundProfessors.map(professor => professor._id)
        });

        // Save the new course to the database
        await newCourse.save();

        // Respond with success message
        res.status(200).json({ message: "Course saved successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error saving course:", error);
        res.status(500).json({ error: "Error occurred while saving course" });
    }
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

router.post('/logout', function(req, res, next) {
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
}

module.exports = router;
