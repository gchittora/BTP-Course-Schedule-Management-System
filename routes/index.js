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

const departments = ['CSE', 'CCE', 'ECE', 'MME'];
departments.forEach(department => {
    router.get(`/${department}`, isLoggedIn, function(req, res, next) {
        // Retrieve and display data for the respective department HOD
        Course.find({ department: department })
            .then(courses => {
                res.render('hod', { department: department, courses: courses });
            })
            .catch(err => {
                console.error('Error fetching data:', err);
                res.status(500).send('Error fetching data');
            });
    });
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
        const { name, id, department, numberOfStudents, year, professors, instructor, methodOfDelivery, credits, semester, courseType, sharingType } = req.body;

        // Find or create the department
        let foundDepartment = await Department.findOne({ name: department });
        if (!foundDepartment) {
            foundDepartment = await Department.create({ name: department });
        }

        // Create a new Course document
        const newCourse = new Course({
            name: name,
            id: id,
            department: foundDepartment._id,
            numberOfStudents: numberOfStudents,
            year: year,
            professors: [], // Initialize professors array
            instructor: instructor,
            methodOfDelivery: methodOfDelivery,
            credits: credits,
            semester: semester,
            courseCode: courseCode, // Corrected here
            courseType: courseType,
            sharingType: sharingType
        });

        // Save the new course to the database
        await newCourse.save();

        // Find or create professors and update courses array
        const foundProfessors = [];
        for (const professorName of professors) {
            let professor = await Professor.findOne({ name: professorName });
            if (!professor) {
                professor = await Professor.create({ name: professorName, department: foundDepartment._id });
            }
            // Push the course ID into the professor's courses array
            professor.courses.push(newCourse._id);
            await professor.save();
            foundProfessors.push(professor);
        }

        // Update the professors array in the new course
        newCourse.professors = foundProfessors.map(professor => professor._id);
        await newCourse.save();

        // Push the course ID into the department's courses array
        foundDepartment.courses.push(newCourse._id);
        await foundDepartment.save();

        // Respond with success message
        res.status(200).json({ message: "Course saved successfully" });
    } catch (error) {
        // Handle errors
        console.error("Error saving course:", error);
        res.status(500).json({ error: "Error occurred while saving course" });
    }
});

router.post('/sendToHOD', function(req, res) {
    const { data, department } = req.body;
    // Here you would send the data to the respective HOD based on the department
    // For demonstration purposes, we're just logging the data to the console
    console.log(`Sending data to HOD ${department}:`, data);
    res.json({ message: "Data sent to HOD successfully" });
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
